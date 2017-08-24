

/*********************************************************************************************************************************
 * Copyright (c) 2016 ProtaTECHIndia
 * ---------------------------------
 * File Name                            : Users.js
 * Description                          : Users file contain  Users related functionality
 * Namespace                            : 
 * Dependency                           : 
 * ----------------------------------
 * Development History
 * --------------------------------------------------------------------------------------------------------------------------------
 * Developer                    |   Action          |      Date         |   Description
 * --------------------------------------------------------------------------------------------------------------------------------
 * 1. Hari Ram Seth             |   Creation          |   23-Nov-2016   | Users file contain  Users related functionality
   
 **********************************************************************************************************************************/
angular.module('Sort').controller('RegisterCntrl', function ($scope, $http, $state, $location, $mdToast, $cookies, $rootScope, AUTH_EVENTS, AuthService, redirectToUrlAfterLogin) {
    this.cancel = $scope.$dismiss;
    var result;
    $scope.Register = new $.User({ UserTypeID: 1 });

    $scope.reset = function () {

        $scope.RegisterForm.$setPristine();
        $scope.RegisterForm.$setUntouched();
        $scope.Register = {};
    };
    function calculateAge(DOB) {
        var today = new Date();
        var DOB = new Date(DOB);
        var today = new Date();
        var age = today.getTime() - DOB.getTime();
        age = Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));

    }
  

    $scope.AuthenticateUser = function () {

        
        $scope.Message = "";
        AuthService.login($scope.User).then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            
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


});
