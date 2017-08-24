angular.module('Sort').controller('SlideCntrl', function ($scope, $http, $state, $location, $cookies, $timeout, ngAudio, $mdDialog, $sce, $rootScope) {

    var attempts = 1;
    $scope.UpdatePageNo = function (Pageid) {
        UserId = $scope.LoggedInUser.UserID;
        var UserSession = new $.Courses({ PageId: Pageid, UserId: UserId, ModuleId: $state.params.ModuleId, AngularHTTP: $http });
        UserSession.UpdateCurrentPageNo();

    }


    if ($rootScope.audio)
        $rootScope.audio.pause();
    var timer;
    var sectimer;
    var PageId
    if ($scope.currPageId)
        PageId = $state.params.PageId;
    if ($state.params.PageId)
        PageId = $state.params.PageId;
    $rootScope.currPageId = $state.params.PageId;

    $scope.Message = "";
    if ($scope.audio != undefined)
        $scope.audio.pause();
    $scope.isPause = false;
    $scope.UpdatePageNo(PageId);
    var Packages = new $.Courses({ PageId: $state.params.PageId, UserId: $scope.LoggedInUser.UserID, AngularHTTP: $http });
    Packages.GetPageDetail(function (e) {

        $scope.SelectedPage = e.Table[0];
        if ($scope.SelectedPage.AudioPath) {
            $rootScope.audio = ngAudio.load($scope.SelectedPage.AudioPath);
            $rootScope.audio.play();
        }
        if (e.Table1[0].Column1 == undefined) {
            sectimer = $timeout(function () { $scope.PauseSlide(); VerifySecuirty(e.Table1[0]); }, $scope.SelectedPage.TimeToSpendOnPage / 3);
        }
        $scope.SelectedPage.isEnable = true;
        $('#container').load($scope.SelectedPage.FilePath + "?ie=" + (new Date()).getTime(), function () {
              
            $('.activity-help').click(function () {
                //added by yogesh on 21st Feb 2017. Please use a common function for this. This is a patch.
                $mdDialog.show({
                    controller: DialogController1,
                    templateUrl: 'templates/Pages/HelpDialogue.html',
                    parent: angular.element(document.body),
                    targetEvent: this,
                    clickOutsideToClose: false,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                });
            });
           
        });
        $scope.PauseHide = true;
        $scope.PlayHide = false;
        timer = $timeout(function () {
            $scope.isPause = true;
            $scope.UpdateSlideInfo($scope.SelectedPage.PageId);
        }, $scope.SelectedPage.TimeToSpendOnPage);


    })

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



    $scope.$on("$destroy",
                      function (event) {
                          $timeout.cancel(timer);
                          $timeout.cancel(sectimer);

                      }


                  );


    $scope.UpdateSlideInfo = function (PageId) {
        UserId = $scope.LoggedInUser.UserID;
        var UserSession = new $.Courses({ PageId: PageId, UserId: UserId, ModuleId: $state.params.ModuleId, AngularHTTP: $http });
        UserSession.SaveUserTrainingSessionQuery(function (e) {
            $scope.SelectedPage.TrainingStatusId = 3

            jQuery.grep($scope.Pages, function (a) {
                return a.PageId == $scope.SelectedPage.NextPageNumber;
            })[0].isEnable = true;

        });

    }

    //if (PageId == 188)
    //{
    //    $scope.QuizQuestions();
    //}
    function VerifySecuirty(ques) {


        if (parseInt(ques.Value) < attempts) {
            $scope.LockAccount();
        }
        else {
            if (attempts == undefined)
                attempts = 1;
            else
                attempts = attempts + 1;

            return ShowSecurityQuestion(ques);
        }
    }


    $scope.LockAccount = function () {
        UserId = $scope.LoggedInUser.UserID;
        var UserSession = new $.Courses({ CourseID: $state.params.CourseID, UserId: UserId, AngularHTTP: $http });
        UserSession.MarkLockAccout(function (e) {
            $location.path('/MyAccount/MyCourses');
        });
    }

    function ShowSecurityQuestion(ques) {
        var confirm = $mdDialog.prompt()
        .title(ques.SecurityQuestion)
        .placeholder('Please answer')
        .ariaLabel('Please answer')
        .ok('Submit');

        return $mdDialog.show(confirm).then(function (result) {
            debugger
            if (result != ques.SecurityQuestionAnswer) {



                VerifySecuirty(ques);
            }
            else {
                attempts = 1;
                $scope.ResumeSlide();
                return true;
            }
        });
    }

    $scope.PauseSlide = function () {
        $timeout.cancel(timer);
        $scope.isPause = true;

        if ($scope.SelectedPage.AudioPath)
            $rootScope.audio.pause();
        stopAnimation();
    }
    $scope.ResumeSlide = function () {
        $scope.isPause = false;

        if ($scope.SelectedPage.AudioPath)
            $rootScope.audio.play();
        resumeAnimation();
        timer = $timeout(function () { $scope.UpdateSlideInfo($scope.SelectedPage.PageId); }, $scope.SelectedPage.TimeToSpendOnPage - $scope.audio.currentTime);
    }


    $scope.$on('$stateChangeStart', function () {

        if ($rootScope.audio != undefined)
            $rootScope.audio.pause();
    });
  


});