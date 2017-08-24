
app.service('APICallService', ['$http', '$mdToast', function ($http, $mdToast) {

    var result;

    //=============== Method to get data from WebApi based on controller and method name =========//
    this.Get = function (ControllerName, MethodName, obj) {

        var requestPath = null;
       
        requestPath = $http.get(SERVICE + ControllerName + '/' + MethodName, {
            params:obj
        });
     

        result = requestPath.success(function (data, status) {
            //alert("IN");
            result = data;
        }).error(function (data) {         
            var toast = $mdToast.simple().content(data.Message).action('OK').highlightAction(false).position('bottom right').hideDelay(30000);
            $mdToast.show(toast);
        });

        return result;
    }

    //=========== Method to Post data to WebApi based on controller and method name ============// 
    this.Post = function (ControllerName, MethodName, obj) {
        var requestPath = null;
        debugger
        if (obj === undefined || obj == null) {
            requestPath = $http.post(SERVICE +  ControllerName + '/' + MethodName);
        }
        else {
            requestPath = $http.post(SERVICE + ControllerName + '/' + MethodName + '/', obj);
        }
        result = requestPath.success(function (data, status) {
            result = (data);
        }).error(function (data) {
            var toast = $mdToast.simple().content(data.Message).action('OK').highlightAction(false).position('bottom right').hideDelay(30000);
            $mdToast.show(toast);
        });
        return result;
    }

    //========== Method to upload files on web server =========//
    this.UploadFile = function (forPath, Objformdata, runningId, otherId) {
        debugger;
        //requestPath = $http.post(_webAPIURL + '/FileUpload/UploadFiles/', forPath);
        var request =
        {
            method: 'POST',
            url: _webAPIURL + '/FileUpload/UploadFiles/',
            data: Objformdata,
            params: { forPath: forPath, runningKeyId: runningId, otherId: otherId },
            headers: {
                'Content-Type': undefined
            }
        };

        // SEND THE FILES.
        result = $http(request).success(function (data, status) {
            result = (data);
        }).error(function () {
        });
        return result;
    }


    this.DownloadFile = function (ControllerName, MethodName, obj) {

        var requestPath = null;

        requestPath = $http({
            method: 'GET',
            url: SERVICE + ControllerName + '/' + MethodName,
            responseType: 'arraybuffer',
            params: obj
        });

        result = requestPath.success(function (data, status) {
            //alert("IN");
            result = data;
        }).error(function (data, status) {
            var decodedString = String.fromCharCode.apply(null, new Uint8Array(data));
            var obj = JSON.parse(decodedString);
            var toast = $mdToast.simple().content(obj.Message).action('OK').highlightAction(false).position('bottom right').hideDelay(30000);
            $mdToast.show(toast);
        });

        return result;
    }
  

}]);

