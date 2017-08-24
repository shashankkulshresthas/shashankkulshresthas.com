angular.module('Sort').controller('CoursesModuleCntrl', function ($scope, $http, $state, $location, $cookies, $mdToast, $rootScope, APICallService) {
    $scope.GetUserModulesByCourseId = function () {

       
        var UserModules = new $.Courses({ CourseID: $state.params.CourseID, UserId: $scope.LoggedInUser.UserID, AngularHTTP: $http });
        UserModules.GeModulesByCourseIdQuery(function (e) {
            $scope.GetUserModulesByCourseId = e;
            $scope.CourseName = $scope.GetUserModulesByCourseId[0].CourseName;



        })
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
    $scope.GetPagesByModulesId = function (Module) {
        //   alert(ModuleId + '  ' + moduleTypeId + '   quix' + QuizId);
        if (Module.moduleTypeId == 1) {
            if (Module.CurrentPageId) {
                if (!Module.hasQuiz)
                    $state.go('Training.Slide', { CourseID: $state.params.CourseID, ModuleId: Module.ModuleId, PageId: Module.CurrentPageId })
                else
                    $state.go('Training.QuickCheck', { CourseID: $state.params.CourseID, ModuleId: Module.ModuleId, PageId: Module.CurrentPageId })
            }
            else
                $state.go('Training', { CourseID: $state.params.CourseID, ModuleId: Module.ModuleId })
        }
        else {
            if (Module.Button == "Review")
            {
                $state.go('QuestionReview.List', { QuizId: Module.QuizId })
            }
            else
            $state.go('Instruction', { QuizId: Module.QuizId })
        }
    }

    $scope.StartExam = function () {
        $state.go('quiz', { QuizId: $state.params.QuizId })
    }
});