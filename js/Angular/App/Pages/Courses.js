/*********************************************************************************************************************************
 * Copyright (c) 2016 ProtaTECHIndia
 * ---------------------------------
 * File Name                            : Courses.js
 * Description                          : Courses file contain  Packages/Courses related functionality.
 * Namespace                            : 
 * Dependency                           : 
 * ----------------------------------
 * Development History
 * --------------------------------------------------------------------------------------------------------------------------------
 * Developer                    |   Action          |      Date         |   Description
 * --------------------------------------------------------------------------------------------------------------------------------
 * 1. Nitin Aggarwal            |   Creation          |   25-Nov-2016   | Courses file contain  Packages/Course related functionality
   
 **********************************************************************************************************************************/
angular.module('Sort').controller('CoursesCntrl', function ($scope, $http, $state, $location, $cookies, $mdToast, $rootScope, AUTH_EVENTS, AuthService, RegistrationModal, APICallService) {
    
    var MandateHours = 0;
    var LoginId;
    var ElectiveHours = 0;
    var arrCourses = [];
    // var bool = false;
    $scope.arrCourses = [];
    var RemainMandateHours;
    var RemainElectiveHours;
    $scope.AddCart = false;

    $scope.$on(AUTH_EVENTS.loginSuccess, function (event, args) {
        GetMandatoryCourses();
    });
    $scope.$on(AUTH_EVENTS.logOut, function (event, args) {
        GetMandatoryCourses();
    });
    
    GetMandatoryCourses();

    // THIS FUNCTION IS USED SHOW ALL PACKAGES FROM DATABASE
    function GetPackages() {

        $scope.Message = "";
        var Packages = new $.Courses({ AngularHTTP: $http });
        Packages.PackagesQuery(function (e) {
            $scope.Packages = e;

        })
    }
    // THIS FUNCTION IS USED SHOW ALL MANDATORY COURSES FROM DATABASE
    function GetMandatoryCourses() {
        userid = 0;
        if ($scope.LoggedInUser)
            userid = $scope.LoggedInUser.UserID;
        APICallService.Get('Packages', 'GetMandatoryCourses', { 'UserID': userid }).then(function (e) {
            $scope.MandatoryCourses =e.data;
        });
               
    }
    // THIS FUNCTION IS USED SHOW ALL ELECTIVE COURSES FROM DATABASE
    function GetElectiveCourses() {

        $scope.Message = "";
        var ElectiveCourses = new $.Courses({ AngularHTTP: $http });
        ElectiveCourses.ElectiveCoursesQuery(function (e) {
            $scope.ElectiveCourses = e;
            if (e == 1) {

            }

        })
    }
    // THIS FUNCTION IS USED SHOW PACKAGE DETAILS BY PACKAGEID FROM DATABASE
    $scope.GetPackageDetailsById = function () {

        var Packages = new $.Courses({ PackageId: $state.params.PackageId, AngularHTTP: $http });
        $scope.PackageID = $state.params.PackageId;
        Packages.PackageByIdQuery(function (e) {
            $scope.GetPackageDetailsById = e;
            var Action = $state.params.Action
            if (Action == 'Edit')
                $scope.ActionType = 'Update Cart'
            else
                $scope.ActionType = 'Add To Cart'

        })
    }
    // THIS FUNCTION IS USED SHOW ALL MANDATORY COURSES  BY PACKAGEID FROM DATABASE  
    $scope.GetMandateCoursesByPkgId = function () {

        var Packages = new $.Courses({ PackageId: $state.params.PackageId, AngularHTTP: $http });
        Packages.GetMandateCoursesByPkgIdQuery(function (e) {
            $scope.GetMandateCoursesByPkgId = e;

        })
    }
    // THIS FUNCTION IS USED SHOW ALL ELECTIVE COURSES  BY PACKAGEID FROM DATABASE  
    $scope.GetElectiveCoursesByPkgId = function () {

        var Packages = new $.Courses({ PackageId: $state.params.PackageId, AngularHTTP: $http });
        Packages.GetElectiveCoursesByPkgIdQuery(function (e) {
            $scope.GetElectiveCoursesByPkgId = e;
            FillPackagesCourses();

        })
    }

    // THIS FUNCTION IS USED TO REDIRECT TO  PACKAGECOURSES MAPPING PAGE OF A PARTICULAR PACKAGE ID
    $scope.GetPackageById = function (PackageId) {
        $state.go('PackageCourses', { PackageId: PackageId, Action: 'Add' })

    }

    // THIS FUNCTION IS USED TO SELECT ALL MANDATORY AND SELECTIVE COURSES OF A PARTICULAR PACKAGE
    $scope.SelectPackagesCourses = function (Course, type) {

        if (Course.CoursePriceId == true) {
            if (type == 'Mandate') {
                if ($scope.RemainingMandateHours != 0) {
                    if ((parseInt(document.getElementsByName('pkgMandateHours')[0].value) - (parseInt(MandateHours) + parseInt(Course.Duration))) >= 0) {
                        $scope.arrCourses.push(Course.CourseID);
                        MandateHours = parseInt(MandateHours) + parseInt(Course.Duration);
                        $scope.SelectedMandateHours = MandateHours;
                        $scope.RemainingMandateHours = parseInt(document.getElementsByName('pkgMandateHours')[0].value) - parseInt(MandateHours)
                        RemainMandateHours = parseInt($scope.RemainingMandateHours);
                        arrCourses = $scope.arrCourses;
                    }
                    else { 
                        alert('Selected Mandatetory course hour(s) is greater than remaining hour(s).');
                        if (Course.CoursePriceId == true)
                            Course.CoursePriceId = false;
                    }
                }
                else {
                    alert('Mandatory Courses have already been selected.');
                    RemainMandateHours = parseInt($scope.RemainingMandateHours);
                    if (Course.CoursePriceId == true)
                        Course.CoursePriceId = false;
                }
            }
        }
        else {
            if (type == 'Mandate') {
                MandateHours = parseInt($scope.SelectedMandateHours) - parseInt(Course.Duration);
                $scope.SelectedMandateHours = MandateHours;
                $scope.RemainingMandateHours = parseInt(document.getElementsByName('pkgMandateHours')[0].value) - parseInt(MandateHours)
                RemainMandateHours = parseInt($scope.RemainingMandateHours);
                for (var i = 0; i < arrCourses.length; i++) {
                    if (arrCourses[i] == Course.CourseID) {
                        $scope.arrCourses.splice(i, 1);
                        i = arrCourses.length;
                    }
                }
                arrCourses = $scope.arrCourses;
            }
        }

        if (Course.CoursePriceId == true) {
            if (type == 'Elective') {
                if ($scope.RemainingElectiveHours != 0) {
                    if ((parseInt(document.getElementsByName('pkgElectiveHours')[0].value) - (parseInt(ElectiveHours) + parseInt(Course.Duration))) >= 0) {
                        $scope.arrCourses.push(Course.CourseID);
                        ElectiveHours = parseInt(ElectiveHours) + parseInt(Course.Duration);
                        $scope.SelectedElectiveHours = ElectiveHours;
                        $scope.RemainingElectiveHours = parseInt(document.getElementsByName('pkgElectiveHours')[0].value) - parseInt(ElectiveHours)
                        RemainElectiveHours = parseInt($scope.RemainingElectiveHours);
                        arrCourses = $scope.arrCourses;
                    }
                    else {
                        alert('Selected Elective course hour(s) is greater than remaining hour(s).');
                        if (Course.CoursePriceId == true)
                            Course.CoursePriceId = false;
                    }
                }
                else {
                    alert('Elective Courses have already been selected.');
                    RemainElectiveHours = parseInt($scope.RemainingElectiveHours);
                    if (Course.CoursePriceId == true)
                        Course.CoursePriceId = false;
                }
            }
        }
        else {
            if (type == 'Elective') {
                ElectiveHours = parseInt($scope.SelectedElectiveHours) - parseInt(Course.Duration);
                $scope.SelectedElectiveHours = ElectiveHours;
                $scope.RemainingElectiveHours = parseInt(document.getElementsByName('pkgElectiveHours')[0].value) - parseInt(ElectiveHours)
                RemainElectiveHours = parseInt($scope.RemainingElectiveHours);
                for (var i = 0; i < arrCourses.length; i++) {
                    if (arrCourses[i] == Course.CourseID) {
                        $scope.arrCourses.splice(i, 1);
                        i = arrCourses.length;
                    }
                }
                arrCourses = $scope.arrCourses;
            }
        }
        if (parseInt($scope.RemainingMandateHours) == 0 && parseInt($scope.RemainingElectiveHours) == 0) {
            $scope.AddCart = true;
        }
        else {
            $scope.AddCart = false;
        }
    }
    // THIS FUNCTION IS USED TO ADD ITEM IN CART
    $scope.AddToCart = function (Package, course, purchasetype) {
        
        debugger
        Package.PurchaseType = purchasetype;   //purchasetype status
        if (!AuthService.isAuthenticated()) {
            RegistrationModal().then(function () {
              
                //PurchaseItem(Package);                

                $location.path('/MyAccount/MyCourses');
            });
        }
        else {
           
            //PurchaseItem(Package);
            $location.path('/MyAccount/MyCourses');

    }
    }



    function PurchaseItem(Package) {
      
        var packages = new $.Courses({ CourseID: Package.CourseID, UserId: $scope.LoggedInUser.UserID, AngularHTTP: $http });
        packages.IsCoursePurchased(function (data) {
            
            if (!data) {
                var cartItems;
                var bool = true;
                var CartItems = JSON.parse(localStorage.getItem('CartItems'));
                if (CartItems == undefined)
                    var CartItems = [];
                else {
                    var returnedData = $.grep(CartItems, function (element, index) {
                        return element.CourseID == Package.CourseID && element.UserID == $scope.LoggedInUser.UserID;
                    });
                    if (returnedData.length > 0)
                        bool = false;
                }


               


                if (bool) {
                   
                    cartItems = { CourseID: Package.CourseID, PackageId: Package.CourseID, Type: 'Course', Description: Package.Description, Hours: Package.Duration, Price: Package.Price, NoOfLicense: 1, Name: Package.CourseName, PurchaseType: Package.PurchaseType, UserID: $scope.LoggedInUser.UserID };
                
                    CartItems.push(cartItems);

                    //   $cookies.put('CartItems', JSON.stringify(CartItems));
                    localStorage.setItem('CartItems', JSON.stringify(CartItems));
                    $rootScope.$broadcast('CartUpdated');
                    var toast = $mdToast.simple().content(Package.CourseName+" Added to cart.").action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
                    $mdToast.show(toast);
                }
                else {
                    var toast = $mdToast.simple().content(Package.CourseName + " Already added to cart.").action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
                    $mdToast.show(toast);
                }
               // $location.path('/MyAccount/CheckOut');
            }
            else {
                $location.path('/MyAccount/MyCourses');
            }
        })
        
      

    }

    //angular.element(document).ready(function () {
    //    SetCoursesList();
    //});
    // THIS FUNCTION IS USED TO FILL USER SELECTED COURSES
    function FillPackagesCourses() {

        if ($state.params.Action == 'Edit') {
            $scope.RemainingElectiveHours = 0;
            $scope.RemainingMandateHours = 0;
            $scope.AddCart = true;
            var boolCourses = false;
            var pkgid = $state.params.PackageId;
            // alert(pkgid);
            var Cart = localStorage.getItem('CartItems');
            // var Cart = $cookies.get('CartItems');
            var CartItems = [];
            if (Cart == null) {
                CartItems = [];
            }
            else
                CartItems = JSON.parse(Cart);
            for (var i = 0; i < CartItems.length; i++) {

                if (CartItems[i].PackageId == pkgid) {
                    if (CartItems[i].CoursesList != null) {

                        if (boolCourses == false) {
                            $scope.arrCourses = CartItems[i].CoursesList;
                            arrCourses = $scope.arrCourses;
                            boolCourses = true;
                        }

                    }
                    $scope.SelectedElectiveHours = CartItems[i].ElectiveHours;
                    $scope.SelectedMandateHours = CartItems[i].MandateHours;
                }

            }

            for (var x = 0; x < $scope.GetMandateCoursesByPkgId.length; x++) {

                for (var i = 0; i < CartItems.length; i++) {
                    if (CartItems[i].CoursesList != null) {
                        for (var j = 0; j < CartItems[i].CoursesList.length; j++) {
                            if (parseInt(CartItems[i].CoursesList[j]) == parseInt($scope.GetMandateCoursesByPkgId[x].CourseID)) {
                                $scope.GetMandateCoursesByPkgId[x].CoursePriceId = true;
                            }
                        }
                    }
                }
            }

            for (var x = 0; x < $scope.GetElectiveCoursesByPkgId.length; x++) {

                for (var i = 0; i < CartItems.length; i++) {
                    if (CartItems[i].CoursesList != null) {
                        for (var j = 0; j < CartItems[i].CoursesList.length; j++) {
                            if (parseInt(CartItems[i].CoursesList[j]) == parseInt($scope.GetElectiveCoursesByPkgId[x].CourseID)) {
                                $scope.GetElectiveCoursesByPkgId[x].CoursePriceId = true;
                            }
                        }
                    }
                }

            }
        }
    }
});


