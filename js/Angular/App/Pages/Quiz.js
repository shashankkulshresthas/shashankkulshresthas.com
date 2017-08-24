angular.module('Sort').controller('QuizCntrl', function ($scope, $rootScope, $http, $state, $location, $cookies, $mdToast, $rootScope, $mdDialog, $interval, APICallService) {
   
    $scope.CurrentDate = new Date();
    $scope.seconds = 0;
    $scope.StartExam = function () {
        $state.go('quiz', { QuizId: $state.params.QuizId })
    }
    $scope.GetSelectedQuestionsByQuizId = function () {

        $scope.SelectedIndex = 0;
        //alert($state.params.CourseID + $state.params.ModuleId)
        //var Packages = new $.Courses({ CourseID: $state.params.CourseID, ModuleId: $state.params.ModuleId, AngularHTTP: $http });
        var Packages = new $.Courses({ QuizId: $state.params.QuizId,UserId: $scope.LoggedInUser.UserID, AngularHTTP: $http });
        Packages.GetSelectedQuestionsByQuizIdQuery(function (e) {           
            $scope.questions = e;
            $scope.selectedIndex =0;
            $scope.GetOptions();
            if (!$rootScope.MaxTime) {
                $rootScope.MaxTime = $scope.questions[0].MaxTime * 60;
            }
            var timer = $interval(function () {
                if ($rootScope.MaxTime == 1)
                {
                    $state.go('QuestionReview.List', { QuizId: $state.params.QuizId })
                }
                $rootScope.MaxTime--;
            }, 1000);
        })
    }

    $scope.GetOptions = function () {
        var Packages = new $.Courses({ QuestionId: $scope.questions[$scope.selectedIndex].QuestionId, AngularHTTP: $http });
        Packages.GetOptions(function (e) {

            $scope.Options = e
        })

    }

    $scope.nextQuest = function (ev) {
        if (!$scope.questions[$scope.selectedIndex].SkipQuestion)
        $scope.InsertUserAnswerHistory();
        if ($scope.selectedIndex + 1 == $scope.questions.length) {
           $scope.resultPromise= APICallService.Get('Packages', 'InsertResullt', { UserId: $scope.LoggedInUser.UserID, QuizId: $state.params.QuizId }).then(function (e) {
               $scope.showAdvanced(ev);
            })
            
        }
        else {

            $scope.selectedIndex = $scope.selectedIndex + 1;
            $scope.GetOptions();
        }
       
    }

    $scope.prevQuest = function (ev) {
        $scope.selectedIndex = $scope.selectedIndex - 1;
        $scope.GetOptions();
    }
    

    $scope.InsertUserAnswerHistory = function () {

       
        var UserSession = new $.Courses({ UserId: $scope.LoggedInUser.UserID, OptionId: $scope.questions[$scope.selectedIndex].rightAnswer,UserExamAttemptID: $scope.questions[$scope.selectedIndex].UserExamAttemptID,AngularHTTP: $http });

        UserSession.InsertUserAnswerHistoryQuery(function (e) {


            //alert(JSON.stringify($scope.fetchSelectedResult.length));


        });
    }

    $scope.showAdvanced = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'templates/Pages/ReviewModel.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function (answer) {            
            $state.go('QuestionReview.List', { QuizId: $state.params.QuizId })
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
    };


    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

});