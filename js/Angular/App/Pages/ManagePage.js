

angular.module('Sort').controller('ManagePageCntrl', function ($scope, $http, $state, $location, $cookies, $timeout, ngAudio, $mdDialog, $mdSidenav, $mdToast) {

    // Model to JSON for demo purpose


    $scope.toggleLeft = buildToggler('left1');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
        return function () {
            $mdSidenav(componentId).toggle();
        }
    }
    $scope.closeSidenav = function () {
        $mdSidenav('left1').close();

    };

    $scope.foo=function(item, partFrom, partTo, indexFrom, indexTo){
        if (item.DisplaySequence < indexTo && indexTo != 0)
        {
            indexTo = indexTo + 1;
        }
        var Packages = new $.Courses({ ModuleId: item.ModuleId, PageId: item.PageId, DisplayOrder: item.DisplaySequence, Index: indexTo, AngularHTTP: $http });
        Packages.GetRearrangePage(function (e) {
            $scope.SearchPackage();

        })

        return true;
    }

    $scope.GetAllCourses = function () {
        var Packages = new $.Courses({ AngularHTTP: $http });
        Packages.GetAllCourses(function (e) {
            $scope.Courses = e;

        })
    }

    $scope.onDrop = function (list, items, index) {
        var Packages = new $.Courses({ ModuleId: items.ModuleId, PageId: items.PageId, DisplayOrder: items.DisplaySequence, Index: index + 1, AngularHTTP: $http });
        Packages.GetRearrangePage(function (e) {
            $scope.SearchPackage();

        })

        return true;
    }

    $scope.SetActivateDeActivatePage = function (page) {

        var UserId;
        UserId = $scope.LoggedInUser.UserID;
        var UserModules = new $.Courses({ ModuleId: $scope.SelectedModule.ModuleId, PageId: page.PageId, isActive: page.isActive, AngularHTTP: $http });
        UserModules.SetActivateDeActivatePage(function (e) {

        })
    }

    $scope.GetUserModulesByCourseId = function () {
        var UserId;
        UserId = $scope.LoggedInUser.UserID;
        var UserModules = new $.Courses({ CourseID: $scope.SelectedCourse.CourseId, UserId: UserId, AngularHTTP: $http });
        UserModules.GeModulesByCourseIdQuery(function (e) {
            $scope.Modules = e;
        })
    }

    $scope.SearchPackage = function () {
        var UserId;
        UserId = $scope.LoggedInUser.UserID;
        var Packages = new $.Courses({ ModuleId: $scope.SelectedModule.ModuleId, UserId: 1, AngularHTTP: $http });
        Packages.GetSelectedPagesByModuleIdQuery(function (e) {
            $scope.Pages = e;
            $scope.closeSidenav();
        })
    }

    $scope.showTabDialog = function (page) {
        debugger        
        console.log(page);
        $scope.PageQuestions = null;
        $scope.PageQuesOption = null;
        $scope.EditPage = page;

        if ($scope.EditPage.hasQuiz) {
            $scope.GetPageQuestions($scope.EditPage.PageId);
        }




    };

    selected = null,
        previous = null;
    $scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function (current, old) {
        previous = selected;
        selected = $scope.PageQuestions[current];
        $scope.GetPageQuesOption($scope.selectedIndex);

    });

    $scope.GetPageQuestions = function (PageId) {
        var UserSession = new $.Courses({ PageId: PageId, AngularHTTP: $http });
        UserSession.GetPageQuestions(function (e) {
            $scope.PageQuestions = e;
            $scope.GetPageQuesOption(0);

        });

    }

    $scope.GetPageQuesOption = function (index) {
        var Question;
        var UserSession = new $.Courses({ PageQuizQuestionId: $scope.PageQuestions[index].PageQuizQuestionId, AngularHTTP: $http });
        UserSession.GetPageQuesOption(function (e) {
            $scope.PageQuesOption = e;

        });
    }

    $scope.AddNewPage = function () {
        $scope.EditPage = { PageId: 0, ModuleId: $scope.SelectedModule.ModuleId };
        $scope.PageQuestions = null;
        $scope.PageQuesOption = null;
    }


    $scope.SavePage = function () {
        var page = new $.Page({
            PageId: $scope.EditPage.PageId,
            ModuleId: $scope.EditPage.ModuleId,
            FilePath: $scope.EditPage.FilePath,
            TimeToSpendOnPage: $scope.EditPage.TimeToSpendOnPage,
            AudioPath: $scope.EditPage.AudioPath,
            PageName: $scope.EditPage.PageName,
            hasQuiz: $scope.EditPage.hasQuiz
            , AngularHTTP: $http
        });

        page.SavePage(function (e) {
            var toast;
            if ($scope.EditPage.PageId > 0)
                toast = $mdToast.simple().content('Page successfully updated.').action('OK').highlightAction(false).position('bottomright').hideDelay(300000);
            else
                toast = $mdToast.simple().content('Page successfully added.').action('OK').highlightAction(false).position('bottomright').hideDelay(300000);
            $mdToast.show(toast);
            if ($scope.EditPage.hasQuiz) {
                $scope.EditPage.PageId = e;
            }
            else
                $scope.EditPage = null;
        });

    }

    $scope.RemovePage = function (page, index) {
        var currPage = page;
        var currIndex = index;
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
              .title('Would you like to delete this page?')
              .textContent('All of the record related to this page will be deleted.')
              .ariaLabel('Lucky day')
              .ok('Yes')
              .cancel('No');

        $mdDialog.show(confirm).then(function () {
            var page = new $.Page({
                PageId: currPage.PageId,
                ModuleId: currPage.ModuleId
       , AngularHTTP: $http
            });
            page.RemovePage(function (e) {
                $scope.Pages.splice(index, 1);
                var toast;
                toast = $mdToast.simple().content('Page Deleted updated.').action('OK').highlightAction(false).position('bottomright').hideDelay(300000);

                $mdToast.show(toast);

            });
        }, function () {

        });



    }


    $scope.SavePageQuizQuesOption = function (ev, Questionid) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
          .title('Enter the Option')
          .placeholder('Option Text')
          .ariaLabel('Option Text')
          .initialValue('')
          .targetEvent(ev)
          .ok('Save')
          .cancel('Cancel');

        $mdDialog.show(confirm).then(function (result) {
            var UserSession = new $.Courses({ PageQuizQuestionId: Questionid, OptionText: result, AngularHTTP: $http });
            UserSession.SavePageQuizQuesOption(function (e) {
                $scope.GetPageQuesOption($scope.selectedIndex);

            });

        }, function () {

        });
    };

    $scope.AddPageQuizAddQuestion = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
          .title('Enter the Question')
          .placeholder('Question')
          .ariaLabel('Question')
          .initialValue('')
          .targetEvent(ev)
          .ok('Save')
          .cancel('Cancel');

        $mdDialog.show(confirm).then(function (result) {
            var UserSession = new $.Courses({ PageQuizId: $scope.EditPage.PageId, Question: result, AngularHTTP: $http });
            UserSession.SavePageQuizAddQuestion(function (e) {
                alert($scope.EditPage.PageId);
                $scope.GetPageQuestions($scope.EditPage.PageId);

            });

        }, function () {
        });
    };

    $scope.RemovePageQuizAddQuestion = function (id) {
        var UserSession = new $.Courses({ PageQuizQuestionId: id, AngularHTTP: $http });
        UserSession.RemovePageQuizAddQuestion(function (e) {
            $scope.GetPageQuestions($scope.EditPage.PageId);

        });
    }

    $scope.RemovePageQuizQuestionOption = function (id) {
        var UserSession = new $.Courses({ PageQuizQuesOptionId: id, AngularHTTP: $http });
        UserSession.RemovePageQuizQuestionOption(function (e) {
            $scope.GetPageQuesOption($scope.selectedIndex);

        });
    }
    $scope.UpdatePageQuestionOption = function (option) {
        var UserSession = new $.Courses({ PageQuizQuesOptionId: option.PageQuizQuesOptionId, isCorrect: option.isCorrect, AngularHTTP: $http });
        UserSession.UpdatePageQuestionOption(function (e) {


        });
    }


    $scope.removeTab = function (tab) {
        var index = tabs.indexOf(tab);
        tabs.splice(index, 1);
    };



});

