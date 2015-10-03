(function () {

    var app = angular.module("home", []);

    var HomeController = function ($scope, $http, $log) {      

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
    };

    app.controller("HomeController", HomeController);

}());