angular.module('Sort').controller('MyCoursesCntrl', function ($scope, $http, $state, $location, $cookies, $timeout, ngAudio) {
    var timer;
   
    //GetUserModulesByCourseId();
   

    //  if ($cookies.get('credential') == undefined || $cookies.get('credential') == null) {
    //     $location.path('/login');
    //  }
    //  else {
  
  
   

    $scope.Prev = function (PreviousPageNumber) {

        for (var i = 0; i <= $scope.GetMandatePagesByModuleId.length - 1; i++) {
            if ($scope.GetMandatePagesByModuleId[i].PageId == PreviousPageNumber) {

                $scope.prevval = PreviousPageNumber;
                $scope.nextval = NextPageNumber;

                $('#container').load($scope.GetMandatePagesByModuleId[i].FilePath);
                setTimeout(function () { getwow(); }, 5000);
            }


        }
    };

    $scope.Next = function (NextPageNumber) {

        for (var i = 0; i <= $scope.GetMandatePagesByModuleId.length - 1; i++) {
            if ($scope.GetMandatePagesByModuleId[i].PageId == NextPageNumber) {
                $scope.prevval = PreviousPageNumber;
                $scope.nextval = NextPageNumber;

                $('#container').load($scope.GetMandatePagesByModuleId[i].FilePath);
                setTimeout(function () { getwow(); }, 5000);
            }
        }
    };

    function getwow() {
        var TotalTime = 0;
        $("#target .wow").each(function (index2) {
            var itm = $(this, "eq(" + index2 + ")").attr("data-wow-delay");
            if ((itm != undefined) && (itm != null)) {
                itm = itm.split('s')[0];
                TotalTime += parseInt(itm);
            }
        });



        //TotalTime = parseInt(TotalTime) + 60000;
        TotalTime = parseInt(TotalTime);

        setTimeout(function () {
            //$("#prev").removeClass("ng-hide");		
            $("#next").removeClass("ng-hide");
        }, parseInt(TotalTime));

    }

  

  


    $scope.SaveResultInfo = function (Percentage) {


        UserId = $scope.LoggedInUser.UserID;



        var UserSession = new $.Courses({ QuizId: $state.params.QuizId, UserId: UserId, Percentage: Percentage, AngularHTTP: $http });

        UserSession.SaveResultQuery(function (e) {
            //alert("LN486: " + e);            
        });
    }

  




    $scope.InsertUserAnswerHistory = function (OptionId) {

        UserId = $scope.LoggedInUser.UserID;

        var UserSession = new $.Courses({ UserId: UserId, OptionId: OptionId, AngularHTTP: $http });

        UserSession.InsertUserAnswerHistoryQuery(function (e) {


            //alert(JSON.stringify($scope.fetchSelectedResult.length));


        });
    }

    $scope.GetSelectedResultByQuizId = function (QuizId) {

        UserId = $scope.LoggedInUser.UserID;
        var UserSession = new $.Courses({ UserId: UserId, QuizId: $state.params.QuizId, AngularHTTP: $http });

        UserSession.GetSelectedResultByQuizIdQuery(function (e) {
            $scope.fetchSelectedResult = e;
            //alert(JSON.stringify(e));
            //alert(JSON.stringify($scope.fetchSelectedResult.length));


        });
    }


    //GetSelectedResultByQuizIdQuery


   

   

    $scope.GetSelectedQuestionsByQuizId = function () {

        $scope.SelectedIndex = 0;
        //alert($state.params.CourseID + $state.params.ModuleId)
        //var Packages = new $.Courses({ CourseID: $state.params.CourseID, ModuleId: $state.params.ModuleId, AngularHTTP: $http });
        var Packages = new $.Courses({ QuizId: $state.params.QuizId, AngularHTTP: $http });
        Packages.GetSelectedQuestionsByQuizIdQuery(function (e) {
            $scope.GetMandateQuestionsByQuizId = e;
            $scope.questions = e;
            $scope.SelectedPage = $scope.questions;
            $scope.selectedQuestion = $scope.questions[$scope.SelectedIndex];
            $scope.NoOfCorrectAnswer = 0;
            $scope.GetOptions();

        })
    }

    $scope.GetOptions = function () {
        var Packages = new $.Courses({ QuestionId: $scope.selectedQuestion.QuestionId, AngularHTTP: $http });
        Packages.GetOptions(function (e) {

            $scope.Options = e
        })

    }

    $scope.SubmitResult = function () {
        var selectedOption = jQuery.grep($scope.Options, function (a) {
            return a.OptionId == $scope.selectedQuestion.SelectedAnswer;
        })[0];


        $scope.InsertUserAnswerHistory(selectedOption.OptionId);

        if (!selectedOption.IsCorrectOption) {
            if ($scope.selectedQuestion.NoOfAttempt == 0) {
                $scope.Message = "Wrong answer. Please choose right one."
                jQuery.grep($scope.Options, function (a) {
                    return a.OptionId == $scope.selectedQuestion.SelectedAnswer;
                })[0].isDisabled = true;
                $scope.selectedQuestion.SelectedAnswer = null;
                $timeout(function () { $scope.Message = null }, 2000);
                $scope.selectedQuestion.NoOfAttempt = $scope.selectedQuestion.NoOfAttempt + 1;
            }
            else if ($scope.selectedQuestion.NoOfAttempt == 1) {
                var rightOption = jQuery.grep($scope.Options, function (a) {
                    return a.IsCorrectOption == true;
                })[0];

                $scope.Message = "Wrong answer. Right answer is " + rightOption.OptionDesc;
                $timeout(function () {
                    $scope.Message = null
                    if ($scope.SelectedIndex < $scope.questions.length) {
                        $scope.SelectedIndex = $scope.SelectedIndex + 1;
                        $scope.selectedQuestion = $scope.questions[$scope.SelectedIndex];
                        $scope.GetOptions();
                    }
                }, 5000);
                $scope.selectedQuestion.NoOfAttempt = $scope.selectedQuestion.NoOfAttempt + 1;



                if ($scope.SelectedIndex == $scope.questions.length - 1) {
                    //Percentage
                    var Percentage = 0;
                    Percentage = (parseFloat($scope.NoOfCorrectAnswer) / parseFloat($scope.questions.length)) * 100;
                    $scope.SaveResultInfo(Percentage);
                }
            }

        }
        else {

            $scope.NoOfCorrectAnswer = $scope.NoOfCorrectAnswer + 1;

            $scope.selectedQuestion.NoOfAttempt = $scope.selectedQuestion.NoOfAttempt + 1;


            if ($scope.SelectedIndex == $scope.questions.length - 1) {

                $scope.SelectedIndex = $scope.SelectedIndex + 1;
                $scope.selectedQuestion = $scope.questions[$scope.SelectedIndex];

                //Percentage

                var Percentage = 0;

                Percentage = (parseFloat($scope.NoOfCorrectAnswer) / parseFloat($scope.questions.length)) * 100;


                $scope.SaveResultInfo(Percentage);



            }
            else if ($scope.SelectedIndex < $scope.questions.length) {

                $scope.SelectedIndex = $scope.SelectedIndex + 1;
                $scope.selectedQuestion = $scope.questions[$scope.SelectedIndex];
                $scope.GetOptions();



            }







        }
    };


    //Quiz Section

    // THIS FUNCTION IS USED SHOW PACKAGE DETAILS BY PACKAGEID FROM DATABASE
    



    /* Start Woki Toki Quiz  */
    var itmQuestion = {};

    $scope.QuizQuestions = function () {

        $scope.SelectedQuizIndex = 0;
        itmQuestion = [
            {
                "QuestionId": "0",
                "key": "antenna",
                "value": "Antenna",
                "answer": "antenna"
            },
            {
                "QuestionId": "1",
                "key": "power",
                "value": "Power Switch",
                "answer": "power"
            },
            {
                "QuestionId": "2",
                "key": "display",
                "value": "Display Screen",
                "answer": "display"
            },
            {
                "QuestionId": "3",
                "key": "microphone",
                "value": "Microphone",
                "answer": "microphone"
            },
            {
                "QuestionId": "4",
                "key": "speaker",
                "value": "Speaker",
                "answer": "speaker"
            },
            {
                "QuestionId": "5",
                "key": "accessory",
                "value": "Accessory Jack",
                "answer": "accessory"
            },
            {
                "QuestionId": "6",
                "key": "talk",
                "value": "Talk/Exit menu",
                "answer": "talk"
            },
            {
                "QuestionId": "7",
                "key": "menu",
                "value": "Menu Button",
                "answer": "menu"
            }
        ];

        $scope.QuizQuestionsAnswer = itmQuestion;
        $scope.SelectedQuiz = itmQuestion[$scope.SelectedQuizIndex];
    };

    $scope.SubmitQuiz = function (SelectedQuizId) {
        $scope.CurrentAnsewr = $scope.SelectedQuiz.answer;
        $scope.SelectedAnsewr = $scope.QuizQuestionsAnswer[SelectedQuizId];

        if ($scope.SelectedQuizIndex != $scope.QuizQuestionsAnswer.length) {
            if ($scope.CurrentAnsewr == $scope.SelectedAnsewr.answer) {
                $scope.Message = "Correct answer.";
                if ($scope.RightQuizAnswer == undefined) {
                    $scope.RightQuizAnswer = 0;
                }
                $scope.RightQuizAnswer = $scope.RightQuizAnswer + 1;
                $("#data ." + $scope.SelectedQuiz.key + "").addClass("active");
                $scope.myObj = {
                    "color": "#004d00",
                    "padding": "50px"
                }
                $timeout(function () {
                    $scope.Message = null;
                    $scope.SelectedQuizIndex = $scope.SelectedQuizIndex + 1;
                    $scope.SelectedQuiz = itmQuestion[$scope.SelectedQuizIndex];
                    $("#data > div").removeClass("active");
                    $scope.NoOfOptionsAttempt = 0;
                }, 1000);
            }
            else {
                if ($scope.NoOfOptionsAttempt == undefined) {
                    $scope.NoOfOptionsAttempt = 0;
                }
                if ($scope.NoOfOptionsAttempt == 0) {
                    $scope.Message = "Incorrect, Please try again..."
                    $scope.NoOfOptionsAttempt = $scope.NoOfOptionsAttempt + 1;
                    $scope.checked = true;
                    $scope.myObj = {
                        "color": "#e91640",
                        "padding": "50px"
                    }
                    //$("#data ." + $scope.QuizQuestionsAnswer[SelectedQuizId].key + "").attr("ng-disabled", $scope.checked);		
                    $timeout(function () {
                        $scope.Message = null;
                    }, 3000);
                }
                else if ($scope.NoOfOptionsAttempt == 1) {
                    $scope.Message = "The Correct Answer is Highlighted";
                    $("#data ." + $scope.SelectedQuiz.key + "").addClass("active");
                    $scope.myObj = {
                        "color": "#004d00",
                        "padding": "50px"
                    }
                    $timeout(function () {
                        $scope.Message = null;
                        $("#data > div").removeClass("active");
                        $scope.SelectedQuizIndex = $scope.SelectedQuizIndex + 1;
                        $scope.SelectedQuiz = itmQuestion[$scope.SelectedQuizIndex];
                        $scope.NoOfOptionsAttempt = 0;
                    }, 5000);
                }
            }
        }

        if ($scope.SelectedQuizIndex == $scope.QuizQuestionsAnswer.length - 1) {
            //alert("SelectedQuizIndex: " + $scope.SelectedQuizIndex + "  QuizQuestionsAnswer: " + $scope.QuizQuestionsAnswer.length);		

            var resultPersentage = (parseFloat($scope.RightQuizAnswer) / parseFloat($scope.QuizQuestionsAnswer.length)) * parseFloat(100);
            //alert("RightQuizAnswer: " + $scope.RightQuizAnswer + "   QuizQuestionsAnswer.length:  " + $scope.QuizQuestionsAnswer.length + "   resultPersentage:  " + resultPersentage);		
            if (parseInt(resultPersentage) >= 60) {
                $scope.QuizResult = "Congratulations! You have completed this activity. Click the Next button to continue with the course.";
                $scope.myObj2 = {
                    "color": "#004d00",
                    "padding": "50px"
                }
            }
            else {
                $scope.myObj2 = {
                    "color": "#e91640",
                    "padding": "50px"
                }
                $scope.QuizResult = "Your Result is too low as per our exception. Please try again later...";
            }
        }
    };

    /* End Woki Toki Quiz  */


    


    

   

   
});



