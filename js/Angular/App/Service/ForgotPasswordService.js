angular.module('Sort').service('ForgotPasswordModal', function ($mdDialog, $rootScope, $mdMedia, AUTH_EVENTS, loginModal) {

   

    return function () {
        var customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        var parentEl = angular.element(document.querySelector('modelPlaceHolder'));
        return $mdDialog.show({
            controller: RegisterCntrl,
            controllerAs: 'dialog',
            templateUrl: 'Reset-dialog.template.html',
            clickOutsideToClose: true,
            parent: parentEl,
            fullscreen: customFullscreen
        });

    };

    function RegisterCntrl($scope, $http, $state, $location, $mdToast, $cookies, $rootScope, AUTH_EVENTS, AuthService, redirectToUrlAfterLogin, RegistrationModal, APICallService) {
        this.cancel = $scope.$dismiss;
        var result;
      
        $scope.Registration = function () {
            RegistrationModal();
        }

        $scope.$watch('User.LoginID', function (newVal) {
            debugger
            $scope.ResetForm.username.$setValidity("correctEmail", true);
        })
      
        $scope.ResetPassword = function () {
            $scope.ForgetPromise = APICallService.Post('Packages', 'MakePasswordResetRequest', $scope.User).then(function (e) {
               
                if (e.data) {
                    $scope.Message = "Email has been sent. Please check your inbox"
                }
                else {
                    $scope.ResetForm.username.$setValidity("correctEmail", false);
                }
            });          
                     
        }

        $scope.login = function () {
            $mdDialog.hide();
            loginModal();
        }


        $scope.cancel = function () {
            $scope.Message = "";
            $mdDialog.cancel();
        };

      
    };


});