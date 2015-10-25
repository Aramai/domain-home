(function () {

    var app = angular.module("home", []);

    var HomeController = function ($scope, $http) {      

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
            //need to implement back-end web service to use SES to send e-mail to admin            

            $http.post("./Services/SendMail.asmx/Send")
                 .then(function (response) {
                     console.log(response);
                 }, function (response) { console.log(response); });


            $(form).modal('hide');
        };       
    };

    app.controller("HomeController", HomeController);

}());