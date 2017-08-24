angular.module('Sort').controller('Coupansctrl', function ($scope, $http, $state, $location, $cookies, $rootScope, AuthService, APICallService, $window, $mdToast) {
    $scope.Coupans = {};
    $scope.Coupans.CoupanValidFromMin = new Date()
    $scope.myDate = new Date();

    $scope.minDate = new Date($scope.myDate);

    $scope.$watch('Coupans.CoupanValidFrom', function () {      
        $scope.Coupans.CoupanCoupanValidUptoMin=$scope.Coupans.CoupanValidFrom;       
    });
    $scope.$watch('Coupans.CoupanValidUpto', function () {
        $scope.Coupans.CoupanValidFromMax = $scope.Coupans.CoupanValidUpto;
    });


    $scope.SaveCoupan = function () {
        $scope.Message = "";

            if (confirm("Are you sure you want to generate Coupan")) {
               // $scope.submitted = true;
                $scope.Coupans.CompanyId = $scope.LoggedInUser.UserID;
                $scope.Coupans.CoupanValidFrom = $scope.Coupans.CoupanValidFrom.toLocaleDateString();
                $scope.Coupans.CoupanValidUpto = $scope.Coupans.CoupanValidUpto.toLocaleDateString();
          $scope.SaveCoupanPromise=  APICallService.Post('Coupans', 'SaveCoupans', JSON.stringify($scope.Coupans)).then(function (e) {

                var result = e.data;
                if (result == 1) {

                    $scope.GetCoupans();
                    $scope.Coupans = "";                  //clear control
                    $scope.frm_coupan.$setPristine();  //reset 
                    $scope.frm_coupan.$setUntouched(); //reset 
                    var toast = $mdToast.simple().content("Coupans Generate Successfully.").position('right bottom ').action('OK').highlightAction(false).hideDelay(300000);
                    $mdToast.show(toast);
                }
                else {
                    var toast = $mdToast.simple().content("Oops !!!! error is occured ").position('right bottom').theme('error-toast').action('OK').highlightAction(false).hideDelay(300000);
                    $mdToast.show(toast);
                    //alert('Something is wrong , contact to administrator');
                }
                console.log(e);
            });
         }
      else { return false; }
        
    }

    //Get Active CoupanList
    $scope.GetCoupans = function () {
        var obj = {};
        obj.CompanyId = $scope.LoggedInUser.UserID;
        APICallService.Post('Coupans', 'GetCoupans', obj).then(function (e) {
            console.log(e);
            $scope.Coupanlist = e.data;
          
        });
    }

    //Delete Coupan
    $scope.DeleteCoupan = function (coupanid,companyid,id)
    {
        $scope.Coupans.CompanyId = companyid;
        $scope.Coupans.CoupanId = coupanid;
        APICallService.Post('Coupans', 'DeleteCoupan', JSON.stringify($scope.Coupans)).then(function (e) {

            var result = e.data;
            if (result == 1) {
                $scope.GetCoupans();
                var toast = $mdToast.simple().content("Coupans Deleted Successfully.").position('right bottom ').action('OK').highlightAction(false).hideDelay(300000);
                $mdToast.show(toast);
            }
            else {
                var toast = $mdToast.simple().content("Oops !!!! error is occured ").position('right bottom').theme('error-toast').action('OK').highlightAction(false).hideDelay(300000);
                $mdToast.show(toast);
                
            }
            console.log(e);
        });
    }
    
});