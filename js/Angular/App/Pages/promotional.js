
angular.module('Sort').controller('Promotionsctrl', function ($scope, $rootScope, $http, $state, $location, $cookies, $mdToast, $rootScope, $mdDialog, $interval, AuthService, APICallService) {

    $scope.Promotion = {};
    $scope.Promotion.ValidFromMin = new Date()
    //$scope.myDate = new Date();

    //$scope.minDate = new Date($scope.myDate);

    $scope.$watch('Promotion.ValidFrom', function () {
        $scope.Promotion.ValidUpto = $scope.Promotion.ValidFrom;
    });
    $scope.$watch('Promotion.ValidUpto', function () {
        $scope.Promotion.ValidFromMax = $scope.Promotion.ValidUpto;
    });

    //$scope.LoggedInUser.UserID
    $scope.CompanyId = "";


    function GetCompanyId(UserID) {
        APICallService.Get('User', 'GetCompanyId', { UserId: UserID }).then(function (e) {
            $scope.CompanyId = e.data[0].CompanyId;
        });

        return $scope.CompanyId;
    }


    $scope.InsertPromotions = function () {

        $scope.Message = "";
        if ($scope.PromotionForm.$valid) {
            var objPromotion = {};
            var objPromo = {};

            $scope.SavePromotionPromise = APICallService.Get('User', 'GetCompanyId', { UserId: $scope.LoggedInUser.UserID }).then(function (e) {

                objPromotion["PromoId"] = 0;
                objPromotion["CompanyId"] = e.data[0].CompanyId;
                objPromotion["PromoTypeId"] = parseInt($scope.Promotion.PromoTypeId);

                objPromotion["PromoName"] = $scope.Promotion.PromoName;
                objPromotion["PromoCode"] = $scope.Promotion.PromoCode;
                objPromotion["PromoValue"] = $scope.Promotion.PromoValue;
                objPromotion["PromoValidFrom"] = $scope.Promotion.ValidFrom;
                objPromotion["PromoValidUpTo"] = $scope.Promotion.ValidUpto;
                objPromotion["PromoStatus"] = 1;

                APICallService.Post('User', 'InsertPromotion', objPromotion).then(function (e) {

                    if (JSON.stringify(e.data) == 1) {

                        var toast = $mdToast.simple().content("Promotional code generated successfully.").position('right bottom').action('OK').highlightAction(false).hideDelay(0);
                        $mdToast.show(toast);

                        $scope.getallPromotions();

                        ClearAll();
                    }
                    else {
                        var toast = $mdToast.simple().content("Oops !!! error occured during code generating").position('right bottom').action('OK').highlightAction(false).hideDelay(0);
                        $mdToast.show(toast);
                    }
                });

            });
        }
    }

    function ClearAll() {
        $scope.Promotion = "";                  //clear control
        $scope.PromotionForm.$setPristine();  //reset 
        $scope.PromotionForm.$setUntouched(); //reset 
      //  $('input[type="text"]').val('');
    }



    $scope.getallPromotions = function () {


        APICallService.Get('User', 'GetCompanyId', { UserId: $scope.LoggedInUser.UserID }).then(function (e) {

            APICallService.Get('User', 'DisplayPromotions', { CompanyId: e.data[0].CompanyId }).then(function (e) {

                $scope.Promotions = e.data;

            });

        });
    };

    //$(document).ready(function () {
    //    $('#tblData').DataTable();
    //});

    $scope.itmQuestion_SORTTEXAS_M02_074 = {};
    $scope.SelectedQuizIndex = 0;

    $scope.index = 0;



    $scope.matter = "";

    $scope.CorrectAnswer = 0;
    $scope.IncorrectAnswer = 0;



    $scope.Activity_SORTTEXAS_M02_074_Questions = function (answer) {



        if ($scope.SelectedQuizIndex == undefined) {
            $scope.SelectedQuizIndex = 0;

        }


        $scope.itmQuestion_SORTTEXAS_M02_074 = [
             {
                 "QuestionId": "0",
                 "Question": "Would you want these Security Officers representing your company?",
                 "Answer": "No"
             },
             {
                 "QuestionId": "1",
                 "Question": "Do these Security Officers appear to being doing their job well?",
                 "Answer": "No"
             },
             {
                 "QuestionId": "2",
                 "Question": "Do these Security Officers look professional in their appearance?",
                 "Answer": "No"
             },
             {
                 "QuestionId": "3",
                 "Question": "Do these Security Officers appear to be approachable?",
                 "Answer": "No"
             },
             {
                 "QuestionId": "4",
                 "Question": "Would you think these Security Officers were prepared to respond to an emergency?",
                 "Answer": "No"
             }

        ];


        if ($scope.itmQuestion_SORTTEXAS_M02_074.length != $scope.SelectedQuizIndex) {


            $scope.Activity_SORTTEXAS_M02_074_QuestionsAnswer = $scope.itmQuestion_SORTTEXAS_M02_074;
            $scope.SelectedActivity_SORTTEXAS_M02_074 = $scope.itmQuestion_SORTTEXAS_M02_074[$scope.SelectedQuizIndex];



            $scope.SelectedAnswer = $scope.SelectedActivity_SORTTEXAS_M02_074.Answer;
            if ($scope.SelectedQuizIndex == 0) {
                $scope.matter = "";
                $scope.matter = '<p><b>' + $scope.SelectedActivity_SORTTEXAS_M02_074.Question + '</b></p> <p class="options" id="rbYes' + $scope.index + '" ng-click="Activity_SORTTEXAS_M02_074_Questions(\'Yes\')"><span class="fa fa-circle-o"> <span id="spnYes' + $scope.index + '">Yes</span></p> <p class="options" id="rbNo' + $scope.index + '" ng-click="Activity_SORTTEXAS_M02_074_Questions(\'No\')"><span class="fa fa-circle-o"><span id="spnNo' + $scope.index + '"> No</span></p></p>';

                $(".yes-no").append($scope.matter);
                $scope.SelectedQuizIndex = $scope.SelectedQuizIndex + 1;

            }


            $scope.Ans = $scope.itmQuestion_SORTTEXAS_M02_074[$scope.SelectedQuizIndex - 1].Answer;


            if ($scope.answer != '') {

                if ($scope.Ans == $scope.answer) {

                    $scope.selI = $scope.index - 1;

                    $scope.CorrectAnswer = $scope.CorrectAnswer + 1;




                    $("#rbYes" + $scope.selI + "").attr("disabled", true);
                    $("#rbNo" + $scope.selI + "").attr("disabled", true);

                    $("#rbYes" + $scope.selI + "").removeAttr("onclick");
                    $("#rbNo" + $scope.selI + "").removeAttr("onclick");


                    if ($scope.Ans == "Yes") {

                        $("#spnYes" + $scope.selI + "").attr("style", "font-weight:bold");
                    }
                    else if ($scope.Ans == "No") {
                        $("#spnNo" + $scope.selI + "").attr("style", "font-weight:bold");
                    }





                    $scope.matter = "";
                    $scope.matter = '<p><b>' + $scope.SelectedActivity_SORTTEXAS_M02_074.Question + '</b></p> <p class="options" id="rbYes' + $scope.index + '" ng-click="Activity_SORTTEXAS_M02_074_Questions(\'Yes\')"><span class="fa fa-circle-o"> <span id="spnYes' + $scope.index + '">Yes</span></p> <p class="options" id="rbNo' + $scope.index + '" ng-click="Activity_SORTTEXAS_M02_074_Questions(\'No\')"><span class="fa fa-circle-o"><span id="spnNo' + $scope.index + '"> No</span></p></p>';

                    $(".yes-no").append($scope.matter);
                    $scope.SelectedQuizIndex = $scope.SelectedQuizIndex + 1;


                }
                else {

                    $scope.selI = $scope.index - 1;



                    $("#rbYes" + $scope.selI + "").attr("disabled", true);
                    $("#rbNo" + $scope.selI + "").attr("disabled", true);

                    $("#rbYes" + $scope.selI + "").removeAttr("onclick");
                    $("#rbNo" + $scope.selI + "").removeAttr("onclick");

                    if ($scope.Ans == "Yes") {

                        $("#spnYes" + $scope.selI + "").attr("style", "font-weight:bold");
                    }
                    else if ($scope.Ans == "No") {
                        $("#spnNo" + $scope.selI + "").attr("style", "font-weight:bold");
                    }

                    $scope.IncorrectAnswer = $scope.IncorrectAnswer + 1;

                    $scope.matter = '<p><b>' + $scope.SelectedActivity_SORTTEXAS_M02_074.Question + '</b></p> <p class="options" id="rbYes' + $scope.index + '" ng-click="Activity_SORTTEXAS_M02_074_Questions(\'Yes\')"><span class="fa fa-circle-o"> <span id="spnYes' + $scope.index + '">Yes</span></p> <p class="options" id="rbNo' + $scope.index + '" ng-click="Activity_SORTTEXAS_M02_074_Questions(\'No\')"><span class="fa fa-circle-o"><span id="spnNo' + $scope.index + '"> No</span></p></p>';


                    $(".yes-no").append($scope.matter);
                    $scope.SelectedQuizIndex = $scope.SelectedQuizIndex + 1;



                }
            }

        }
        else {

            $scope.Ans = $scope.itmQuestion_SORTTEXAS_M02_074[$scope.SelectedQuizIndex - 1].Answer;

            if ($scope.Ans == $scope.answer) {

                $scope.selI = $scope.index - 1;

                $scope.CorrectAnswer = $scope.CorrectAnswer + 1;


                $("#rbYes" + $scope.selI + "").attr("disabled", true);
                $("#rbNo" + $scope.selI + "").attr("disabled", true);

                $("#rbYes" + $scope.selI + "").removeAttr("onclick");
                $("#rbNo" + $scope.selI + "").removeAttr("onclick");


                if ($scope.Ans == "Yes") {

                    $("#spnYes" + $scope.selI + "").attr("style", "font-weight:bold");
                }
                else if ($scope.Ans == "No") {
                    $("#spnNo" + $scope.selI + "").attr("style", "font-weight:bold");
                }


            }
            else {

                $scope.selI = $scope.index - 1;



                $("#rbYes" + $scope.selI + "").attr("disabled", true);
                $("#rbNo" + $scope.selI + "").attr("disabled", true);

                $("#rbYes" + $scope.selI + "").removeAttr("onclick");
                $("#rbNo" + $scope.selI + "").removeAttr("onclick");

                if ($scope.Ans == "Yes") {

                    $("#spnYes" + $scope.selI + "").attr("style", "font-weight:bold");
                }
                else if ($scope.Ans == "No") {
                    $("#spnNo" + $scope.selI + "").attr("style", "font-weight:bold");
                }

                $scope.IncorrectAnswer = $scope.IncorrectAnswer + 1;



            }

            $("#nextslide").attr("style", "display:inline-block");
            $("#next").attr("style", "display:inline-block");

        }

        $scope.index = $scope.index + 1;


    }




    //delete promotional
    
    $scope.DeletePromo = function (promoid, companyid, id) {
        var objPromotion = {};
        objPromotion["PromoId"] = promoid;
        objPromotion["CompanyId"] = companyid
     
        APICallService.Post('User', 'DeletePromotion', JSON.stringify(objPromotion)).then(function (e) {

            var result = e.data;
            if (result == 1) {
                $scope.getallPromotions();
                var toast = $mdToast.simple().content("Promotion Deleted Successfully.").position('right bottom ').action('OK').highlightAction(false).hideDelay(300000);
                $mdToast.show(toast);
            }
            else {
                var toast = $mdToast.simple().content("Oops !!!! error is occured ").position('right bottom').theme('error-toast').action('OK').highlightAction(false).hideDelay(300000);
                $mdToast.show(toast);

            }
            console.log(e);
        });
    }


});
