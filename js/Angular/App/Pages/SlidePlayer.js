angular.module('Sort').controller('SlidePlayerCntrl', function ($scope, $http, $state, $location, $cookies, $timeout, ngAudio, $mdDialog, $sce) {

    var timer;
    $scope.PlayHide = true;
    $scope.PauseHide = false;
    if ($scope.isReview) {      
        $scope.Flex = 100;
        $scope.FlexMD = 100;
        $scope.FlexSM = 100;
    }
    else {
        $scope.Flex = 70;
        $scope.FlexMD = 80;
        $scope.FlexSM =70;
    }
    $scope.prevhide = true;
    $scope.nexthide = false;

        $scope.GetSelectedPagesByModuleId = function () {
        var Packages = new $.Courses({ ModuleId: $state.params.ModuleId, UserId: $scope.LoggedInUser.UserID, AngularHTTP: $http });
        $scope.GetSelectedCourseModuleNameById();
        Packages.GetSelectedPagesByModuleIdQuery(function (e) {
            $scope.Pages = e;
            
            if ($state.params.PageId)
            {
                $scope.DisplaySlide($state.params.PageId, $scope.GetMandateCourseModuleNameById[0].hasQuiz);
            }
            else
            $scope.DisplaySlide($scope.GetMandateCourseModuleNameById[0].CurrentID, $scope.GetMandateCourseModuleNameById[0].hasQuiz);
        })
        }

        $scope.BackToList = function () {          
            $state.go('QuestionReview.List', { QuizId: $state.params.QuizId });
        }
        $scope.last = false;
        $scope.SubmitPageAnswer = function () {
            if ($scope.last) {
                $scope.last = false;
                $scope.PageQuestions = null;
            $scope.PageQuesOption = null;
            $scope.QuickCheck = false;
            $scope.ActivePageQuestionIndex = 0;
            $scope.DisplaySlide($scope.SelectedPage.NextPageNumber, false);
            }           
            var answerid = $scope.PageQuesOption[$scope.PageQuestions[$scope.ActivePageQuestionIndex].SelectedAnswer];
            var rightAnswer = jQuery.grep($scope.PageQuesOption, function (a) {
                return a.isCorrect == true;
            })[0];


            if ($scope.ActivePageQuestionIndex == $scope.PageQuestions.length - 1 && answerid.PageQuizQuesOptionId == rightAnswer.PageQuizQuesOptionId) {
                $scope.UpdateSlideInfo($scope.SelectedPage.PageId);
            }
            if (answerid.PageQuizQuesOptionId == rightAnswer.PageQuizQuesOptionId || $scope.PageQuestions[$scope.ActivePageQuestionIndex].Attempt == 2) {

                $scope.Message = null;

                if ($scope.ActivePageQuestionIndex < $scope.PageQuestions.length - 1) {
                    $scope.ButtonText = "Submit";
                    $scope.ActivePageQuestionIndex = $scope.ActivePageQuestionIndex + 1;
                    $scope.GetPageQuesOption();
                    $scope.last = false;
                }
                else {
                    $scope.last = true;
                    $scope.Message = $sce.trustAsHtml('<h2 class="text-success text-center" style="text-align: center;"><b>Correct<br/>Please click the next button to continue... </b></h2>')

                
                }
                
            }
            else {
                $scope.PageQuestions[$scope.ActivePageQuestionIndex].Attempt = $scope.PageQuestions[$scope.ActivePageQuestionIndex].Attempt + 1;
                if ($scope.PageQuestions[$scope.ActivePageQuestionIndex].Attempt == 1) {
                    $scope.PageQuesOption[$scope.PageQuestions[$scope.ActivePageQuestionIndex].SelectedAnswer].isDisabled = true;
                    $scope.PageQuestions[$scope.ActivePageQuestionIndex].SelectedAnswer = null;
                    $scope.Message = $sce.trustAsHtml('<h2 class="text-danger text-center" style="text-align: center;"><b>Incorrect, Try Again...</b></h2>');
                    $scope.ButtonText = "Submit";
                    $timeout(function () { $scope.Message = null; }, 3000);
                }
                else if ($scope.PageQuestions[$scope.ActivePageQuestionIndex].Attempt == 2) {
                    $scope.PageQuesOption[$scope.PageQuestions[$scope.ActivePageQuestionIndex].SelectedAnswer].isDisabled = true;
                    $scope.Message = $sce.trustAsHtml('<h2 class="text-info text-center" style="text-align: center;"><b>Correcnt Answer is ' + rightAnswer.OptionText + '</b></h2>');
                    $scope.ButtonText = "Next";
                    if ($scope.ActivePageQuestionIndex == $scope.PageQuestions.length - 1) {
                        $scope.UpdateSlideInfo($scope.SelectedPage.PageId);
                    }
                    $timeout(function () { $scope.Message = null; }, 3000);
                }
            }
        }


        $scope.showHelp = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'HelpDialogue.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            });
           
        };

        function DialogController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };
                       
        }

    $scope.GetSelectedCourseModuleNameById = function () {

        //alert($state.params.CourseID + $state.params.ModuleId)
        var Packages = new $.Courses({ CourseID: $state.params.CourseID, ModuleId: $state.params.ModuleId, UserId: $scope.LoggedInUser.UserID, AngularHTTP: $http });
        Packages.GetSelectedCourseModuleNameByIdQuery(function (e) {
            $scope.GetMandateCourseModuleNameById = e;

        })
    }



    $scope.UpdatePageNo = function (Pageid) {
        UserId = $scope.LoggedInUser.UserID;
        var UserSession = new $.Courses({ PageId: Pageid, UserId: UserId, ModuleId: $state.params.ModuleId, AngularHTTP: $http });
        UserSession.UpdateCurrentPageNo();

    }


    $scope.UpdateSlideInfo = function (PageId) {
        UserId = $scope.LoggedInUser.UserID;
        var UserSession = new $.Courses({ PageId: PageId, UserId: UserId, ModuleId: $state.params.ModuleId, AngularHTTP: $http });
        UserSession.SaveUserTrainingSessionQuery(function (e) {
            $scope.SelectedPage.TrainingStatusId = 3
        });
        jQuery.grep($scope.Pages, function (a) {
            return a.PageId == $scope.SelectedPage.NextPageNumber;
        })[0].isEnable = true;
    }

    $scope.GetPageQuestions = function (PageId) {
        var UserSession = new $.Courses({ PageId: PageId, AngularHTTP: $http });
        UserSession.GetPageQuestions(function (e) {
            $scope.PageQuestions = e;
            $scope.ActivePageQuestionIndex = 0;
            $scope.GetPageQuesOption();
            $scope.ButtonText = "Submit";

            //console.log(e);
        });

    }

    $scope.GetPageQuesOption = function () {
        var UserSession = new $.Courses({ PageQuizQuestionId: $scope.PageQuestions[$scope.ActivePageQuestionIndex].PageQuizQuestionId, AngularHTTP: $http });
        UserSession.GetPageQuesOption(function (e) {
            $scope.PageQuesOption = e;
        });
    }
    $scope.DisplaySlide = function (PageId, hasQuiz) {
        $scope.Message = "";
        if ($scope.audio != undefined)
            $scope.audio.pause();
        $scope.isPause = false;
        $scope.UpdatePageNo(PageId);

        $timeout.cancel(timer);
        var filterPage = jQuery.grep($scope.Pages, function (a) {
            return a.PageId == PageId;
        });
        $scope.SelectedPage = filterPage[0];
        if ($scope.SelectedPage.hasQuiz) {
            $scope.GetPageQuestions($scope.SelectedPage.PageId);
            $timeout(function () { $scope.QuickCheck = true; }, 2000);
        }
        else {
            if ($scope.SelectedPage.AudioPath) {
                $scope.audio = ngAudio.load($scope.SelectedPage.AudioPath);
                $scope.audio.play();
            }
            $scope.SelectedPage.isEnable = true;
            $('#container').load($scope.SelectedPage.FilePath+"?ie=" + (new Date()).getTime());
            $scope.PauseHide = true;
            $scope.PlayHide = false;
            timer = $timeout(function () { $scope.UpdateSlideInfo($scope.SelectedPage.PageId); }, $scope.SelectedPage.TimeToSpendOnPage);

        }

        //if (PageId == 188)
        //{
        //    $scope.QuizQuestions();
        //}



    };

    $scope.PauseSlide = function () {
        $timeout.cancel(timer);
        $scope.isPause = true;

        if ($scope.SelectedPage.AudioPath)
            $scope.audio.pause();
        stopAnimation();
    }
    $scope.ResumeSlide = function () {
        $scope.isPause = false;

        if ($scope.SelectedPage.AudioPath)
            $scope.audio.play();
        resumeAnimation();
        timer = $timeout(function () { $scope.UpdateSlideInfo($scope.SelectedPage.PageId); }, $scope.SelectedPage.TimeToSpendOnPage - $scope.audio.currentTime);
    }


    //Quiz Section
    $scope.$on('$stateChangeStart', function () {
        if ($scope.audio != undefined)
            $scope.audio.pause();
    });


});