/*----------------------------------------------------
Created By  Nitin Agrawal
Date        22nd May 2015
File Name   DataModel.js

----------------------------------------------------*/
(function ($) {
    //--------Start of Contact class
    $.Contact = function (options) {
        var defaults = {
            Name: null,
            Email: null,
            Subject: null,
            Message: null,
            AngularHTTP: null,
            TransFormRequest: null
        };

        var options = $.extend(defaults, options);
        this.Name = options.Name;
        this.Email = options.Email;
        this.Subject = options.Subject;
        this.Message = options.Message;
        this.AngularHTTP = options.AngularHTTP;
        this.TransFormRequest = options.TransFormRequest;
        this.SendQuery = "ContactUs/SaveContactInfo?Name|Email|Subject|Message";
    };



    $.Contact.prototype = {
        //sigin-out function

        SubmitQuery: function (Success, Error) {

            CallData(this, this.SendQuery, Success, { Type: 'POST' });
        }


    };
    //--------End of Contact class





    //--------Start of User class----------------------------------//

    $.User = function (options) {
        var defaults = {
            UserID:null,
            UserTypeID: null,
            FirstName: null,
            MiddleName: null,
            LastName: null,
            Address: null,
            City: null,
            State: null,
            ZIP: null,
            PrimaryPhone: null,
            AlternatePhone: null,
            Email: null,
            DOB: null,
            SSN: null,
            QuestionIdAns:null,
            LoginID: null,
            Password: null,
            AngularHTTP: null,
            TransFormRequest: null,
            filePath: null,
            fileName: null
        };

        var options = $.extend(defaults, options);
        this.UserTypeID = options.UserTypeID;
        this.UserID = options.UserID;
        this.FirstName = options.FirstName;
        this.MiddleName = options.MiddleName;
        this.LastName = options.LastName;
        this.Address = options.Address;
        this.City = options.City;
        this.State = options.State;
        this.ZIP = options.ZIP;
        this.PrimaryPhone = options.PrimaryPhone;
        this.AlternatePhone = options.AlternatePhone;
        this.Email = options.Email;
        this.DOB = options.DOB;
        this.QuestionIdAns = options.QuestionIdAns;
        this.SSN = options.SSN;
        this.LoginID = options.LoginID;
        this.Password = options.Password;
        this.AngularHTTP = options.AngularHTTP;
        this.TransFormRequest = options.TransFormRequest;
        this.filePath = options.filePath;
        this.fileName = options.fileName;
        this.UserRegister = "User/SaveUser?UserTypeID|FirstName|MiddleName|LastName|Address|City|State|ZIP|PrimaryPhone|AlternatePhone|Email|DOB|SSN|LoginID|Password";
        this.UserUpdate = "User/UpdateUser?UserID|FirstName|MiddleName|LastName|Address|City|State|ZIP|PrimaryPhone|AlternatePhone|DOB|SSN";
        this.UserLogin = "User/AuthenticateUser?LoginID|Password";
        this.GetUserSecurityQuestAns = "User/GetUserSecurityQuestAns?UserID";
        this.GetSecurityQuestion = "User/GetSecurityQuestion?";
        this.InsertUserSecurityQuestAns = "User/InsertUserSecurityQuestAns?UserID|QuestionIdAns";
        this.GetUserDetails = "User/GetUserDetails?UserID";
        this.ConvertExcelToDataSet2 = "User/ConvertExcelToDataSet?filePath|fileName";
        this.MakePasswordResetRequest = "Packages/MakePasswordResetRequest?LoginID";
        this.UsersWithNoCourse = "User/UsersWithNoCourse?";
    };

    $.User.prototype = {
        //sigin-out function

        Register: function (Success, Error) {

            CallData(this, this.UserRegister, Success, { Type: 'POST' });
        },

        Login: function (Success, Error) {

            CallData(this, this.UserLogin, Success, { Type: 'POST' });
        },
        GetUserSecurityQuestAnswers: function (Success, Error) {

            CallData(this, this.GetUserSecurityQuestAns, Success, { Type: 'GET' });
        },
        GetSecurityQuestions: function (Success, Error) {

            CallData(this, this.GetSecurityQuestion, Success, { Type: 'GET' });
    },
      SaveUserSecurityQuestAns: function (Success, Error) {

          CallData(this, this.InsertUserSecurityQuestAns, Success, { Type: 'GET' });
      },
      UserDetailUpdate: function (Success, Error) {

          CallData(this, this.UserUpdate, Success, { Type: 'POST' });
      }
        ,
        GetUserDetailByID: function (Success, Error) {

            CallData(this, this.GetUserDetails, Success, { Type: 'GET' });
        } ,
        PasswordResetRequest: function (Success, Error) {

            CallData(this, this.MakePasswordResetRequest, Success, { Type: 'GET' });
        }
        ,
        ConvertExcelToDataSet: function (Success, Error) {

            CallData(this, this.ConvertExcelToDataSet2, Success, { Type: 'GET' });
        },
        UserListWithNoCourse: function (Success, Error) {

            CallData(this, this.UsersWithNoCourse, Success, { Type: 'GET' });
        }
        
        
        
        

    };

    //--------End of User class----------------------------------//

    //--------Start of Packages/Courses-----------------------------------//

    $.Courses = function (options) {
        var defaults = {
            PackageId: null,
            Password:null,
            PageId: null,
            ModuleId: null,
            UserId: null,
            QuizId: null,
            OptionId: null,
            DisplayOrder:null,
            QuestionId: null,
            Percentage:null,
            PackageName: null,
            PackageDescription: null,
            PackagePrice: null,
            Hours: null,
            Index: null,
            isCorrect:false,
            ToTalHours: null,
            MandateHours: null,
            ElectiveHours: null,
            ImageFile: null,
            PackageStatus: null,
            Status: null,
            PackagePriceId: null,
            CourseID: null,
            CourseName: null,
            CourseDescription: null,
            Duration: null,
            DisplaySequence: null,
            CoursePriceId: null,
            CoursePrice: null,
            isActive:false,
            EffectiveFrom: null,
            EffectiveTo: null,
            PageQuizQuestionId:null,
            SlectedCourseListId: null,
            CourseType: null,
            PageQuizQuesOptionId:null,
            OptionText:null,
            PageQuizQuestionId:null,
            Question: null,
            UnlockCode:null,
            UserExamAttemptID:null,
            PageQuizId:null,
            AngularHTTP: null,
            TransFormRequest: null
        };

        var options = $.extend(defaults, options);
        this.PackageId = options.PackageId;
        this.PageId = options.PageId;
        this.ModuleId = options.ModuleId;
        this.UserId = options.UserId;
        this.Password = options.Password;
        this.QuizId = options.QuizId;
        this.OptionId = options.OptionId;
        this.Percentage = options.Percentage;
        this.QuestionId = options.QuestionId;
        this.UnlockCode = options.UnlockCode;
        this.PackageName = options.PackageName;
        this.PackageDescription = options.PackageDescription;
        this.PackagePrice = options.PackagePrice;
        this.Hours = options.Hours;
        this.ToTalHours = options.ToTalHours;
        this.MandateHours = options.MandateHours;
        this.ElectiveHours = options.ElectiveHours;
        this.ImageFile = options.ImageFile;
        this.PackageStatus = options.PackageStatus;
        this.Status = options.Status;
        this.PackagePriceId = options.PackagePriceId;
        this.CourseID = options.CourseID;
        this.CourseName = options.CourseName;
        this.CourseDescription = options.CourseDescription;
        this.Duration = options.Duration;
        this.DisplaySequence = options.DisplaySequence;
        this.CoursePriceId = options.CoursePriceId;
        this.isCorrect = options.isCorrect;
        this.CoursePrice = options.CoursePrice;
        this.EffectiveFrom = options.EffectiveFrom;
        this.EffectiveTo = options.EffectiveTo;
        this.SlectedCourseListId = options.SlectedCourseListId;
        this.CourseType = options.CourseType;
        this.AngularHTTP = options.AngularHTTP;
        this.TransFormRequest = options.TransFormRequest;
        this.PageQuizQuestionId = options.PageQuizQuestionId;
        this.DisplayOrder = options.DisplayOrder;
        this.Index = options.Index;
        this.isActive = options.isActive;
        this.PageQuizId = options.PageQuizId;
        this.Question = options.Question;
        this.UserExamAttemptID = options.UserExamAttemptID;
        this.OptionText = options.OptionText;
        this.PageQuizQuesOptionId = options.PageQuizQuesOptionId;
        this.PageQuizQuestionId = options.PageQuizQuestionId;
        this.UserPackages = "Packages/GetPackages?";
        this.AllCourses = "Packages/GetAllCourses?";
        this.UserMandatoryCourses = "Packages/GetMandatoryCourses?";
        this.UserElectiveCourses = "Packages/GetElectiveCourses?";
        this.GetPackageById = "Packages/GetPackageById?PackageId";
        this.GetMandateCoursesByPkgId = "Packages/GetMandateCoursesByPkgId?PackageId";
        this.GetElectiveCoursesByPkgId = "Packages/GetElectiveCoursesByPkgId?PackageId";
        this.GetSelectedCoursesByPkgId = "Packages/GetSelectedCoursesByPkgId?SlectedCourseListId";
        this.GetUserCourses = "Packages/GetUserCourses?UserId";
        this.GetUserModules = "Packages/GetUserModules?CourseID|UserId";
        this.GetSelectedPagesByModuleId = "Packages/GetSelectedPagesByModuleId?ModuleId|UserId";
        this.GetSelectedCourseModuleNameById = "Packages/GetSelectedCourseModuleNameById?CourseID|ModuleId|UserId";
        this.GetSelectedQuestionByQuizId = "Packages/GetQuestionsByQuizId?QuizId|UserId";
        this.SaveUserTrainingSessionbyUserId = "Packages/SaveUserTrainingSessionbyUserId?PageId|UserId|ModuleId";
        this.UpdateCurrentPage = "Packages/UpdateCurrentPage?PageId|UserId|ModuleId";        
        this.GetOptionsByQuestionId = "Packages/GetOptionsByQuestionId?QuestionId";
        this.GetResultByQuizId = "Packages/GetResultByQuizId?UserId|QuizId";
        this.InsertUserAnswerHistory = "Packages/InsertUserAnswerHistory?UserId|OptionId|UserExamAttemptID";
        this.SaveResult = "Packages/InsertResult?UserId|QuizId|Percentage";
        this.GetPageQuestion = "Packages/GetPageQuestion?PageId";
        this.GetPageQuesOptions = "Packages/GetPageQuesOptions?PageQuizQuestionId";
        this.RearrangePage = "Packages/RearrangePage?PageId|DisplayOrder|ModuleId|Index";
        this.ActivateDeActivatePage = "Packages/ActivateDeActivatePage?PageId|ModuleId|isActive";
        this.AddPageQuizAddQuestion = "Packages/AddPageQuizAddQuestion?PageQuizId|Question";
        this.DeletePageQuizAddQuestion = "Packages/DeletePageQuizAddQuestion?PageQuizQuestionId";
        this.AddPageQuizQuesOption = "Packages/AddPageQuizQuesOption?PageQuizQuestionId|OptionText";
        this.DeletePageQuizQuestionOption = "Packages/DeletePageQuizQuestionOption?PageQuizQuesOptionId";
        this.UpdatePageQuizQuestionOption = "Packages/UpdatePageQuizQuestionOption?PageQuizQuesOptionId|isCorrect";
        this.GetQuestionReview = "Packages/GetQuestionReview?UserId|QuizId";
        this.GetPurchasedPackages = "Packages/GetPurchasedPackages?UserId";
        this.GetPageByID = "Packages/GetPageByID?PageId|UserId";
        this.isCoursePurchased = "User/isCoursePurchased?UserId|CourseID";
        this.LockAccout = "Packages/LockAccout?CourseID|UserId";
        this.UnlockCourse = "Packages/UnlockCourse?UnlockCode";
        this.GetResetData = "Packages/GetResetData?UnlockCode";
        this.ResetPassword = "Packages/ResetPassword?UserId|UnlockCode|Password"
    };

    $.Courses.prototype = {

        PackagesQuery: function (Success, Error) {

            CallData(this, this.UserPackages, Success);
        },

        MandatoryCoursesQuery: function (Success, Error) {

            CallData(this, this.UserMandatoryCourses, Success, { Type: 'GET' });
        },

        UserCoursesQuery: function (Success, Error) {

            CallData(this, this.GetUserCourses, Success, { Type: 'GET' });
        },
        GeModulesByCourseIdQuery: function (Success, Error) {

            CallData(this, this.GetUserModules, Success, { Type: 'GET' });
        },


        ElectiveCoursesQuery: function (Success, Error) {

            CallData(this, this.UserElectiveCourses, Success, { Type: 'GET' });

        },
        PackageByIdQuery: function (Success, Error) {

            CallData(this, this.GetPackageById, Success, { Type: 'GET' });
        },
        GetMandateCoursesByPkgIdQuery: function (Success, Error) {

            CallData(this, this.GetMandateCoursesByPkgId, Success, { Type: 'GET' });
        },
        GetElectiveCoursesByPkgIdQuery: function (Success, Error) {

            CallData(this, this.GetElectiveCoursesByPkgId, Success, { Type: 'GET' });
        },
        GetSelectedCoursesByPkgIdQuery: function (Success, Error) {
            CallData(this, this.GetSelectedCoursesByPkgId, Success, { Type: 'GET' });
        },		
        GetSelectedPagesByModuleIdQuery: function (Success, Error) {
            CallData(this, this.GetSelectedPagesByModuleId, Success, { Type: 'GET' });
        },		
        GetSelectedCourseModuleNameByIdQuery: function (Success, Error) {
            CallData(this, this.GetSelectedCourseModuleNameById, Success, { Type: 'GET' });
        },

        GetSelectedQuestionsByQuizIdQuery: function (Success, Error) {
            CallData(this, this.GetSelectedQuestionByQuizId, Success, { Type: 'GET' });
        },

        SaveUserTrainingSessionQuery: function (Success, Error) {
            CallData(this, this.SaveUserTrainingSessionbyUserId, Success, { Type: 'GET' });
        },
        
        UpdateCurrentPageNo: function (Success, Error) {
            CallData(this, this.UpdateCurrentPage, Success, { Type: 'GET' });
        },
        
        SaveResultQuery: function (Success, Error) {
            CallData(this, this.SaveResult, Success, { Type: 'GET' });
        },

        GetSelectedResultByQuizIdQuery: function (Success, Error) {
            CallData(this, this.GetResultByQuizId, Success, { Type: 'GET' });
        },

        InsertUserAnswerHistoryQuery: function (Success, Error) {
            CallData(this, this.InsertUserAnswerHistory, Success, { Type: 'GET' });
        },



        GetOptions: function (Success, Error) {
            CallData(this, this.GetOptionsByQuestionId, Success, { Type: 'GET' });
        }
        ,
        GetPageQuestions: function (Success, Error) {
            CallData(this, this.GetPageQuestion, Success, { Type: 'GET' });
        },
        GetPageQuesOption: function (Success, Error) {
            CallData(this, this.GetPageQuesOptions, Success, { Type: 'GET' });
        },
        GetAllCourses: function (Success, Error) {
            CallData(this, this.AllCourses, Success, { Type: 'GET' });
        }, GetRearrangePage: function (Success, Error) {
            CallData(this, this.RearrangePage, Success, { Type: 'GET' });
        },
        SetActivateDeActivatePage: function (Success, Error) {
            CallData(this, this.ActivateDeActivatePage, Success, { Type: 'GET' });
        },
        SavePageQuizAddQuestion: function (Success, Error) {
            CallData(this, this.AddPageQuizAddQuestion, Success, { Type: 'GET' });
        },
        RemovePageQuizAddQuestion: function (Success, Error) {
            CallData(this, this.DeletePageQuizAddQuestion, Success, { Type: 'GET' });
        },
        SavePageQuizQuesOption: function (Success, Error) {
            CallData(this, this.AddPageQuizQuesOption, Success, { Type: 'GET' });
        }, RemovePageQuizQuestionOption: function (Success, Error) {
            CallData(this, this.DeletePageQuizQuestionOption, Success, { Type: 'GET' });
        },
        UpdatePageQuestionOption: function (Success, Error) {
            CallData(this, this.UpdatePageQuizQuestionOption, Success, { Type: 'GET' });
        },
        GetQuestionReviews: function (Success, Error) {
            CallData(this, this.GetQuestionReview, Success, { Type: 'GET' });
        },
        GetPurPackages: function (Success, Error) {
            CallData(this, this.GetPurchasedPackages, Success, { Type: 'GET' });
        },
        GetPageDetail: function (Success, Error) {
            CallData(this, this.GetPageByID, Success, { Type: 'GET' });
        }
        ,IsCoursePurchased: function (Success, Error) {
            CallData(this, this.isCoursePurchased, Success, { Type: 'GET' });
        },MarkLockAccout: function (Success, Error) {
            CallData(this, this.LockAccout, Success, { Type: 'GET' });
        }
        , MarkUnlockCourse: function (Success, Error) {
            CallData(this, this.UnlockCourse, Success, { Type: 'GET' });
        },
        GetPwdResetData: function (Success, Error) {
            CallData(this, this.GetResetData, Success, { Type: 'GET' });
        },
        SaveResetPassword: function (Success, Error) {
            CallData(this, this.ResetPassword, Success, { Type: 'GET' });
        }
        
        
    }
    //-------------------------End of Packages/Courses-----------------------------------// 

    //--------Start of Cart-----------------------------------//

    $.Cart = function (options) {
        var defaults = {
            UserID:null,
            PackageId: null,
            CourseID:null,
            Type: null,
            CartId:null,
            Description: null,
            Hours: null,
            Price: null,
            NoOfLicense: null,
            Name: null,
            CoursesList: null,
            MandateHours: null,
            ElectiveHours: null,
            NoOfLicense: null,
            CoursesList:null,
            UserCartItems: null,
            PackageCoursesID: null,
            CardDetailId:null,
            AngularHTTP: null,
            TransFormRequest: null,

            PurchaseType:null
        };

        var options = $.extend(defaults, options);
        this.UserID = options.UserID;
        this.PackageId = options.PackageId;
        this.CourseID = options.CourseID;
        this.Type = options.Type;
        this.CartId = options.CartId;
        this.Description = options.Description;
        this.Hours = options.Hours;
        this.Price = options.Price;
        this.NoOfLicense = options.NoOfLicense;
        this.Name = options.Name;
        this.MandateHours = options.MandateHours;
        this.ElectiveHours = options.ElectiveHours;
        this.NoOfLicense = options.NoOfLicense;
        this.CoursesList = options.CoursesList;
        this.UserCartItems = options.UserCartItems;
        this.PackageCoursesID = options.PackageCoursesID;
        this.AngularHTTP = options.AngularHTTP;
        this.TransFormRequest = options.TransFormRequest;
        this.CardDetailId = options.CardDetailId;
        this.PurchaseType = options.PurchaseType;

        this.UserPurchaseOrder = "Packages/SaveUserOrder?PackageId|NoOfLicense|Type|Price|UserID|PackageCoursesID|CartId";
    };



    $.Cart.prototype = {

        SaveOrderList: function (Success, Error, $scope) {
         
            CallData(this, this.UserPurchaseOrder, Success, { Type: 'POST' });
        }


    };

    //-------------------------End of Cart-----------------------------------//
    ////--------Start of Cart-----------------------------------//

    //$.Cart = function (options) {
    //    var defaults = {
    //        UserID: null,
    //        PackageId: null,
    //        CourseID: null,
    //        Type: null,
    //        CartId: null,
    //        Description: null,
    //        Hours: null,
    //        Price: null,
    //        NoOfLicense: null,
    //        Name: null,
    //        CoursesList: null,
    //        MandateHours: null,
    //        ElectiveHours: null,
    //        NoOfLicense: null,
    //        CoursesList: null,
    //        UserCartItems: null,
    //        PackageCoursesID: null,
    //        PurchaseType:null,
    //        AngularHTTP: null,
    //        TransFormRequest: null
    //    };

    //    var options = $.extend(defaults, options);
    //    this.UserID = options.UserID;
    //    this.PackageId = options.PackageId;
    //    this.CourseID = options.CourseID;
    //    this.Type = options.Type;
    //    this.CartId = options.CartId;
    //    this.Description = options.Description;
    //    this.Hours = options.Hours;
    //    this.Price = options.Price;
    //    this.NoOfLicense = options.NoOfLicense;
    //    this.Name = options.Name;
    //    this.MandateHours = options.MandateHours;
    //    this.ElectiveHours = options.ElectiveHours;
    //    this.NoOfLicense = options.NoOfLicense;
    //    this.CoursesList = options.CoursesList;
    //    this.UserCartItems = options.UserCartItems;
    //    this.PackageCoursesID = options.PackageCoursesID;
    //    this.AngularHTTP = options.AngularHTTP;
    //    this.TransFormRequest = options.TransFormRequest;
    //    this.PurchaseType = options.PurchaseType;
    //    this.UserPurchaseOrder = "Packages/SaveUserOrder?PackageId|NoOfLicense|Type|Price|UserID|PackageCoursesID|CartId";
    //};



    $.Cart.prototype = {

        SaveOrderList: function (Success, Error, $scope) {

            CallData(this, this.UserPurchaseOrder, Success, { Type: 'POST' });
        }


    };

    //-------------------------End of Cart-----------------------------------//
    //--------Start of Page-----------------------------------//

    $.Page = function (options) {
        var defaults = {
            PageId: null,
            ModuleId: null,
            FilePath: null,
            TimeToSpendOnPage: null,
            PageName: null,
            AudioPath: null,
            hasQuiz: null,           
            AngularHTTP: null,
            TransFormRequest: null
        };

        var options = $.extend(defaults, options);
        this.PageId = options.PageId;
        this.ModuleId = options.ModuleId;
        this.FilePath = options.FilePath;
        this.TimeToSpendOnPage = options.TimeToSpendOnPage;
        this.AudioPath = options.AudioPath;
        this.PageName = options.PageName;
        this.hasQuiz = options.hasQuiz;     
        this.AngularHTTP = options.AngularHTTP;
        this.TransFormRequest = options.TransFormRequest;
        this.InsertPage = "Page/InsertPage?PageId|ModuleId|FilePath|TimeToSpendOnPage|PageName|AudioPath|hasQuiz";
        this.DeletePage = "Page/DeletePage?PageId|ModuleId";
    };



    $.Page.prototype = {

        SavePage: function (Success, Error, $scope) {

            CallData(this, this.InsertPage, Success, { Type: 'POST' });
        },
        RemovePage: function (Success, Error, $scope) {

            CallData(this, this.DeletePage, Success, { Type: 'POST' });
        }


    };

    //-------------------------End of Page-----------------------------------//


}(jQuery));
