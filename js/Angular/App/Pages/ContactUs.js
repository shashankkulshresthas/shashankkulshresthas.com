

/*********************************************************************************************************************************
 * Copyright (c) 2016 ProtaTECHIndia
 * ---------------------------------
 * File Name                            : ContactUs.js
 * Description                          : ContactUs file contain  ContactUs related functionality.
 * Namespace                            : 
 * Dependency                           : 
 * ----------------------------------
 * Development History
 * --------------------------------------------------------------------------------------------------------------------------------
 * Developer                    |   Action          |      Date         |   Description
 * --------------------------------------------------------------------------------------------------------------------------------
 * 1. Hari Ram Seth             |   Creation          |   14-Nov-2016   | ContactUs file contain  ContactUs related functionality
   
 **********************************************************************************************************************************/
angular.module('Sort').controller('ContactUsCntrl', function ($scope, $http, $state, $location, $mdToast, APICallService) {

    $scope.Courses = function (CoursesType) {

        alert(CoursesType);

        if (CoursesType == 'CP') {

            $state.go('courses', {});
            //$window.location.href = 'dashboard-guest.html#/login';
        }
        else {
            $state.go('courses', {});
        }


    };


    var result;
    $scope.reset = function () { 
        $scope.ContactForm.$setPristine();
        $scope.ContactForm.$setUntouched();
        $scope.ContactUs = {};
    };
    $scope.SaveData = function ()
    {
       debugger
        $scope.Message = "";
         $scope.ContactPromise = APICallService.Post('ContactUs', 'SaveContactInfo', $scope.ContactUs).then(function (e) {
            if (e.data == 1) {
                var toast = $mdToast.simple().content('Thanks for contacting us. We will reply by email shortly.').action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
                $mdToast.show(toast);
                $scope.reset();
            }

        });
        
    }


   
    //===== Courses=====
   
});