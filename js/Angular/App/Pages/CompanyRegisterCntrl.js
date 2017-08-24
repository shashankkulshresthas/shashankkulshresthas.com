angular.module('Sort').controller('CompanyRegisterCntrl', function ($scope, $http, $state, $location, $cookies, $mdToast, $rootScope, $mdDialog, AuthService, APICallService, $window, $location, AUTH_EVENTS) {

    $scope.$watch('Users.Email', function (newVal) {

        $scope.RegisterForm.Email.$setValidity('emailExists', true);
    })

    $scope.AuthenticateUser = function () {

        $scope.Message = "";
        $scope.loginPromise = AuthService.login($scope.User).then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $location.path("/home");
            var toast = $mdToast.simple().content('Thank you for registering with Sort DEMO.').action('OK').highlightAction(false).position('bottom right').hideDelay(30000);
            $mdToast.show(toast);

        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
        
    }

    $scope.RegisterUser = function () {
        
        debugger
        var data = $scope.Users;
        $scope.loginPromise = APICallService.Post('User', 'SaveComapnyUser', data).then(function (e) {
            if (e.data > 0) {
                $scope.User = { LoginID: $scope.Users.Email, Password: $scope.Users.LoginPassword }
               $scope.AuthenticateUser();
            }
            else {

                $scope.RegisterForm.Email.$setValidity("emailExists", false);
               
            }
        });

       
    }

    $scope.ValidateEmail = function () {
        var data = APICallService.Post('User', 'ValidateCompanyUser', $scope.Users).then(function (e) {
            if (e.data==false) {
                $scope.RegisterForm.Email.$setValidity("emailExists", true);
            }
            else {
                $scope.RegisterForm.Email.$setValidity("emailExists", false);
               
            }
        }); 
    }

});