angular.module('Sort').controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', '$cookies', '$window', 'USER_ROLES', '$location', '$state', 'loginModal', 'AUTH_EVENTS', 'RegistrationModal', 'anchorSmoothScroll','scroll','$anchorScroll',
                                               'AuthService', '$rootScope', 'APICallService', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $cookies, $window, USER_ROLES, $location, $state, loginModal, AUTH_EVENTS, RegistrationModal, anchorSmoothScroll, scroll, $anchorScroll,
                                               AuthService, $rootScope, APICallService) {
                                                  
                                                   if (AuthService.isAuthenticated()) {
                                                       $scope.LoggedInUser = AuthService.GetCredential();
                                                   }
                                                   else {
                                                       $scope.LoggedInUser = null;
                                                   }
                                                 
                                                  

    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;


    $scope.RenewCourses = 0;

    $scope.setCurrentUser = function (user) {      
        $scope.LoggedInUser = user;
    };  


    $scope.$on(AUTH_EVENTS.loginSuccess, function (event, args) {
        debugger
        $scope.LoggedInUser = AuthService.GetCredential();
        $scope.VerifyRenewCourses();

    });

    $scope.$on($scope.RenewCourses, function (event, args) {
        $scope.VerifyRenewCourses();
    });



    $scope.VerifyRenewCourses = function () {
        debugger
        var obj = {};

        if ($scope.LoggedInUser != null) {
            obj.UserID = parseInt($scope.LoggedInUser.UserID);
            APICallService.Post('Packages', 'VerifyCoursevalid',obj).then(function (e) {
                debugger
                if (parseInt(e.data.length) > 0) {
                    debugger
                    for (var i = 0; i <= parseInt(e.data.length) - 1; i++) {
                        debugger
                        if (parseInt(e.data[i].RemainingDays) <= 5) {
                            $scope.RenewCourses = 1;                          
                            break;
                        }
                    }
                }
            });
        }
    };  

    $scope.$on(AUTH_EVENTS.logOut, function (event, args) {
        $scope.setCurrentUser(null);
    });
   
    //   $cookies.remove("CartItems");
    $scope.toggleSidenav = function (menuId) {
        
        $mdSidenav(menuId).toggle();
    };
    $scope.closeSidenav = function () {
        $mdSidenav('left').close();

    };
    ShowCart();
 
    $scope.login = function () {
        $('#collapseEx').removeClass('in');
        loginModal();             
    }                                        
    $scope.register = function () {
        $('#collapseEx').removeClass('in');
        RegistrationModal();
    }


    $scope.$on('CartUpdated', function (event, args) {
        ShowCart();
    });
    $scope.$on('CartUpdate', function (event, args) {
        Flush();
    });
    var Cart = localStorage.getItem('CartItems');
    //  var Cart = $cookies.get('CartItems');
    if (Cart == null || Cart == undefined) {
        $scope.ShowCartItems = true;
    }
    else {
        $scope.ShowCartItems = false;
    }

    $scope.showTermsDialoge = function (ev) {
        $mdDialog.show({
            controller: clearController,
            templateUrl: 'templates/Pages/termsDialogue.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });

    };
    $scope.showprivacyDialoge = function (ev) {
        $mdDialog.show({
            controller: clearController,
            templateUrl: 'templates/Pages/privacyPolicy.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });

    };

    function clearController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

    }

    $scope.hide = function () {
        $timeout.cancel(timer);
        $timeout.cancel(sectimer);
        $mdDialog.hide();
    };



    function Flush() {
        $cookies.remove('credential');
        $cookies.remove('CartId');
        localStorage.removeItem("CartItems");
        $scope.LoggedInUser = null
        $scope.ShowCart = false;
        $scope.ShowCartItems = true;
        $scope.ShowPurchase = false;
        $window.location.href = 'dashboard-guest.html#/login';
    }
    $scope.logOut = function () {
        $scope.setCurrentUser(null);
        AuthService.logOut();
        $rootScope.$broadcast(AUTH_EVENTS.logOut);
        $location.path('/home');

    }
   

    function AppCtrl($scope) {
        $scope.Register.Email = 'abc@abc.com';
    }
    function ShowCart() {

        var Cart = localStorage.getItem('CartItems');
        //  var Cart = $cookies.get('CartItems');
        if (Cart != null || Cart != undefined) {
            $scope.CartItems = JSON.parse(Cart).length;
            if (JSON.parse(Cart).length > 0) {
                $scope.ShowCart = true;
                $scope.ShowPurchase = true;
                $scope.ShowCartItems = false;
            }
            else {
                $scope.ShowCart = false;
                $scope.ShowPurchase = false;
                $scope.ShowCartItems = true;
            }
        }
        else {
            $scope.ShowCart = false;
            $scope.ShowPurchase = false;
            $scope.ShowCartItems = true;
        }
    }

    



}]);

//--------Start of Cart controller -----------------------------------//

angular.module('Sort').controller('HomeCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', '$cookies', '$window', 'USER_ROLES', '$location', '$state', 'loginModal', 'AUTH_EVENTS', 'RegistrationModal', 'anchorSmoothScroll', 'scroll', '$anchorScroll',
                                               'AuthService', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $cookies, $window, USER_ROLES, $location, $state, loginModal, AUTH_EVENTS, RegistrationModal, anchorSmoothScroll, scroll, $anchorScroll,
                                               AuthService) {
                                                   $scope.ScrollCtrl = function (div) {
                                                       $('#collapseEx').removeClass('in');

                                                       switch (div) {
                                                           case 1:
                                                               $location.hash('about-sort');
                                                               $anchorScroll()
                                                               break;
                                                           case 2:
                                                               $location.hash('teamwork');
                                                               $anchorScroll();
                                                               break;
                                                           case 3:
                                                               $location.hash('faqs');
                                                               $anchorScroll();
                                                               break;
                                                           case 4:
                                                               $location.hash('contact');
                                                               $anchorScroll();
                                                               break;
                                                       }


                                                   }
                                                   $scope.ScrollCtrl($state.params.pagetoScroll);










                                               }]);


