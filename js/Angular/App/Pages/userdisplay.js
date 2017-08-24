//User Display Controller
angular.module('Sort').controller('UserDisplay', function ($scope, $rootScope, $http, $state, $location, $cookies, $mdToast, $mdDialog, $interval, AuthService, APICallService) {

    // THIS FUNCTION IS USED SHOW ALL UserList w.r.t CompanyWise
    $scope.AssignedClick = function () {
        $scope.selectedIndex = 1;
        $scope.GetAllUsersListByCompanyId();
    }
    $scope.UnAssignedClick = function () {
        $scope.selectedIndex = 0;
        $scope.GetAllUsersListByCompanyId();
    }


    $scope.GetAllUsersListByCompanyId = function () {
      $scope.Userlist=[];
        if ($scope.SelectedCourse) {
            if ($scope.selectedIndex == 1) {
                var assignStatus = 'Assign';
            }
            else { var assignStatus = ''; }
            APICallService.Get('User', 'GetAllUsersListByCompanyId', { 'CompanyId': $scope.LoggedInUser.UserID, 'CourseID': $scope.SelectedCourse.CourseId, 'type': assignStatus }).then(function (e) {                
                $scope.Userlist = e.data;

            });
        }
        else {
            $scope.Userlist = [];
           
        }

    }

    // THIS FUNCTION IS used to get all Course by CompanyID

    $scope.GetCourseListByCompId = function () {


        APICallService.Get('User', 'GetCourseListByCompId', { 'CompanyId': $scope.LoggedInUser.UserID }).then(function (e) {
            console.log(e);
            $scope.CourseList = e.data;
            if ($('#Course').val() != "") {
                $scope.TotalLicenseOfCourse = e.data[0].RemainingLicence;
            }
        });


    }

  
  

    // THIS FUNCTION IS used to get Selected Course License By CompanyID and CourseId
    var purchaseItemId = 0;
    $scope.GetCourseLicense = function () {
        if ($scope.SelectedCourse) {
            $scope.GetAllUsersListByCompanyId();           
        }
        else {
           
            $scope.Userlist = [];
        }
       
    }

    function findAndRemove(array, property, value) {
        array.forEach(function (result, index) {
            if (result[property] === value) {
                //Remove from array
                array.splice(index, 1);
            }
        });
    }
    // THIS FUNCTION IS used to assign the Course of License   
    $scope.AssignCourseLicense = function (user) {
        var result = 0;
        user.InProgress = true;
        if (parseInt($scope.SelectedCourse.RemainingLicence) > 0) {

            APICallService.Get('User', 'InsertUserAssignCourse', { 'CourseId': $scope.SelectedCourse.CourseId, 'UserId': user.UserID, 'PurchaseItemId': $scope.SelectedCourse.PurchaseItemId }).then(function (e) {

                if (e.status = 200) {
                   // $scope.GetAllUsersListByCompanyId();
                   // $scope.SendMail(userid, Courseid, 8);
                    // console.log(e);
                    findAndRemove($scope.Userlist, 'UserID', user.UserID);
                    $scope.SelectedCourse.RemainingLicence = $scope.SelectedCourse.RemainingLicence - 1;
                    var toast = $mdToast.simple().content("Assign course to user successfully.").position('right bottom').action('OK').highlightAction(false).hideDelay(300000);
                    $mdToast.show(toast);
                    user.InProgress = false;

                }
                else {
                    var toast = $mdToast.simple().content("Error occured during assigning course to user").position('right bottom').action('OK').highlightAction(false).hideDelay(300000);
                    $mdToast.show(toast);
                    user.InProgress = false;
                }

            });
        }
        else {
            var toast = $mdToast.simple().content("!!! Please purchase license for assigning of course").position('right bottom').action('OK').highlightAction(false).hideDelay(300000);
            $mdToast.show(toast);
            user.InProgress = false;
        }
    }


    // THIS FUNCTION IS used to assign the All Course of License   
    $scope.model = {
        selectedLabelList: []
    }
    $scope.isSelectAll = function () {
        $scope.model.selectedLabelList = [];

        if ($scope.master) {
            $scope.master = true;
            for (var i = 0; i < $scope.Userlist.length; i++) {
                $scope.model.selectedLabelList.push($scope.Userlist[i].AssignLicense = true);
                var userid = $scope.Userlist[i].UserID;
                var Courseid = $scope.SelectedCourse;
                APICallService.Get('User', 'InsertUserAssignCourse', { 'CourseId': $scope.SelectedCourse, 'UserId': $scope.Userlist[i].UserID, 'PurchaseItemId': purchaseItemId }).then(function (e) {
                    console.log(e);
                });
                $scope.GetAllUsersListByCompanyId();
                $scope.SendMail(userid, Courseid, 8);
            }
        }
        else {
            for (var i = 0; i < $scope.Userlist.length; i++) {
                $scope.model.selectedLabelList.push($scope.Userlist[i].AssignLicense = false);
            }
            $scope.master = false;
        }
        $scope.master = false;
        $scope.GetAllUsersListByCompanyId();
        var toast = $mdToast.simple().content("Assign course to all user successfully.").position('right bottom').action('OK').highlightAction(false).hideDelay(300000);
        $mdToast.show(toast);
    }
    
    // THIS FUNCTION IS used to Unassign the Course of License    $scope.CourseList[0].PurchaseItemId
    $scope.UnAssignCourseLicense = function (User) {
        User.InProgress = true;
        var userid = User.UserID;
                var Courseid = $scope.SelectedCourse.CourseId;
                APICallService.Get('User', 'DeleteUserAssignCourse', { 'CourseId': $scope.SelectedCourse.CourseId, 'UserId': User.UserID, 'PurchaseItemId': $scope.SelectedCourse.PurchaseItemId }).then(function (e) {
                    if (e.status = 200) {
                        findAndRemove($scope.Userlist, 'UserID', User.UserID);
                        $scope.SelectedCourse.RemainingLicence = $scope.SelectedCourse.RemainingLicence + 1;
                  
                        var toast = $mdToast.simple().content("UnAssign course to user successfully.").position('right bottom').action('OK').highlightAction(false).hideDelay(300000);
                        $mdToast.show(toast);

                        User.InProgress = false;
                    }
                    else {
                        var toast = $mdToast.simple().content("Error occured during unassigning course to user").position('right bottom').action('OK').highlightAction(false).hideDelay(300000);
                        $mdToast.show(toast);
                        User.InProgress = false;
                    }
                });
           // }

       // }


    }

    //This Function is used to Unassign the all user course
    $scope.model = {
        selectedLabelList: []
    }
    $scope.isUnSelectAll = function () {
        $scope.model.selectedLabelList = [];

        if ($scope.master) {
            $scope.master = true;
            for (var i = 0; i < $scope.Userlist.length; i++) {
                if ($scope.Userlist[i].StatusId == 1)
                    {
                $scope.model.selectedLabelList.push($scope.Userlist[i].AssignLicense = false);
                APICallService.Get('User', 'DeleteUserAssignCourse', { 'CourseId': $scope.SelectedCourse, 'UserId': $scope.Userlist[i].UserID, 'PurchaseItemId': purchaseItemId }).then(function (e) {
                    console.log(e);
                  });
                }
                $scope.GetAllUsersListByCompanyId();
            }
            var toast = $mdToast.simple().content("UnAssign course to all user successfully.").position('right bottom').action('OK').highlightAction(false).hideDelay(300000);
            $mdToast.show(toast);
        }
        else {
            for (var i = 0; i < $scope.Userlist.length; i++) {
                $scope.model.selectedLabelList.push($scope.Userlist[i].AssignLicense = false);
            }
            $scope.master = false;
        }
        $scope.GetAllUsersListByCompanyId();
        $scope.master = false;
    }


    //Reset UserPassword
    $scope.ResetPassword = function (userid, email, ind) {
        // debugger;
       
             APICallService.Get('User', 'UpdateUserPassword', { UserId: parseInt(userid), EmailId: email }).then(function (e) {
                if (e.status = 200) {
                    console.log(e);
                    var toast = $mdToast.simple().content("User Password Reset Successfully").position('right bottom').action('OK').highlightAction(false).hideDelay(300000);
                    $mdToast.show(toast);
                }
                else {
                    var toast = $mdToast.simple().content("Oops !!!! something problem during reset user password").position('right bottom').action('OK').highlightAction(false).hideDelay(300000);
                    $mdToast.show(toast);
                }
                index = 0;

            });
        
    }
    ///default selection of tab on course change
    $scope.$watch('SelectedCourse', function () {
        $scope.selectedIndex = 0;
        $scope.GetAllUsersListByCompanyId();
    });

    //Send Mail

    $scope.SendMail = function (userid, courseid, mailtype) {
        var mail = { UserID: userid, MailType: mailtype, CourseID: courseid };
        APICallService.Get('User', 'SendMail', mail).then(function (e) {
            $scope.Message = e;

        });
    }
    
});

