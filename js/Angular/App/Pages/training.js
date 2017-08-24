angular.module('Sort').controller('TrainingCntrl', function ($scope, $http, $state, $location, $cookies, $timeout, ngAudio, $mdDialog, $sce) {
    
    
   
    $scope.GetSelectedCourseModuleNameById = function () {

        //alert($state.params.CourseID + $state.params.ModuleId)
        var Packages = new $.Courses({ CourseID: $state.params.CourseID, ModuleId: $state.params.ModuleId, UserId: $scope.LoggedInUser.UserID, AngularHTTP: $http });
        Packages.GetSelectedCourseModuleNameByIdQuery(function (e) {
            $scope.GetMandateCourseModuleNameById = e;

        })
    }
    

    $scope.ReLoadSlide = function (pageid, hasQuiz) {
        
            var Packages = new $.Courses({ PageId: pageid, UserId: $scope.LoggedInUser.UserID, AngularHTTP: $http });
            Packages.GetPageDetail(function (e) {
                $('.mobile-view').removeClass('nav-show');
                $('.overlay').hide();
                $scope.SelectedPage = e.Table[0];
                if ($scope.SelectedPage.hasQuiz) {
                    $state.go('Training.QuickCheck', { PageId: pageid }, { reload: 'Training.QuickCheck' });
                }
                else {
                    $state.go('Training.Slide', { PageId: pageid }, { reload: 'Training.Slide' });
                }
            })
        
    }


    $scope.LoadSlide = function (pageid, hasQuiz) {
   debugger
        if ($scope.currPageId != pageid) {
            var Packages = new $.Courses({ PageId: pageid, UserId: $scope.LoggedInUser.UserID, AngularHTTP: $http });
            Packages.GetPageDetail(function (e) {
                $('.mobile-view').removeClass('nav-show');
                $('.overlay').hide();
                $scope.SelectedPage = e.Table[0];
                if ($scope.SelectedPage.hasQuiz) {
                    $state.go('Training.QuickCheck', { PageId: pageid }, { reload: 'Training.QuickCheck' });
                }
                else {
                    $state.go('Training.Slide', { PageId: pageid }, { reload: 'Training.Slide' });
                }
            })
        }
    }

  

    var Packages = new $.Courses({ ModuleId: $state.params.ModuleId, UserId: $scope.LoggedInUser.UserID, AngularHTTP: $http });
    $scope.GetSelectedCourseModuleNameById();
    Packages.GetSelectedPagesByModuleIdQuery(function (e) {
        $scope.Pages = e;
       
    })


});