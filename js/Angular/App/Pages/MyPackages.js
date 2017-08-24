angular.module('Sort').controller('PurchasedPackageCntrl', function ($scope, $http, $state, $location, $cookies, $mdToast, $rootScope) {
  
    LoginId = $scope.LoggedInUser.UserID;

   

        var UserId;
        $scope.Message = "";

        UserId = $scope.LoggedInUser.UserID;
        var UserCourses = new $.Courses({ UserId: UserId, AngularHTTP: $http });
        UserCourses.GetPurPackages(function (e) {
            $scope.UserCourses = e;
            //if ($scope.UserCourses.length < 1) {
            //    $scope.ShowEmptyCourse = true;
            //}
            //else {
            //    $scope.ShowEmptyCourse = false;
            //}
            if (e == 1) {

                // var toast = $mdToast.simple().content('Information saved successfully.').action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
            }

        })
   

    $scope.GetModulesByCourseId = function (CourseID) {
        $state.go('CourseModules', { CourseID: CourseID })
    }
});