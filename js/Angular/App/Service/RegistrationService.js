angular.module('Sort').service('RegistrationModal', function ($mdDialog, $rootScope, $mdMedia, AUTH_EVENTS, loginModal, AuthService) {

    function assignCurrentUser(user) {
        $rootScope.currentUser = user;
        return user;
    }

    return function (callback) {
            var customFullscreen = $mdMedia('xs') || $mdMedia('sm');           
            if (!AuthService.isAuthenticated()) {
            return $mdDialog.show({
                locals: { dataToPass: callback },
                controller: RegisterCntrl,
                controllerAs: 'dialog',
                templateUrl: 'Register-dialog.template.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: customFullscreen
            });
            }
            else {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            }
        
    };

    function RegisterCntrl($scope, $http, $state, $location, $mdToast, $cookies, $rootScope, AUTH_EVENTS, AuthService, redirectToUrlAfterLogin, APICallService, dataToPass) {
        $scope.callback = dataToPass;
        this.cancel = $scope.$dismiss;
        var result;
        $scope.$watch('Register.Email', function (newVal) {

            $scope.RegisterForm.Email.$setValidity('emailExists', true);
        })

        $scope.AuthenticateUser = function () {


            $scope.Message = "";
            $scope.loginPromise = AuthService.login($scope.User).then(function (user) {
                  $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $mdDialog.hide();
                    var toast = $mdToast.simple().content('Thank you for registering with SORT DEMO').action('OK').highlightAction(false).position('bottom right').hideDelay(30000);
                    $mdToast.show(toast);
                    if ($scope.callback)
                    $scope.callback()
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


        $scope.RegisterUser = function (ev) {
            if (!AuthService.isAuthenticated()) {
            //    var age = calculateAge($scope.Register.DOB);
            var data = { UserTypeID: $scope.Register.UserTypeID, FirstName: $scope.Register.FirstName, MiddleName: $scope.Register.MiddleName, LastName: $scope.Register.LastName, Address: $scope.Register.Address, City: $scope.Register.City, State: $scope.Register.State, ZIP: $scope.Register.ZIP, PrimaryPhone: $scope.Register.PrimaryPhone, AlternatePhone: $scope.Register.AlternatePhone, Email: $scope.Register.Email, DOB: $scope.Register.DOB, SSN: $scope.Register.SSN, LoginID: $scope.Register.LoginID, Password: $scope.Register.Password }
            $scope.loginPromise = APICallService.Post('User', 'SaveUser', data).then(function (e) {
                if (e.data > 0) {
                    $scope.User = { LoginID: $scope.Register.Email, Password: $scope.Register.Password }
                    $scope.AuthenticateUser();
                }
                else {

                    $scope.RegisterForm.Email.$setValidity("emailExists", false);

                }
            });
            }
            else {
                $mdDialog.hide();
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                if ($scope.callback)
                    $scope.callback();
            }
            //$scope.Message = "";
            //var objRegister = new Object();
            //var Register = new $.User({ UserTypeID: $scope.Register.UserTypeID, FirstName: $scope.Register.FirstName, MiddleName: $scope.Register.MiddleName, LastName: $scope.Register.LastName, Address: $scope.Register.Address, City: $scope.Register.City, State: $scope.Register.State, ZIP: $scope.Register.ZIP, PrimaryPhone: $scope.Register.PrimaryPhone, AlternatePhone: $scope.Register.AlternatePhone, Email: $scope.Register.Email, DOB: $scope.Register.DOB, SSN: $scope.Register.SSN, LoginID: $scope.Register.LoginID, Password: $scope.Register.Password, AngularHTTP: $http });
            //Register.Register(function (e) {
            //    if (e > 0) {
                  
            //            $scope.User = { LoginID: $scope.Register.Email, Password: $scope.Register.Password }
            //            $scope.AuthenticateUser();
                   
                  
               
            //    }
            //    else {
                    
            //        $scope.RegisterForm.Email.$setValidity("emailExists", false);
                   
            //    }


            //})
        }


        $scope.login = function () {
            $mdDialog.hide();
            loginModal(function () { $scope.callback() });
        }


        $scope.cancel = function () {
            $mdDialog.cancel();
        };

      
    };

    
});