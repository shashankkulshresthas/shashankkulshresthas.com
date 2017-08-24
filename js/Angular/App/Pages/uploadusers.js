angular.module('Sort').controller('Companyctrl', function ($scope, $rootScope, $http, $state, $location, $cookies, $mdToast, $rootScope, $mdDialog, $interval, AuthService, APICallService, $upload, $mdEditDialog, $timeout) {
    $scope.options = {
        rowSelection: true,
        multiSelect: true,
        autoSelect: true,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: true
    };

    $scope.selected = [];
    $scope.limitOptions = [5, 10, 15, {
        label: 'All',
        value: function () {
            return $scope.desserts ? $scope.desserts.count : 0;
        }
    }];

    $scope.query = {
        order: 'name',
        limit: 5,
        page: 1
    };

    // for testing ngRepeat
   

    $scope.DownloadSample = function () {
       
        APICallService.DownloadFile('Packages', 'DownloadExcelTemplate').success(function (data, status, headers) {

            headers = headers();
            var filename = "Sample.xlsx";
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
  
    $scope.toggleLimitOptions = function () {
        $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
    };

   

    $scope.onPaginate = function (page, limit) {
        console.log('Scope Page: ' + $scope.query.page + ' Scope Limit: ' + $scope.query.limit);
        console.log('Page: ' + page + ' Limit: ' + limit);

        $scope.promise = $timeout(function () {

        }, 10);
    };

 
    $scope.onReorder = function (order) {

        console.log('Scope Order: ' + $scope.query.order);
        console.log('Order: ' + order);

        $scope.promise = $timeout(function () {

        }, 10);
    };
 
    $scope.UploadStatus = 'false';

    $scope.upload = [];
    $scope.fileUploadObj = { testString1: $scope.LoggedInUser.UserID, testString2: "Test string 2" };
   
    $scope.onFileSelect = function ($files) {

        //validation for excel 
        var exten = $files[0].name.split('.');
        var array = ['xlsx', 'xls'];
        if (array.indexOf(exten[1]) <= -1) {
            var toast = $mdToast.simple().content("Invalid file format , select only .xls,.xlsx file").position('right bottom').action('OK').highlightAction(false).hideDelay(30000);
            $mdToast.show(toast);
            angular.element("input[type='file']").val(null);
        }
        else {

            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var $file = $files[i];

                debugger;
                (function (index) {

                    $scope.upload[index] = $upload.upload({
                        url: SERVICE + "User/upload", // webapi url
                        method: "POST",
                        data: { fileUploadObj: $scope.fileUploadObj },
                        file: $file
                    }).progress(function (evt) {

                        // get upload percentage
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function (data, status, headers, config) {                      
                        $scope.uploaduserlist = data.dt;
                        console.log(data.dt)
                        $.each($scope.uploaduserlist, function (index, element) {
                           
                            var progress = APICallService.Get('User', 'ValidateUsers', { email: element.Email }).then(function (e) {

                                if (e.data == true)
                                    $scope.frmUser['Email_' + index].$setValidity('emailExists', false);
                                else
                                    $scope.frmUser['Email_' + index].$setValidity('emailExists', true);
                            });
                        })
                      
                    }).error(function (data, status, headers, config) {
                        // file failed to upload
                        console.log(data);
                    });
                })(i);
            }

        }    



    }

    $scope.abortUpload = function (index) {
        $scope.upload[index].abort();
    }

    var count = 0;
    $scope.uploadData = function () {

       

        if ($scope.frmUser.$valid) {

            //var res = JSON.stringify(data2);

            $scope.uploadUserPromise = APICallService.Post('User', 'UsersUpload', $scope.uploaduserlist).then(function (e) {
                debugger;
                if (e.status = 200) {


                    var toast = $mdToast.simple().content("Your data has been uploaded successfully.").position('right bottom').action('OK').highlightAction(false).hideDelay(30000);
                    $mdToast.show(toast);
                    $('#table table tr').remove();
                    $('#uploadData').hide();
                    angular.element("input[type='file']").val(null);
                }
                else {
                    var toast = $mdToast.simple().content("Oops something is wrong while uploading !!!!").position('right bottom').action('OK').highlightAction(false).hideDelay(30000);
                    $mdToast.show(toast);
                }
            });

        }
    };
    var timer;
    $scope.validateEmail = function (x, i) {
       

        var obj = { email: x.Email };
        $timeout.cancel(timer);
        timer = $timeout(function () {
            APICallService.Get('User', 'ValidateUsers', obj).then(function (e) {
                
                if(e.data)
                    $scope.frmUser['Email_' + i].$setValidity('emailExists', false);
                else
                    $scope.frmUser['Email_' + i].$setValidity('emailExists', true);
            });
        }, 1500);
      
    }
});























