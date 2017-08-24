angular.module('Sort').service('VerifyAccountModal', function ($mdDialog, $rootScope, $mdMedia, AUTH_EVENTS) {
 
    return function () {
        debugger
        var customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        var parentEl = angular.element(document.querySelector('modelPlaceHolder'));
        
        return $mdDialog.show({
            controller: RegisterCntrl,
            controllerAs: 'dialog',
            templateUrl: 'ConfirmUser-dialog.template.html',
            clickOutsideToClose: false,
            parent: parentEl,
            fullscreen: customFullscreen
        });

       
       
       

    };

    function RegisterCntrl($scope, $http, $state, $location, $mdToast, $cookies, $rootScope, AUTH_EVENTS, AuthService, redirectToUrlAfterLogin) {
        this.cancel = $scope.$dismiss;
        var result;
        $scope.LoggedInUser = AuthService.GetCredential();

       

        $scope.$watch('User.Password', function (newVal) {
            debugger
            $scope.VerifyForm.password.$setValidity("correctPassword", true);
        })
               
        $scope.AuthenticateUser = function () {

            debugger
            $scope.Message = "";
            $scope.User.LoginID= $scope.LoggedInUser.LoginName;

            $scope.VerifyPromise = AuthService.VerifyPassword($scope.User.Password).then(function (user) {
               
               if (user.data == 0) {
                   $scope.VerifyForm.password.$setValidity("correctPassword", false);
                }
                else {                   
                    $mdDialog.hide();
                }
             
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
            //  var obUserLogin = new Object();
            //var UserLogin = new $.User({ LoginID: $scope.User.LoginID, Password: $scope.User.Password, AngularHTTP: $http });
            //UserLogin.Login(function (e) {
            //    if (e.length > 0) {
            //        $cookies.put('credential', JSON.stringify(e));
            //        $rootScope.$broadcast('LoggedIN');
            //        $location.path('/courses');
            //    }
            //   else {
            //        var toast = $mdToast.simple().content('Invalid Credentials.').action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
            //        $mdToast.show(toast);
            //    }

            //})
        }

      

        $scope.cancel = function () {
            $mdDialog.cancel();
            $location.path('/home');
        };

      
    };


});