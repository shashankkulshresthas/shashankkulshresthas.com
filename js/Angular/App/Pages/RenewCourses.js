//User Display Controller
angular.module('Sort').controller('RenewCoursesctrl', function ($scope, $rootScope, $http, $state, $location, $cookies, $mdToast, $mdDialog, $interval, AuthService, APICallService) {


    $scope.expiredStatus = 0;
    $scope.selectedAll = false;

    APICallService.Get('User', 'GetExpiredCourse', { UserId: $scope.LoggedInUser.UserID }).then(function (e) {        
        $scope.Courselist = e.data;

        for (i = 0; i <= e.data.length - 1; i++)
        {           

            if (parseInt($scope.Courselist[i].RemainingDays) <= 5)
            {
                $scope.expiredStatus = 1;
                break;
            }



        }



    });

   


    $scope.isSelectAll = function (selectedAll) {
        if (selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }

        angular.forEach($scope.Courselist, function (item) {            
            if (parseInt(item.RemainingDays) <= 5) {
                item.Checked = $scope.selectedAll;
            }
        });
    }
    
    
    $scope.AddToCart = function (Package) {             
        debugger
        if (!AuthService.isAuthenticated()) {
            RegistrationModal().then(function () {

                PurchaseItem(Package);

            });
        }
        else {
            PurchaseItem(Package);

        }
    }



    function PurchaseItem(Package) {       
       
        var CartItems = [];

        for (var i = 0; i <= parseInt(Package.length) - 1; i++)
        {
            if (Package[i].Checked == true) {
                var bool = false;

               

                if (Package[i].PurchaseType == null)
                {
                    Package[i].PurchaseType = 'Renew';
                }

                cartItems = new $.Cart({ CourseID: Package[i].CourseId, PackageId: Package.CourseID, Type: Package[i].ItemType, Description: Package[i].Description, Hours: Package[i].Duration, Price: Package[i].RenewalPrice, NoOfLicense: Package[i].NoOfLicence, Name: Package[i].CourseName, PurchaseType: Package[i].PurchaseType, UserID: $scope.LoggedInUser.UserID });
               
                CartItems.push(cartItems);
            }
        }

        if (CartItems.length > 0) {
            localStorage.setItem('CartItems', JSON.stringify(CartItems));

            var toast = $mdToast.simple().content("Cart Updated").position('right bottom').action('OK').highlightAction(false).hideDelay(300000);
            $mdToast.show(toast);
          
            $location.path('/MyAccount/CheckOut');
        }
        else {
            var toast = $mdToast.simple().content("Please check at least one Course").position('right bottom').action('OK').highlightAction(false).hideDelay(300000);
            $mdToast.show(toast);
        }



    }





});