angular.module('Sort').controller('CartCountCntrl', function ($scope, AuthService, AUTH_EVENTS) {
    debugger
    $scope.CartItems = [];
    function GetItemList() {
        if (AuthService.isAuthenticated())
        {
            $scope.LoggedInUser = AuthService.GetCredential();
        var Total = 0;
        var Cart = localStorage.getItem('CartItems');
        if (Cart != null || Cart != undefined) {
            $scope.CartItems = $.grep(JSON.parse(Cart), function (value, index) {
                return value.UserID == $scope.LoggedInUser.UserID;
            })
        }
            //$scope.CartItems = JSON.parse(Cart);
        }
        else {
            $scope.CartItems = [];
        }



    };
   GetItemList();

   $scope.$on('CartDeleted', function (event, args) {
       GetItemList();
   });

   $scope.$on('CartUpdated', function (event, args) {
       GetItemList();
   });
   $scope.$on(AUTH_EVENTS.loginSuccess, function (event, args) {
       GetItemList();
   });
   $scope.$on(AUTH_EVENTS.logOut, function (event, args) {
       GetItemList();
   });

});

angular.module('Sort').controller('RenewCoursesCountCntrl', function ($scope, AuthService, AUTH_EVENTS, APICallService) {   

    $scope.RenewCourses = 0;  
    
    $scope.$on(AUTH_EVENTS.loginSuccess, function (event, args) {
        debugger
        $scope.LoggedInUser = AuthService.GetCredential();
        $scope.VerifyRenewCourses();

    });

    $scope.$on($scope.RenewCourses, function (event, args) {
        $scope.VerifyRenewCourses();
    });



    $scope.VerifyRenewCourses = function () {
        debugger
        var obj = {};

        if ($scope.LoggedInUser != null) {
            obj.UserID = parseInt($scope.LoggedInUser.UserID);
            APICallService.Post('Packages', 'VerifyCoursevalid', obj).then(function (e) {
                debugger
                if (parseInt(e.data.length) > 0) {
                    debugger
                    for (var i = 0; i <= parseInt(e.data.length) - 1; i++) {
                        debugger
                        if (parseInt(e.data[i].RemainingDays) <= 5) {
                            $scope.RenewCourses = 1;                           
                            break;
                        }
                    }
                }
            });
        }
    };   

});






