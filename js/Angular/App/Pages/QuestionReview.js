angular.module('Sort').controller('QuestionReviewCntrl', function ($scope, $rootScope, $http, $state, $location, $cookies, $mdToast, $rootScope, $mdDialog, $mdMedia) {
    $scope.isReview = true;
   
    var UserSession = new $.Courses({ UserId: $scope.LoggedInUser.UserID, QuizId: $state.params.QuizId, AngularHTTP: $http });

    UserSession.GetQuestionReviews(function (e) {

        $scope.ReviewQuestions = e;


    });

    $scope.ReviewQuestion = function (ques) {
        var customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        if (!ques.hasQuiz)
        {
            $scope.currPageId = ques.PageId;
            $mdDialog.show({
                controller: 'SlideCntrl',
                templateUrl: 'templates/Pages/Slide-Dialogue.html',
                parent: angular.element(document.body),
                scope: $scope.$new(),
                fullscreen: customFullscreen
            })
        .then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
        }
        else
        {
            $scope.currPageId = ques.PageId;
            $mdDialog.show({
                controller: 'QCQCntrl',
                templateUrl: 'templates/Pages/QCQ-Dialogue.html',
                parent: angular.element(document.body),
                scope: $scope.$new(),
                fullscreen: customFullscreen
            })
        .then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
        }
       // $state.go(".", { CourseID: ques.CourseId, ModuleId: ques.ModuleId, PageId: ques.PageId });
      


    }

   

    $scope.StartExam = function () {
        $state.go('quiz', { QuizId: $state.params.QuizId })
    }
});