(function () {

    var app = angular.module("home", []);

    var HomeController = function ($scope, $http, $interval) {      
        
        $scope.lastEmailSent = undefined;
        $scope.contact = {};

        var onUserComplete = function (response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url, { params: { username: "Aramai" } })
              .then(onRepos, onError);
        };

        var onRepos = function (response) {
            $scope.repos = response.data;
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch the user";
        };
        
        $http.get("https://api.github.com/users/Aramai")
                .then(onUserComplete, onError);

        $scope.sendMail = function (form) {                         
            
            var now = new Date();

            if ($scope.lastEmailSent == undefined || ($scope.lastEmailSent != undefined && (now - $scope.lastEmailSent) >= 10000)) {

                var data = $.param({
                    name: $scope.contact.name,
                    replyTo: $scope.contact.email,
                    messageBody: $scope.contact.message
                });

                $http({
                    url: "./Services/SendMail.asmx/Send",
                    method: "POST",
                    data: data,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (response) {
                    console.log(response);
                }, function (response) { console.log(response); });


                $scope.lastEmailSent = new Date();
            }

            $(form).modal('hide');
        };       
    };

    app.controller("HomeController", HomeController);

}());