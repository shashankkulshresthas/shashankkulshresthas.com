angular.module('Sort').service('loginModal', function ($mdDialog, $rootScope, $mdMedia, AUTH_EVENTS, AuthService) {

    function assignCurrentUser(user) {
        $rootScope.currentUser = user;
        return user;
    }

    return function (callback) {
        var customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        var parentEl = angular.element(document.querySelector('modelPlaceHolder'));
       
        if (!AuthService.isAuthenticated()) {
            return $mdDialog.show({
                locals: { dataToPass: callback },
                controller: RegisterCntrl,
                controllerAs: 'dialog',
                templateUrl: 'login-dialog.template.html',
                clickOutsideToClose: false,
                parent: parentEl,
                fullscreen: customFullscreen
            });
        }
        else {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        }

    };

    function RegisterCntrl($scope, $http, $state, $location, $mdToast, $cookies, $rootScope, AUTH_EVENTS, AuthService, redirectToUrlAfterLogin, RegistrationModal, ForgotPasswordModal, dataToPass) {
        $scope.callback = dataToPass;
        this.cancel = $scope.$dismiss;
        var result;
      
        $scope.Registration = function () {
            $mdDialog.hide();
            RegistrationModal(function () { $scope.callback() });
        }

        $scope.ForgotPasswordModal = function () {
            $mdDialog.hide();
            ForgotPasswordModal();
        }

        $scope.$watch('User.Password', function (newVal) {
            $scope.loginForm.password.$setValidity("correctPassword", true);
        })

        $scope.$watch('User.LoginID', function (newVal) {
            debugger
            $scope.loginForm.username.$setValidity("correctEmail", true);
        })
        $scope.AuthenticateUser = function () {
            if (!AuthService.isAuthenticated()) {
        
            $scope.Message = "";
            $scope.loginPromise = AuthService.login($scope.User).then(function (user) {
                if (user == 0) {
                    $scope.loginForm.username.$setValidity("correctEmail", false);
                }
               else if (user == 1) {
                    $scope.loginForm.password.$setValidity("correctPassword", false);
                }
               else {

                   $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

                   $mdDialog.hide();
                   if ($scope.callback)
                   $scope.callback();
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
            else {
                $mdDialog.hide();
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                if ($scope.callback)
                    $scope.callback();
            }
        }

      

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

      
    };


});