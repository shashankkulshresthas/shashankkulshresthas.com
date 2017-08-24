angular.module('Sort').controller('SecurityQuestionController', function ($scope, $rootScope, $http, $state, $location, $cookies, $mdToast, $rootScope, $mdDialog, $interval, AuthService, VerifyAccountModal) {
    $scope.Register = {};
  


    VerifyAccountModal();
    function UpdateBar() {
        $scope.completePer = 40;
        if ($scope.LoggedInUser.PCompletion == 1)
            $scope.completePer = $scope.completePer + 30;

        if ($scope.LoggedInUser.SCompletion == 1)
            $scope.completePer = $scope.completePer + 30;
    }
    UpdateBar();
    var user = new $.User({ UserID: $scope.LoggedInUser.UserID,AngularHTTP: $http });
    user.GetUserDetailByID(function (e) {      
        $scope.Register = e[0];
        $scope.Register.Zip = $scope.Register.ZIP;
      //  if ($scope.Register.DOB) {
            var currDate = new Date();
        // $scope.Register.maxDate = new Date();
            if ($scope.Register.DOB) {
                dob = new Date($scope.Register.DOB);
                $scope.Register.DOB = new Date(dob.getMonth() + '/' + dob.getDate() + '/' + dob.getFullYear());
            }
            $scope.Register.maxDate = new Date(currDate.getFullYear() - 18, currDate.getMonth(), currDate.getDate());
        //}
    
    });
  //  var currDate = new Date();
   // $scope.Register.maxDate = new Date(currDate.getFullYear() - 18, currDate.getMonth(), currDate.getDate());
        $scope.SelectedIndex = 0;
        //alert($state.params.CourseID + $state.params.ModuleId)
        //var Packages = new $.Courses({ CourseID: $state.params.CourseID, ModuleId: $state.params.ModuleId, AngularHTTP: $http });
        var user = new $.User({ AngularHTTP: $http });
        user.GetSecurityQuestions(function (e) {
            $scope.SecurityQuestions = e;
             user = new $.User({ UserID: $scope.LoggedInUser.UserID, AngularHTTP: $http });
            user.GetUserSecurityQuestAnswers(function (e) {
                $scope.UserSecurityQuestAnswers = e;
             
                if (e.length == 0) {
                    $scope.UserSecurityQuestAnswers.push({});

                    $scope.UserSecurityQuestAnswers.push({});

                    $scope.UserSecurityQuestAnswers.push({});

                    $scope.UserSecurityQuestAnswers.push({});

                    $scope.UserSecurityQuestAnswers.push({});
                }
                $scope.FilterSecurityQuestion();
            })
        })

      

        $scope.upChanged = function (scope, index) {
            // check ranges
            setValidity(
                scope.UserSecurityQuestAnswers[index].SecurityQuestionAnswer,
                scope.SecurityForm['SecurityQuesAns_' + index]);
        }

        function setValidity(value, element) {
            var records = $.grep($scope.UserSecurityQuestAnswers, function (val, i) {
                return (val.SecurityQuestionAnswer == value);
            });            
            element.$setValidity("uniqueAns", records.length < 2);
           
        }
       

        $scope.FilterSecurityQuestion= function ()
        {
            $.each($scope.UserSecurityQuestAnswers, function (i, obj) {
                debugger
                var list = $.grep($scope.UserSecurityQuestAnswers, function (e) { return e.SecurityQuestionId != obj.SecurityQuestionId; })
                obj.SelectList = $.grep($scope.SecurityQuestions, function (element) {
                    return $.grep(list, function (e) { return e.SecurityQuestionId == element.SecurityQuestionId; }).length==0
               
                });

            });
        }

        //alert($state.params.CourseID + $state.params.ModuleId)
        //var Packages = new $.Courses({ CourseID: $state.params.CourseID, ModuleId: $state.params.ModuleId, AngularHTTP: $http });
       
        $scope.UpdateUser = function () {
            debugger
            //    var age = calculateAge($scope.Register.DOB);
            $scope.Message = "";
            var objRegister = new Object();
            var Register = new $.User({ UserID: $scope.LoggedInUser.UserID, FirstName: $scope.Register.FirstName, MiddleName: $scope.Register.MiddleName, LastName: $scope.Register.LastName, Address: $scope.Register.Address, City: $scope.Register.City, State: $scope.Register.StateName, ZIP: $scope.Register.Zip, PrimaryPhone: $scope.Register.PrimaryPhone, AlternatePhone: $scope.Register.AlternatePhone, DOB: $scope.Register.DOB.toISOString(), SSN: $scope.Register.SSN, AngularHTTP: $http });
            $scope.UpdatePromise = Register.UserDetailUpdate(function (e) {
                if (e == 1) {
                    var toast = $mdToast.simple().content('Profile updated successfully.').action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
                    $mdToast.show(toast);
                    $scope.LoggedInUser.SCompletion = 1;
                    AuthService.UpdateSession($scope.LoggedInUser);
                    UpdateBar();
                }
                


            })
        }

    $scope.SaveUserSecurityQuestAns = function () {       
        $scope.SelectedIndex = 0;
        var xmlData='<SecurityQuestions>';


        $.each($scope.UserSecurityQuestAnswers, function (i, obj) {
            xmlData = xmlData + '<Question><SecurityQuestionId>' + obj.SecurityQuestionId + '</SecurityQuestionId><SecurityQuestionAnswer>' + obj.SecurityQuestionAnswer + '</SecurityQuestionAnswer></Question>'
        });
        xmlData = xmlData + '</SecurityQuestions>';
         //alert($state.params.CourseID + $state.params.ModuleId)
        //var Packages = new $.Courses({ CourseID: $state.params.CourseID, ModuleId: $state.params.ModuleId, AngularHTTP: $http });
        var user = new $.User({ UserID: parseInt($scope.LoggedInUser.UserID), QuestionIdAns: xmlData, AngularHTTP: $http });
        $scope.SavePromise = user.SaveUserSecurityQuestAns(function (e) {
            var toast = $mdToast.simple().content('Security questions have been updated successfully.').action('OK').highlightAction(false).position('bottom right').hideDelay(300000);
            $mdToast.show(toast);
            $scope.LoggedInUser.PCompletion = 1;
            AuthService.UpdateSession($scope.LoggedInUser);
            UpdateBar();
        })
    }
 
});