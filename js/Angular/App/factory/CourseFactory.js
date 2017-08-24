
angular.module('Sort').factory('CourseService', ['APICallService', function (APICallService) {
    var sdo = {
        GetMyCourse: function (userid) {
           
            
            var promise = APICallService.Get('Packages', 'GetUserCourses');
            promise.success(function (data, status, headers, conf) {             
                return data;
            });
            return promise;
        }
    }
    return sdo;
}]);
