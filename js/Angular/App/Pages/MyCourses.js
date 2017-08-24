angular.module('Sort').controller('PurchasedCoursesCntrl', function ($scope, $http, $state, $location, $cookies, $mdToast, $rootScope, $mdDialog, AuthService, APICallService, $window, UserCourses, CourseService) {
    
    $scope.UserCourses = UserCourses.data;
    LoginId = $scope.LoggedInUser.UserID;
   
    $scope.GetUserCourses = function () {
        APICallService.Get('Packages', 'GetUserCourses').then(function (data) {
          
            $scope.UserCourses = data.data;
        });
       
    }

    $scope.AddToCart = function (Package,course, purchasetype) {
        Package.PurchaseType = purchasetype;   //purchasetype status
      
                PurchaseItem(Package);          
    }

    

    $scope.Generate = function () {
        var data = { UserID: $scope.LoggedInUser.UserID };
        APICallService.DownloadFile('Packages', 'Generate', data).success(function (data, status, headers) {

            headers = headers();
            var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();

            var timeStamp = parseInt(timeStampInMs);
           
            var filename = "Certificate" + timeStamp + ".pdf";

            var contentType = headers['content-type'];

            var linkElement = document.createElement('a');
            try {
                var blob = new Blob([data], { type: contentType });
                var url = window.URL.createObjectURL(blob);

                linkElement.setAttribute('href', url);
                linkElement.setAttribute("download", filename);

                var clickEvent = new MouseEvent("click", {
                    "view": window,
                    "bubbles": true,
                    "cancelable": false
                });
                linkElement.dispatchEvent(clickEvent);
            } catch (ex) {
                console.log(ex);
            }
        })
    }


    function PurchaseItem(Package) {

        var packages = new $.Courses({ CourseID: Package.CourseId, UserId: $scope.LoggedInUser.UserID, AngularHTTP: $http });
      
                var cartItems;
                var bool = false;
                var type = Package.PurchaseType;
                if (Package.PurchaseType == 'Repurchase') {
                    cartItems = new $.Cart({ UserID: $scope.LoggedInUser.UserID, CourseID: Package.CourseId, PackageId: Package.CourseId, Type: 'Course', Description: Package.Description, Hours: Package.Duration, Price: Package.Price, NoOfLicense: 1, Name: Package.CourseName, PurchaseType: Package.PurchaseType });
                }
                if (Package.PurchaseType == 'Renew') {
                    cartItems = new $.Cart({ UserID: $scope.LoggedInUser.UserID, CourseID: Package.CourseId, PackageId: Package.CourseId, Type: 'Course', Description: Package.Description, Hours: Package.Duration, Price: Package.RenewalPrice, NoOfLicense: 1, Name: Package.CourseName, PurchaseType: Package.PurchaseType });
                }
                var CartItems = [];
                CartItems.push(cartItems);

                //   $cookies.put('CartItems', JSON.stringify(CartItems));
                localStorage.setItem('CartItems', JSON.stringify(CartItems));

                $rootScope.$broadcast('CartUpdated');
                $location.path('/MyAccount/CheckOut');
          

    }


    $scope.UnLockAccount = function (ev, courseid) {
        $scope.SelectedCourse = courseid;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'templates/Pages/UnlockDialogue.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.,
            scope: this,
            locals: {
                Courseid: courseid,
                LoggedInUser: $scope.LoggedInUser
        }
        });

    };

    function DialogController($scope, $mdDialog) {

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.$watch('UnlockCode', function (newVal) {
            $scope.loginForm.username.$setValidity("invalidCode", true);
        })

        $scope.Resend = function () {
          
            var UserSession = new $.Courses({ CourseID: $scope.SelectedCourse, UserId: $scope.LoggedInUser.UserID, AngularHTTP: $http });
            $scope.lockPromise = UserSession.MarkLockAccout(function (e) {
                $scope.CodeSent = true;
            });
        }

        $scope.Unlock = function () {
            var UserSession = new $.Courses({UnlockCode:$scope.UnlockCode, AngularHTTP: $http });
            $scope.UnlockPromise = UserSession.MarkUnlockCourse(function (e) {
                if (e == 0) {
                    $scope.loginForm.username.$setValidity("invalidCode", false);
                }
                else {
                    $mdDialog.hide();
                    GetUserCourses();
                }

            });
        }

    }
    
    $scope.LockAccount = function (courseid) {
        var UserSession = new $.Courses({ CourseID: courseid, UserId: $scope.LoggedInUser.UserID, AngularHTTP: $http });
        $scope.lockPromise = UserSession.MarkLockAccout(function (e) {

        });
    }

    $scope.GetModulesByCourseId = function (CourseID) {
        if ($scope.LoggedInUser.PCompletion == 1 && $scope.LoggedInUser.SCompletion == 1)
            $state.go('CourseModules', { CourseID: CourseID });
        else
            $state.go('SecurityQues')
    }
   

    $scope.VerifyRenewCourses();   

    $scope.VerifyRenewCourses = function () {
        debugger
        var obj = {};

        $scope.RenewCourses = 0;

        if ($scope.LoggedInUser != null) {
            obj.UserID = parseInt($scope.LoggedInUser.UserID);
            APICallService.Post('Packages', 'VerifyCoursevalid', obj).then(function (e) {
                debugger
                console.log(e.data);

                if (parseInt(e.data.length) > 0) {
                    debugger
                    for (var i = 0; i <= parseInt(e.data.length) - 1; i++) {
                        debugger
                        if (parseInt(e.data[i].RemainingDays) <= 5) {
                            $scope.RenewCourses = 1;
                            break;
                        }
                    }
                }
                else {
                    $scope.RenewCourses = 0;
                }
            });
        }



    };  


});