angular.module('Sort').controller('CartCntrl', function ($scope, $http, $state, $location, $cookies, $mdToast, $rootScope, $window, $filter, $mdDialog, redirectToUrlAfterLogin, AuthService, APICallService, AUTH_EVENTS) {
    $scope.$on('CartDeleted', function (event, args) {
        $scope.ItemList();
    });

    $scope.CartItems = {};

    


    function ShowCart() {

        var Cart = localStorage.getItem('CartItems');
        //  var Cart = $cookies.get('CartItems');
        if (Cart != null || Cart != undefined) {
            $scope.CartItems = JSON.parse(Cart).length;
            if (JSON.parse(Cart).length > 0) {
                $scope.ShowCart = true;
                $scope.ShowPurchase = true;
                $scope.ShowCartItems = false;
            }
            else {
                $scope.ShowCart = false;
                $scope.ShowPurchase = false;
                $scope.ShowCartItems = true;
            }
        }
        else {
            $scope.ShowCart = false;
            $scope.ShowPurchase = false;
            $scope.ShowCartItems = true;
        }
    }


    $scope.$on(AUTH_EVENTS.loginSuccess, function (event, args) {
        debugger
        $scope.ItemList();
    });

    // THIS FUNCTION IS USED TO SHOW ALL CART ITEMS 
    $scope.ItemList = function () {
        var Total = 0;
        var Cart = localStorage.getItem('CartItems');
        if (Cart != null || Cart != undefined) {
            $scope.CartItems = $.grep(JSON.parse(Cart), function (value, index) {
                return value.UserID == $scope.LoggedInUser.UserID;
            });
           
            for (var i = 0; i < $scope.CartItems.length; i++) {
                Total = Total + $scope.CartItems[i].Price;
            }
            //  $scope.ShowShoppingList = true;

        }
        $scope.TotalPrice = Total;
        if (Cart == undefined || Cart == null) {
            $scope.ShowCartItems = true;
        }

    };


    var Months = [];
    
    for (i = 1; i <= 12; i++) {       

        Months.push({ Value: i.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) });
    }

    $scope.SelectExpirationMonths = Months;



    var Years = [];
    var date = new Date();
    for (i = 0; i <= 20; i++) {
        Years.push({ Value: date.getFullYear() + i });
    }

    $scope.SelectExpirationYears = Years;

    $scope.clearCoupon = function () {
        $scope.Coupon = null;
    }
    

    $scope.ExpiryYear = function (SelectedYear)
    {

        var CurrentMonth = new Date().getMonth();

        var CurrentYear = new Date().getFullYear();
        
        
        var Months = [];

        if (SelectedYear == CurrentYear) {
            CurrentMonth = parseInt(CurrentMonth) + 1;          
            for (i = parseInt(CurrentMonth); i <= 12; i++) {

                Months.push({ Value: i.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) });
            }     
        }
        else {
            for (i = 1 ; i <= 12; i++) {
                Months.push({ Value: i.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) });
            }
        }

        $scope.SelectExpirationMonths = Months;
        
    }

    function GetCartId() {
        var CartId = '';
        var cartId = '';//$cookies.get('CartId');
       // if (cartId == null) {
            var date = new Date();
            $scope.ddMMyyyy = $filter('date')(new Date(), 'dd/MM/yyyy');
            $scope.HHmmss = $filter('date')(new Date(), 'HH:mm');

            CartId = $scope.ddMMyyyy + '_' + $scope.HHmmss;

           // $cookies.put('CartId', JSON.stringify(CartId));
        //}
        
           // CartId = JSON.stringify(CartId);

        return CartId;

    }
    // THIS FUNCTION IS USED TO  MANAGE USER ORDER DETAILS IN  DATABASE RELATED TABLES
    $scope.PurchaseOrder1 = function () {


            var CartID = GetCartId();
            LoginId = $scope.LoggedInUser.UserID;
            CartID = CartID + '@' + LoginId
            var CartItemsList = localStorage.getItem('CartItems');
            // var CartItemsList = $cookies.get('CartItems');
            var UserCartItems = [];
            if (CartItemsList == null) {
                UserCartItems = [];
            }
            else
                UserCartItems = JSON.parse(CartItemsList);


            for (var i = 0; i < UserCartItems.length; i++) {

                if (UserCartItems[i].Type == 'Course') {
                    var UserPurchaseOrder = new $.Cart({ PackageId: UserCartItems[i].PackageId, NoOfLicense: UserCartItems[i].NoOfLicense, PackageCoursesID: null, Type: UserCartItems[i].Type, Price: UserCartItems[i].Price, UserID: LoginId, CartId: CartID,CardDetailId:e.data, AngularHTTP: $http });
                    UserPurchaseOrder.SaveOrderList(function (e) {
                        localStorage.removeItem('CartItems');
                        $rootScope.$broadcast('CartDeleted');
                        $location.path('/MyCourses')
                    }

                    );
                }
                         

            //$rootScope.$broadcast('CartUpdate');
            //var toast = $mdToast.simple().content('Order saved successfully').action('OK').highlightAction(false).position('bottomright').hideDelay(300000);
            //$mdToast.show(toast);           
        }



    }

    $scope.$watch('CouponCode', function (newVal) {
        $scope.CouponForm.CouponCode.$setValidity("invalid", true);
    })

    $scope.ApplyCoupon = function () {
       
      $scope.ApplyCouponPromise=  APICallService.Get('Packages', 'VerifyCouponCode', { 'CouponCode': $scope.CouponCode }).then(function (e) {
           
            if (e.data != null && e.data != "") {
                
                $scope.Coupon = e.data[0];
            }
            else {
              
                $scope.CouponForm.CouponCode.$setValidity("invalid", false);
            }
        });
        
    }

    $scope.PurchaseOrder = function () {
        var CartID = GetCartId();
        $scope.Payment.UserId = $scope.LoggedInUser.UserID;
        $scope.Payment.CartType = $scope.PaymentForm.Number.$ccType;

        $scope.Payment.Expiry = $scope.Payment.ExpiryMonth + '/' + $scope.Payment.ExpiryYear;
        CartID = CartID + '@' + $scope.LoggedInUser.UserID
        var CartItemsList = localStorage.getItem('CartItems');
        // var CartItemsList = $cookies.get('CartItems');
        var UserCartItems = [];
        if (CartItemsList == null) {
            UserCartItems = [];
        }
        else
            UserCartItems = $.grep(JSON.parse(CartItemsList), function (value, index) {
                return value.UserID == $scope.LoggedInUser.UserID;
            });
        UserCartItems[0].CartID = CartID;
        UserCartItems[0].UserCardDetail = $scope.Payment;
        if ($scope.Coupon)
            UserCartItems[0].CouponCode = $scope.CouponCode;

        console.log(UserCartItems);


      $scope.purchasePromise=  APICallService.Post('Packages', 'SaveUserOrder', UserCartItems).then(function (e) {
            if (e.data.type == "Success")
            {
                var remainingItems = $.grep(JSON.parse(CartItemsList), function (value, index) {
                    return value.UserID != $scope.LoggedInUser.UserID;
                });
                localStorage.setItem('CartItems', JSON.stringify(remainingItems));
                $rootScope.$broadcast('CartDeleted');

                $mdDialog.show({
                    locals: { UserType: $scope.LoggedInUser.UserType, PurchaseType: UserCartItems[0].PurchaseType },
                    controller: StartTrainingCntrl,
                    controllerAs: 'dialog',
                    templateUrl: 'templates/Pages/paymentSuccessfullModel.html',
                    clickOutsideToClose: false,
                });


              
            }
            else
            {
                var toast = $mdToast.simple().content(e.data.Message).action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
                 $mdToast.show(toast);
            }
        
        });
    }

    function StartTrainingCntrl($scope, $location, UserType, PurchaseType) {
        $scope.UserType = UserType;       

        $scope.PurchaseType = PurchaseType;

        $scope.StartTraining = function () {
            debugger

            $mdDialog.hide();
            if (UserType == "User") {
                
                //$state.go("MyCourses");
                $location.path('/MyAccount/MyCourses');
            }
            else if (UserType = "Company") {
                //$state.go("UsrList");
                $location.path('/MyAccount/UsrList');
            }           
            
        }
    }

    // THIS FUNCTION IS USED TO GET  SELECTED COURSES OF A PARTICULAR  PACKAGE ID
    $scope.PackageCourseList = function (index) {
        var SlectedCourseListId = "";
        var bool = false;
        var courseType;

        var Cart = localStorage.getItem('CartItems');
        //var Cart = $cookies.get('CartItems');
        var CartItems = [];
        if (Cart == null) {
            CartItems = [];
        }
        else
            CartItems = JSON.parse(Cart);
        if (CartItems.length > 0) {
            for (var i = 0; i < CartItems.length; i++) {
                if (i == index) {
                    if (CartItems[i].CoursesList != null) {
                        for (var x = 0; x < CartItems[i].CoursesList.length; x++) {
                            bool = true;
                            SlectedCourseListId = SlectedCourseListId + CartItems[i].CoursesList[x] + ',';
                        }
                    }
                    var pos = SlectedCourseListId.lastIndexOf(",");
                    SlectedCourseListId = SlectedCourseListId.substr(0, pos) + SlectedCourseListId.substr(pos + 1);
                }
            }
        }
        if (bool == true) {
            var Packages = new $.Courses({ SlectedCourseListId: SlectedCourseListId, AngularHTTP: $http });
            //var Packages = new $.Courses({AngularHTTP: $http });
            Packages.GetSelectedCoursesByPkgIdQuery(function (e) {
                $scope.GetSelectedCoursesByPkgId = e;

            });
        }

    }
    // THIS FUNCTION IS USED TO REDIRECT TO  PACKAGECOURSES MAPPING PAGE OF A PARTICULAR PACKAGE ID
    $scope.UpdatePackage = function (PackageId) {
        $state.go('PackageCourses', { PackageId: PackageId, Action: 'Edit' })

    }
  
    // THIS FUNCTION IS USED TO REMOVE ITEM FROM CARTLIST
    $scope.RemoveItem = function (Index,item) {


        // var deleteItem = $window.confirm('Are you absolutely sure you want to delete item?');

        var confirm = $mdDialog.confirm()
        .title('Are you sure, you want to delete the record?')
        .textContent('Record will be deleted permanently.')
     //   .ariaLabel('TutorialsPoint.com')
        .targetEvent(Index)
        .ok('Yes')
        .cancel('No');
        $mdDialog.show(confirm).then(function () {

            // if (deleteItem) {
            var Cart = localStorage.getItem('CartItems');
            // var Cart = $cookies.get('CartItems');
            var CartItems = [];
            if (Cart == null) {
                CartItems = [];
            }
            else
                CartItems = $.grep(JSON.parse(Cart), function (value, index) {
                    return value.UserID == $scope.LoggedInUser.UserID && value.CourseID != item.CourseID;
                });
            
            localStorage.setItem('CartItems', JSON.stringify(CartItems));
            //   $cookies.put('CartItems', JSON.stringify(CartItems));
            $rootScope.$broadcast('CartDeleted');
            $rootScope.$broadcast('CartUpdated');
            var toast = $mdToast.simple().content('Item deleted from the cart.').action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
            $mdToast.show(toast);
            var Cart = localStorage.getItem('CartItems');
            if (Cart == undefined || Cart == null) {
                $window.location.href = 'dashboard-guest.html#/login';
            }
        });
        //}

    }


    // THIS FUNCTION IS USED TO UPDATE NO OF LICENSE OF AN ITEM
    $scope.UpdateNoOfLicense = function (index, NoOfLicense) {


        if (NoOfLicense == 0 || NoOfLicense == null || NoOfLicense == undefined) {
            $("#NoOfLicense_" + index).focus();
            // CartItems[index].NoOfLicense = 1;
        }
        else {
            var Cart = localStorage.getItem('CartItems');
            // var Cart = $cookies.get('CartItems');
            var CartItems = [];
            if (Cart == null) {
                CartItems = [];
            }
            else
                CartItems = JSON.parse(Cart);
            if (NoOfLicense != 0 && NoOfLicense != null && NoOfLicense != undefined) {
                CartItems[index].NoOfLicense = parseInt(NoOfLicense);
                localStorage.setItem('CartItems', JSON.stringify(CartItems));
                // $cookies.put('CartItems', JSON.stringify(CartItems));
                $rootScope.$broadcast('CartDeleted');
                var toast = $mdToast.simple().content('No Of License updated successfully.').action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
                $mdToast.show(toast);
            }
        }

    }


});


//--------End of Cart controller-----------------------------------//

