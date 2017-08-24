angular.module('Sort').controller('QCQCntrl', function ($scope, $http, $state, $location, $cookies, $timeout, ngAudio, $mdDialog, $sce, $rootScope) {
    $scope.UpdatePageNo = function (Pageid) {
        UserId = $scope.LoggedInUser.UserID;
        var UserSession = new $.Courses({ PageId: Pageid, UserId: UserId, ModuleId: $state.params.ModuleId, AngularHTTP: $http });
        UserSession.UpdateCurrentPageNo();

    }
    if ($rootScope.audio)
        $rootScope.audio.pause();
    $rootScope.currPageId = $state.params.PageId;
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
    $scope.showHelp = function (ev) {
        $mdDialog.show({
            controller: DialogController1,
            templateUrl: 'templates/Pages/HelpDialogue.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });

    };



    $scope.selected = [];

    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        }
        else {
            list.push(item);
        }
    };

    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };
    function DialogController1($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

    }

    $scope.hide = function () {
        $timeout.cancel(timer);
        $timeout.cancel(sectimer);
        $mdDialog.hide();
    };



    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.last = false;
    $scope.SubmitPageAnswer = function () {
        debugger
        if ($scope.last) {
            $scope.last = false;
            $scope.PageQuestions = null;
            $scope.PageQuesOption = null;
            $scope.QuickCheck = false;
            $scope.ActivePageQuestionIndex = 0;
            $scope.LoadSlide($scope.SelectedPage.NextPageNumber, false);
        }


             

            
        
                $scope.UpdateSlideInfo($scope.SelectedPage.PageId);
            
        if ($scope.GetTrue() || $scope.PageQuestions[$scope.ActivePageQuestionIndex].Attempt == 2) {

                $scope.Message = null;

                if ($scope.ActivePageQuestionIndex < $scope.PageQuestions.length - 1) {
                    $scope.ButtonText = "Submit";
                    $scope.ActivePageQuestionIndex = $scope.ActivePageQuestionIndex + 1;
                    $scope.GetPageQuesOption();
                    $scope.last = false;
                }
                else {
                    $scope.last = true;
                    $scope.ButtonText = "Next";
                    $scope.Message = $sce.trustAsHtml('<h2 class="text-success text-center" style="text-align: center;"><b>Correct<br/>Please click the next button to continue... </b></h2>')


                }

            }
            else {
                $scope.PageQuestions[$scope.ActivePageQuestionIndex].Attempt = $scope.PageQuestions[$scope.ActivePageQuestionIndex].Attempt + 1;
                if ($scope.PageQuestions[$scope.ActivePageQuestionIndex].Attempt == 1) {
                    if ($scope.PageQuestions[$scope.ActivePageQuestionIndex].QuestionType == 1) {
                        $scope.PageQuesOption[$scope.PageQuestions[$scope.ActivePageQuestionIndex].SelectedAnswer].isDisabled = true;
                        $scope.PageQuestions[$scope.ActivePageQuestionIndex].SelectedAnswer = null;
                    }
                    else {
                        $scope.selected = [];
                    }
                    $scope.Message = $sce.trustAsHtml('<h2 class="text-danger text-center" style="text-align: center;"><b>Incorrect, Try Again...</b></h2>');
                    $scope.ButtonText = "Submit";
                    $timeout(function () { $scope.Message = null; }, 4000);
                }
                else if ($scope.PageQuestions[$scope.ActivePageQuestionIndex].Attempt == 2) {
                    if ($scope.PageQuestions[$scope.ActivePageQuestionIndex].QuestionType == 1) {
                        $scope.PageQuesOption[$scope.PageQuestions[$scope.ActivePageQuestionIndex].SelectedAnswer].isDisabled = true;
                        
                    }
                    else {
                        $scope.selected = [];
                    }
                   
                    $scope.Message = $sce.trustAsHtml('<h2 class="text-info text-center" style="text-align: center;"><b>Correct Answer is ' + $scope.GetRightAnswer() + '</b></h2>');
                    $scope.ButtonText = "Next";
                    $scope.last = true;
                    if ($scope.ActivePageQuestionIndex == $scope.PageQuestions.length - 1) {
                        $scope.UpdateSlideInfo($scope.SelectedPage.PageId);
                    }
                    $timeout(function () { $scope.Message = null; }, 4000);
                }
            }



    }

    $scope.GetRightAnswer = function () {

        if ($scope.PageQuestions[$scope.ActivePageQuestionIndex].QuestionType == 1) {          
            var rightAnswer = jQuery.grep($scope.PageQuesOption, function (a) {
                return a.isCorrect == true;
            })[0];

            return rightAnswer.OptionText;

        }
        else {
            var rightAnswer = jQuery.grep($scope.PageQuesOption, function (a) {
                return a.isCorrect == true;
            });
            var strRightAnswer = '';
            $.each(rightAnswer, function (index, value) {
                if (strRightAnswer == '')
                    strRightAnswer = value.OptionText;
                else
                    strRightAnswer = strRightAnswer + ',' + value.OptionText;
            })
            return strRightAnswer;
        }

    }

    $scope.GetTrue=  function() {       

        if ($scope.PageQuestions[$scope.ActivePageQuestionIndex].QuestionType == 1) {
            var answerid = $scope.PageQuesOption[$scope.PageQuestions[$scope.ActivePageQuestionIndex].SelectedAnswer];
            var rightAnswer = jQuery.grep($scope.PageQuesOption, function (a) {
                return a.isCorrect == true;
            })[0];

            return answerid.PageQuizQuesOptionId === rightAnswer.PageQuizQuesOptionId;

        }
        else {
            var rightAnswer = jQuery.grep($scope.PageQuesOption, function (a) {
                return a.isCorrect == true;
            });
            var returnVal = true;
            if (rightAnswer.length != $scope.selected.length) {
                returnVal = false;
            }
            else {
                $.each(rightAnswer, function (index, value) {
                    var isFound = jQuery.grep($scope.selected, function (a) {
                        return a.PageQuizQuesOptionId == value.PageQuizQuesOptionId;
                    });
                    if (isFound.length == 0)
                        returnVal = false
                })
            }
            return returnVal;
        }

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
    var PageId;
    if ($scope.currPageId)
        PageId = $state.params.PageId;
    if ($state.params.PageId)
        PageId = $state.params.PageId;

    var Packages = new $.Courses({ PageId: PageId, UserId: $scope.LoggedInUser.UserID, AngularHTTP: $http });
    Packages.GetPageDetail(function (e) {
        $scope.SelectedPage = e.Table[0];
        if ($scope.SelectedPage.AudioPath) {
            $rootScope.audio = ngAudio.load($scope.SelectedPage.AudioPath);
            $rootScope.audio.play();
          
        }
        $scope.GetPageQuestions(PageId);
    })
 
    $scope.$on('$stateChangeStart', function () {       
        if ($rootScope.audio != undefined)
            $rootScope.audio.pause();
    });

});