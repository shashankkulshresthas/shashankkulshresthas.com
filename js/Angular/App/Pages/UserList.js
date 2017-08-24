

angular.module('Sort').controller('UserListCntrl', function ($scope, $http, $state, $location, $cookies, $timeout, ngAudio, $mdDialog, $mdSidenav, $mdToast, $filter, APICallService) {

    

    $scope.GetAllUsers = function () {
        var Packages = new $.User({ AngularHTTP: $http });
        Packages.UserListWithNoCourse(function (e) {
            $scope.Courses = e;

        })
    }
    $scope.GetAllUsers();


    function GetCartId() {
        var CartId = '';
        var cartId = '';//$cookies.get('CartId');
        // if (cartId == null) {
        var date = new Date();
        $scope.ddMMyyyy = $filter('date')(new Date(), 'dd/MM/yyyy');
        $scope.HHmmss = $filter('date')(new Date(), 'HH:mm');

        CartId = $scope.ddMMyyyy + '_' + $scope.HHmmss;

        // $cookies.put('CartId', JSON.stringify(CartId));
        //}

        // CartId = JSON.stringify(CartId);

        return CartId;

    }

    $scope.PurchaseOrder = function (UserId) {
        debugger
        var CartID = GetCartId();
        $scope.Payment = { "CardName": "ABC", "CardNumber": "4111111111111111", "ExpiryMonth": "03", "ExpiryYear": "2020", "CV": "123" };
        $scope.Payment.UserId = UserId;
        $scope.Payment.CartType = "visa";

        $scope.Payment.Expiry = "08/2020";
        CartID = CartID + '@' + UserId
        var CartItemsList = localStorage.getItem('CartItems');
        // var CartItemsList = $cookies.get('CartItems');
        var UserCartItems = [{ "CourseID": 1, "PackageId": 1, "Type": "Course", "Description": "Demo", "Hours": 4, "Price": 40, "NoOfLicense": 1, "Name": "Demo", "PurchaseType": "Purchase", "UserID": UserId }];
       
        UserCartItems[0].CartID = CartID;
        UserCartItems[0].UserCardDetail = $scope.Payment;
       



        $scope.purchasePromise = APICallService.Post('Packages', 'SaveUserOrder', UserCartItems).then(function (e) {
            if (e.data.type == "Success") {
                var toast = $mdToast.simple().content("Account Activated Suuccessfully").action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
                $mdToast.show(toast);
                $scope.GetAllUsers();
            }
            else {
                var toast = $mdToast.simple().content(e.data.Message).action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
                $mdToast.show(toast);
            }

        });
    }

});

