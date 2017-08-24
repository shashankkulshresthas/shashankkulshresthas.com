


angular.module('Sort').controller('ChangePasswordCtrl', function ($scope, $rootScope, $http, $state, $location, $cookies, $mdToast, $rootScope, $mdDialog, $interval, AuthService, APICallService) {


    $scope.ChangeUserPassword = function () {

        $scope.User.UserId = $scope.LoggedInUser.UserID;

        $scope.loginPromise = APICallService.Post('User', 'ChangeUserPassword', $scope.User).then(function (e) {

            if (JSON.stringify(e.data) > 0 && JSON.stringify(e.data)!= 3) {
                var toast = $mdToast.simple().content('Password has been changed successfully.').action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
                $mdToast.show(toast);
                $scope.User = null;
                $scope.ChangePassword.$setPristine();  //reset 
                $scope.ChangePassword.$setUntouched();
                $location.path('/home');

            }
            else if (JSON.stringify(e.data) == 3)
            {
                var toast = $mdToast.simple().content("Please use different password.").action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
                $mdToast.show(toast);
                $scope.User.UpdatedPassword = "";
                $scope.User.RetypePassword = "";
                $scope.User.UpdatedPassword.blink;
            }
            else if (JSON.stringify(e.data) == 0) {
                var toast = $mdToast.simple().content(" Current  Password entered is incorrect.").action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
                $mdToast.show(toast);
                $scope.User.LoginPassword = "";
            }
            else {
                var toast = $mdToast.simple().content("Password is incorrect.").action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
                $mdToast.show(toast);
            }



        });
    }

});