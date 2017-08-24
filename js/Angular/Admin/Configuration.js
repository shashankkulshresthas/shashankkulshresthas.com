angular.module('Sort').controller('ConfigurationCntrl', function ($scope, ssSideNav, ssSideNavSharedService, APICallService, $mdToast) {


   
    $scope.GetSystemConfiguration = function () {

        var obj = {'Type':2}
        
        APICallService.Post('AdminConfiguration', 'GetSystemConfiguration', obj).then(function (e) {
            console.log(e);
            $scope.SystemConfiguration = e.data;
       
        });
    }

    $scope.SaveConfig = function () {
     
      //  $scope.config.ContentType = 'Expiration'
        $scope.SaveSytemConfigPromise = APICallService.Post('AdminConfiguration', 'SaveSystemConfig', JSON.stringify($scope.SystemConfiguration)).then(function (e) {

            var result = e.data;
            if (result>0) {
              
                var toast = $mdToast.simple().content("System Configuration Updated Successfully").position('right bottom ').action('OK').highlightAction(false).hideDelay(300000);
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

        
    $scope.GetEmailConfiguration = function () {
        var obj = { "Type": 1 };
        APICallService.Post('AdminConfiguration', 'GetEmailConfiguration', obj).then(function (e) {

            $scope.EmailConfigurationList = e.data;
        });

    }


    $scope.SaveEmailConfiguration = function () {

        if ($scope.frm_EmailConfiguration.$valid) {

            $scope.SaveEmailConfigurationPromise = APICallService.Post('AdminConfiguration', 'SaveEmailConfiguration', JSON.stringify($scope.EmailConfigurationList)).then(function (e) {
                debugger;
                if (e.status = 200) {
                    var toast = $mdToast.simple().content("Your data has been Updated successfully.").position('right bottom').action('OK').highlightAction(false).hideDelay(30000);
                    $mdToast.show(toast);
                }
            });
        }



    }
    


});