angular.module('Sort').controller('ResetPasswordCntrl', function ($scope, $rootScope, $http, $state, $location, $cookies, $mdToast, $rootScope, $mdDialog, $interval, AuthService, APICallService) {

    $scope.Reset = {}

    var UserSession = new $.Courses({ UnlockCode: $state.params.code, AngularHTTP: $http });
    $scope.UnlockPromise = UserSession.GetPwdResetData(function (e) {
        $scope.data=e;
    });

    $scope.checkExpiredCourseDetail = function () {


        APICallService.Get('Packages', 'checkExpiredCourseDetail', { RequestCode: $state.params.code }).then(function (e) {

            if (e.data == -1) {
                $scope.RequestCodeStatus = 0;
            }
            else {
                $scope.RequestCodeStatus = e.data;
            }

            console.log($scope.RequestCodeStatus);
            
        });
    };





    $scope.ResetPassword = function () {

        debugger
        var UserSession = new $.Courses({ UserId: $scope.data.UserId, UnlockCode: $scope.data.Code, Password: $scope.Reset.Password, AngularHTTP: $http });
        $scope.UnlockPromise = UserSession.SaveResetPassword(function (e) {
          
            debugger
            if (e == 2) {
                var toast = $mdToast.simple().content('Password has been changed successfully.').action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
                $mdToast.show(toast);
                $location.path('/home');
            }
            else {
                var toast = $mdToast.simple().content('Your link is expired, you have to resend password reset request.').action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
                $mdToast.show(toast);
            }

        });

    }

});