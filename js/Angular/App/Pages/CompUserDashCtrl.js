//Company User Dashboard Controller
angular.module("Sort").controller("compuserdash", function ($scope, $http, $state, $location, $cookies, $rootScope, AuthService, APICallService, $window, $mdToast) {

     $scope.GetUserDetail = function ()
    {
        APICallService.Get('User', 'GetAllUsersList', { 'UserId': $scope.LoggedInUser.UserID }).then(function (e) {           
            $scope.Userlist = e.data;
        });
    }


});