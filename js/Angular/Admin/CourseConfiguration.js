angular.module('Sort').controller('CourseConfigCntrl', function ($scope, ssSideNav, ssSideNavSharedService, APICallService, $mdToast) {
    
  
  
    $scope.coursePrice = [
	        {
	            'Price': '',
	            'RenewalPrice': '',
	            'EffectiveFrom': '',
	            'EffectiveTo':''
	        }];
	        

    $scope.addNew = function (CourseConfigPrice) {

        $scope.coursePrice.push({
            'Price': "",
            'RenewalPrice': "",
            'EffectiveFrom': "",
            'EffectiveTo': ""
        });
        $scope.PD = {};
    };

    $scope.remove = function () {
        var newDataList = [];
        $scope.selectedAll = false;
        angular.forEach($scope.coursePrice, function (selected) {
            if (!selected.selected) {
                newDataList.push(selected);
            }
        });
        $scope.coursePrice = newDataList;
    };

    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.coursePrice, function (CourseConfigPrice) {
            CourseConfigPrice.selected = $scope.selectedAll;
        });
    };

    $scope.GetAllCourse = function () {

        APICallService.Post('AdminConfiguration', 'GetAllCourse').then(function (e) {
            console.log(e);
            $scope.CourseList = e.data;

        });
    }

    $scope.SaveCourseDetail = function () {
        debugger;
        $scope.SaveCourseConfigPromise = APICallService.Post('AdminConfiguration', 'SaveCourseDetail', JSON.stringify($scope.CourseConfig)).then(function (e) {
            var obj = $scope.CourseConfigPrice;
            var length = obj.length();
            alert(obj);
            var result = e.data;
            if (result > 2) {
                

                var toast = $mdToast.simple().content("Course Configuration Save Successfully.").position('right bottom ').action('OK').highlightAction(false).hideDelay(300000);

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

    //$scope.UploadStatus = 'false';

    //$scope.upload = [];
    //$scope.fileUploadObj = { testString1: $scope.LoggedInUser.UserID, testString2: "Test string 2" };
    //$scope.onFileSelect = function ($files) {

    //    //validation for excel 
    //    var exten = $files[0].name.split('.');
    //    var array = ['xlsx', 'xls'];
    //    if (array.indexOf(exten[1]) <= -1) {
    //        var toast = $mdToast.simple().content("Invalid file format , select only .xls,.xlsx file").position('right bottom').action('OK').highlightAction(false).hideDelay(30000);
    //        $mdToast.show(toast);
    //        angular.element("input[type='file']").val(null);
    //    }
    //    else {

    //        //$files: an array of files selected, each file has name, size, and type.
    //        for (var i = 0; i < $files.length; i++) {
    //            var $file = $files[i];

    //            debugger;
    //            (function (index) {

    //                $scope.upload[index] = $upload.upload({
    //                    url: SERVICE + "User/upload", // webapi url
    //                    method: "POST",
    //                    data: { fileUploadObj: $scope.fileUploadObj },
    //                    file: $file
    //                }).progress(function (evt) {

    //                    // get upload percentage
    //                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
    //                }).success(function (data, status, headers, config) {
    //                    $scope.uploaduserlist = data.dt;
    //                    console.log(data.dt)
    //                    $.each($scope.uploaduserlist, function (index, element) {

    //                        var progress = APICallService.Get('User', 'ValidateUsers', { email: element.Email }).then(function (e) {

    //                            if (e.data == true)
    //                                $scope.frmUser['Email_' + index].$setValidity('emailExists', false);
    //                            else
    //                                $scope.frmUser['Email_' + index].$setValidity('emailExists', true);
    //                        });
    //                    })

    //                }).error(function (data, status, headers, config) {
    //                    // file failed to upload
    //                    console.log(data);
    //                });
    //            })(i);
    //        }

    //    }



    //}

});