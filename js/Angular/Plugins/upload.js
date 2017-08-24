'use strict';

angular.module('Sort')
    .controller('Companyctrl', function ($scope, $http, $timeout, $upload) {
        $scope.upload = [];
        $scope.fileUploadObj = { testString1: "Test string 1", testString2: "Test string 2" };
        
        $scope.onFileSelect = function ($files) {

            alert("ENter FUnction");

            debugger

            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var $file = $files[i];
                (function (index) {
                    $scope.upload[index] = $upload.upload({
                        url: "http://192.168.100.42:1100/WEBAPI/api/User/upload", // webapi url
                        method: "POST",
                        data: { fileUploadObj: $scope.fileUploadObj },
                        file: $file
                    }).progress(function (evt) {
                        // get upload percentage
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function (data, status, headers, config) {
                        // file is uploaded successfully
                        console.log(data);
                    }).error(function (data, status, headers, config) {
                        // file failed to upload
                        console.log(data);
                    });
                })(i);
            }
        }

        $scope.abortUpload = function (index) {
            $scope.upload[index].abort();
        }
    });

