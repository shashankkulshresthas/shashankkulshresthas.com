/*********************************************************************************************************************************
 * Copyright (c) 2016 ProtaTECHIndia
 * ---------------------------------
 * File Name                            : PackagesController.cs
 * Description                          : This file is used to Show Packages/Courses..
 * Namespace                            : 
 * Dependency                           : 
 * ----------------------------------
 * Development History
 * --------------------------------------------------------------------------------------------------------------------------------
 * Developer                    |   Action          |      Date         |   Description
 * --------------------------------------------------------------------------------------------------------------------------------
 * 1. Hari Ram Seth             |   Creation          |   23-Nov.-2016   |  This file is used to Show Packages/Courses..
 * 
   
 **********************************************************************************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;
using System.Web.SessionState;
using BAL;
using System.IO;
using System.Net.Http.Headers;
using System.Web;
using Spire.Doc;
using Spire.Doc.Documents;
using Novacode;
using BOL;
using System.Security.Claims;
namespace WEBAPI.Controllers
{
    public class PackagesController : ApiController
    {
        public int GetCurrentUserID()
        {
            var identity = User.Identity as ClaimsIdentity;
            Claim identityClaim = identity.Claims.FirstOrDefault(c => c.Type == "ID");
            return Convert.ToInt32(identityClaim.Value);
        }
        /// <summary>
        /// THIS METHOD IS USED TO GET ALL PACKAGES FROM DATABASE
        /// </summary>
        /// <returns>Output as a Table</returns>
        
        [HttpGet]
        public DataTable GetPackages()
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetPackages();
        }


        /// <summary>
        /// THIS METHOD IS USED TO GET ALL MANDATORY COURSES FROM DATABASE
        /// </summary>
        /// <returns>Output as a Table</returns>
        /// 
     
        [HttpGet]
        public DataTable GetMandatoryCourses(int UserID)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetMandatoryCourses(UserID);
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public DataTable GetUserCourses()
        {
            int UserId = GetCurrentUserID();
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetUserCourses(UserId);
        }

        [Authorize(Roles = "User,Admin")]
        [HttpGet]
        public DataTable GetUserModules(int CourseID, int UserId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetUserModules(CourseID, UserId);

        }
        /// <summary>
        /// THIS METHOD IS USED TO GET ALL ELECTIVE COURSES FROM DATABASE
        /// </summary>
        /// <returns>Output as a Table</returns>
        /// 
        [HttpGet]
        public DataTable GetElectiveCourses()
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetElectiveCourses();
        }
        /// <summary>
        /// THIS METHOD IS USED TO GET PACKAGE DETAIL BY PACKAGEID FROM DATABASE
        /// </summary>
        /// <param name=PackageId></param>
        /// <returns>Output as a Table</returns>
        /// 

        [HttpGet]
        public DataTable GetPackageById(int PackageId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetPackageById(PackageId);
        }

        /// <summary>
        /// THIS METHOD IS USED TO GET MANDATE COURSES BY PACKAGEID FROM DATABASE
        /// </summary>
        /// <param name=PackageId></param>
        /// <returns>Output as a Table</returns>
        /// 
        [HttpGet]
        public DataTable GetMandateCoursesByPkgId(int PackageId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetMandateCoursesByPkgId(PackageId);
        }

        /// <summary>
        /// THIS METHOD IS USED TO GET ELECTIVE COURSES  BY PACKAGEID FROM DATABASE
        /// </summary>
        /// <param name=PackageId></param>
        /// <returns>Output as a Table</returns>
        /// 
        [HttpGet]
        public DataTable GetElectiveCoursesByPkgId(int PackageId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetElectiveCoursesByPkgId(PackageId);
        }

        /// <summary>
        /// THIS METHOD IS USED TO GET ALL SELECTED COURSES DETAILS BY COURSESID FROM DATABASE
        /// </summary>
        /// <param name=PackageId></param>
        /// <returns>Output as a Table</returns>
        /// 
        [HttpGet]
        public DataTable GetSelectedCoursesByPkgId(string SlectedCourseListId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();

            return objPackagesBAL.GetSelectedCoursesByPkgId(SlectedCourseListId);
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public DataTable VerifyCouponCode(string CouponCode)
        {
            CoupansBAL objCoupansBAL = new CoupansBAL();
            return objCoupansBAL.VerifyCoupon(CouponCode);
        }


        /// <summary>
        /// THIS METHOD IS USED TO SAVE USER ORDER DETAILS IN  DATABASE
        /// </summary>
        /// <param name=></param>
        /// <returns>Output as a int</returns>
        /// 

      [Authorize(Roles = "User,Company,Admin")]
        [HttpPost]
        public object SaveUserOrder(List<OrderListBAL> CartList)
        {
            string ListOfCourse = "";
            string ListOfCourse1 = "";
            string ListOfCourse2 = "";
            string ListOfCourse3 = "";
            string ListOfCourse4 = "";

            UserCartInfo objUserCartInfo = new UserCartInfo();

            var objReturn = new object();
            PackagesBAL obj = new PackagesBAL();
            OrderListBAL objOrder = new OrderListBAL();
            int id = obj.SaveCard(CartList[0].UserCardDetail);
            decimal TotalAmount = CartList.Sum(u => u.Price);
            objUserCartInfo.Subtotal = TotalAmount.ToString();
            objUserCartInfo.OrderTotal = TotalAmount.ToString();
            objUserCartInfo.Quantity = "1";
            objUserCartInfo.Term = "12";

            objUserCartInfo.Coptr = "";

            if (CartList[0].CouponCode != "" && !string.IsNullOrEmpty(CartList[0].CouponCode))
            {

                
                CoupansBAL objCB = new CoupansBAL();
                DataTable dt = objCB.VerifyCoupon(CartList[0].CouponCode);
                if (dt.Rows.Count > 0)
                {
                    objUserCartInfo.CouponCode = CartList[0].CouponCode;
                    if (Convert.ToInt32(dt.Rows[0]["CoupanTypeId"].ToString()) == 1)
                    {
                        objUserCartInfo.CupCodeAmount = ((TotalAmount * Convert.ToDecimal(dt.Rows[0]["CoupanValue"]) / 100)).ToString();
                        TotalAmount = TotalAmount - (TotalAmount * Convert.ToDecimal(dt.Rows[0]["CoupanValue"]) / 100);
                        objUserCartInfo.OrderTotal = TotalAmount.ToString();
                    }
                    if (Convert.ToInt32(dt.Rows[0]["CoupanTypeId"].ToString()) == 2)
                    {
                        objUserCartInfo.CupCodeAmount = (Convert.ToDecimal(dt.Rows[0]["CoupanValue"])).ToString();
                        TotalAmount = TotalAmount - (Convert.ToDecimal(dt.Rows[0]["CoupanValue"]));
                        objUserCartInfo.OrderTotal = TotalAmount.ToString();
                    }
                    //objUserCartInfo.CupCodeAmount = ((TotalAmount * Convert.ToInt32(dt.Rows[0]["CoupanValue"]) / 100)).ToString();
                    //TotalAmount = TotalAmount - (TotalAmount * Convert.ToInt32(dt.Rows[0]["CoupanValue"]) / 100);
                    //objUserCartInfo.OrderTotal = TotalAmount.ToString();
                }


                //objUserCartInfo.Coptr = "<tr class='gmail_msg'><td style='padding-left:10px;padding-right:10px;padding-top:2px;padding-bottom:2px;text-align:left;vertical-align:top;width:48%' class='gmail_msg' bgcolor=''><font style='font-family:arial,sans serif;font-size:11' class='gmail_msg'>Coupon Code: &nbsp; (" + objUserCartInfo.CouponCode + ") </font></td><td style='padding-left:10px;padding-right:10px;padding-top:2px;padding-bottom:2px;text-align:left;vertical-align:top;width:18%' class='gmail_msg' bgcolor=''><font style='font-family:arial,sans serif;font-size:11' class='gmail_msg'>&nbsp;</font></td><td style='padding-left:10px;padding-right:10px;padding-top:2px;padding-bottom:2px;text-align:left;vertical-align:top;width:20%' class='gmail_msg' bgcolor=''><font style='font-family:arial,sans serif;font-size:11' class='gmail_msg'>&nbsp;</font></td><td style='padding-left:10px;padding-right:10px;padding-top:2px;padding-bottom:2px;text-align:right;vertical-align:top;width:14%' class='gmail_msg' bgcolor=''><font style='font-family:arial,sans serif;font-size:11;font-weight:bold' class='gmail_msg'>" + objUserCartInfo.CupCodeAmount + "</font></td></tr>";

                /* Code updated 21-06-2017 */
                objUserCartInfo.Coptr = "<tr style='mso-yfti-irow: 4'><td width=298 colspan=2 valign=top style='width: 223.85pt; border: none; border-left: solid #CCCCCC 1.0pt; mso-border-left-alt: solid #CCCCCC .75pt; background: whitesmoke; padding: 4.5pt 0in 4.5pt 0in'><p class='MsoNormal' align='right' style='margin-bottom: 0in; margin-bottom: .0001pt; text-align: right; line-height: normal'><span style='font-size: 10.5pt; font-family: 'Arial','sans-serif'; mso-fareast-font-family: 'Times New Roman'; color: #666666'>Coupon Code: &nbsp; (" + objUserCartInfo.CouponCode + ")<o:p></o:p></span></p></td><td width='282' colspan='2' valign='top' style='width: 211.15pt; border: none; border-right: solid #CCCCCC 1.0pt; mso-border-right-alt: solid #CCCCCC .75pt; background: whitesmoke; padding: 4.5pt 7.5pt 4.5pt 0in'><p class='MsoNormal' align='right' style='margin-bottom: 0in; margin-bottom: .0001pt; text-align: right; line-height: normal'><span style='font-family: 'Arial','sans-serif'; mso-fareast-font-family: 'Times New Roman'; color: #666666'>- $" + objUserCartInfo.CupCodeAmount + "<o:p></o:p></span></p></td></tr>";
            }


            DataTable dtTestMode = obj.GetConfiguration("PaymentGateway", "MerchantInfo", "ssl_test_mode");
            bool processed = true;
            CCProcess objProcess = new CCProcess();
            if (dtTestMode.Rows[0]["Value"].ToString() == "true")
            {
                processed = objProcess.ProcessPayment(string.Concat(CartList[0].UserCardDetail._CardNumber), string.Concat(CartList[0].UserCardDetail._Expiry.Split('/')), TotalAmount.ToString("N2"), CartList[0].UserCardDetail.CV, CartList[0].UserCardDetail.CardName, "110074", CartList[0].UserCardDetail.CardName, "Sort Louisiana Course Purchase", "Hrs", "1");

            }

            int i = 0;

            if (processed)
            {
                foreach (OrderListBAL objC in CartList)
                {


                    
                    objC.UserID = CartList[0].UserCardDetail.UserId;
                    objC.CartId = CartList[0].CartId;
                    objC.CardDetailId = id;
                    objC.PurchaseType = CartList[0].PurchaseType;
                    objC.Subtotal = Convert.ToDecimal(objUserCartInfo.Subtotal);
                    objC.Discount = Convert.ToDecimal(objUserCartInfo.CupCodeAmount);
                    objC.GrantTotal = Convert.ToDecimal(objUserCartInfo.OrderTotal);
                    DataTable PurchaseOrderId = objOrder.SaveUserOrder(objC);

                    objUserCartInfo.PurchaseType = CartList[0].PurchaseType;
                    

                    var UserInfo = obj.GetUserDetails(objC.UserID, objC.CourseID);

                    objUserCartInfo.PurchaseOrderId = PurchaseOrderId.Rows[0][0].ToString();

                    string Amount = "";

                    if (objUserCartInfo.PurchaseType == "Repurchase")
                    {
                        Amount = UserInfo[i].RenewCoursePrice;
                    }
                    else
                    {
                        Amount = UserInfo[i].CoursePrice;
                    }


                    ListOfCourse1 = "<tr class=\"gmail_msg\"><td colspan=\"3\" style=\"padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:2px;text-align:left;vertical-align:top\" class=\"gmail_msg\" bgcolor=\"\"><font style=\"font-family:arial,sans serif;font-size:11;font-weight:bold\" class=\"gmail_msg\">" + UserInfo[i].CourseName + "</font></td><td style=\"padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:2px;text-align:right;vertical-align:top;width:14%\" class=\"gmail_msg\" bgcolor=\"\"><font style=\"font-family:arial,sans serif;font-size:11;font-weight:bold\" class=\"gmail_msg\">$" + Amount + "</font></td></tr>";
                    ListOfCourse2 = "<tr class=\"gmail_msg\"><td style=\"padding-left:10px;padding-right:10px;padding-top:2px;padding-bottom:2px;text-align:left;vertical-align:top;width:48%\" class=\"gmail_msg\" bgcolor=\"\"><a href=\"javascript:void(0);\" class=\"gmail_msg\" target=\"_blank\"><img src='" + UserInfo[i].CourseImageFile + "' alt=\"img\" class=\"gmail_msg\" border=\"0\" width=\"20%\"></a></td><td style=\"padding-left:10px;padding-right:10px;padding-top:2px;padding-bottom:2px;text-align:left;vertical-align:top;width:18%\" class=\"gmail_msg\" bgcolor=\"\"><font style=\"font-family:arial,sans serif;font-size:11\" class=\"gmail_msg\">Quantity:</font></td><td style=\"padding-left:10px;padding-right:10px;padding-top:2px;padding-bottom:2px;text-align:left;vertical-align:top;width:20%\" class=\"gmail_msg\" bgcolor=\"\"><font style=\"font-family:arial,sans serif;font-size:11\" class=\"gmail_msg\">" + objUserCartInfo.Quantity + "&nbsp;plan(s)</font></td><td style=\"padding-left:10px;padding-right:10px;padding-top:2px;padding-bottom:2px;text-align:right;vertical-align:top;width:14%\" class=\"gmail_msg\" bgcolor=\"\"><font style=\"font-family:arial,sans serif;font-size:11\" class=\"gmail_msg\">&nbsp;</font></td></tr>";
                    ListOfCourse3 = "<tr class=\"gmail_msg\"><td style=\"padding-left:10px;padding-right:10px;padding-top:2px;padding-bottom:2px;text-align:left;vertical-align:top;width:48%\" class=\"gmail_msg\" bgcolor=\"\"><font style=\"font-family:arial,sans serif;font-size:11\" class=\"gmail_msg\">&nbsp;</font></td><td style=\"padding-left:10px;padding-right:10px;padding-top:2px;padding-bottom:2px;text-align:left;vertical-align:top;width:18%\" class=\"gmail_msg\" bgcolor=\"\"><font style=\"font-family:arial,sans serif;font-size:11\" class=\"gmail_msg\">Term:</font></td><td style=\"padding-left:10px;padding-right:10px;padding-top:2px;padding-bottom:2px;text-align:left;vertical-align:top;width:20%\" class=\"gmail_msg\" bgcolor=\"\"><font style=\"font-family:arial,sans serif;font-size:11\" class=\"gmail_msg\">" + objUserCartInfo.Term + " Month(s)</font></td><td style=\"padding-left:10px;padding-right:10px;padding-top:2px;padding-bottom:2px;text-align:right;vertical-align:top;width:14%\" class=\"gmail_msg\" bgcolor=\"\"><font style=\"font-family:arial,sans serif;font-size:11\" class=\"gmail_msg\">&nbsp;</font></td></tr>";
                    ListOfCourse4 = "<tr class=\"gmail_msg\"><td style=\"padding-left:10px;padding-right:10px;padding-top:2px;padding-bottom:2px;text-align:left;vertical-align:top;width:48%\" class=\"gmail_msg\" bgcolor=\"\"><font style=\"font-family:arial,sans serif;font-size:11\" class=\"gmail_msg\">&nbsp;</font></td><td style=\"padding-left:10px;padding-right:10px;padding-top:2px;padding-bottom:2px;text-align:left;vertical-align:top;width:18%\" class=\"gmail_msg\" bgcolor=\"\"><font style=\"font-family:arial,sans serif;font-size:11\" class=\"gmail_msg\">&nbsp;</font></td><td style=\"padding-left:10px;padding-right:10px;padding-top:2px;padding-bottom:2px;text-align:left;vertical-align:top;width:20%\" class=\"gmail_msg\" bgcolor=\"\"><font style=\"font-family:arial,sans serif;font-size:11\" class=\"gmail_msg\">&nbsp;</font></td><td style=\"padding-left:10px;padding-right:10px;padding-top:2px;padding-bottom:2px;text-align:right;vertical-align:top;width:14%\" class=\"gmail_msg\" bgcolor=\"\"><font style=\"font-family:arial,sans serif;font-size:11\" class=\"gmail_msg\">&nbsp;</font></td></tr>";

                    ListOfCourse += ListOfCourse1 + ListOfCourse2 + ListOfCourse3 + ListOfCourse4;


                    ListOfCourse1 = "";
                    ListOfCourse2 = "";
                    ListOfCourse3 = "";
                    ListOfCourse4 = "";
                    i = i + 1;                 
                                        
                    objReturn = new { type = "Success", Message = "Thank you for purchasing course" };

                }


                objUserCartInfo.ListOfCourses = ListOfCourse;


                if (objUserCartInfo.PurchaseType == "Repurchase")
                {
                    obj.SendMailForPO(CartList[0].UserID, 10, null, objUserCartInfo);
                }
                else
                {
                    obj.SendMailForPO(CartList[0].UserID, 3, null, objUserCartInfo);    
                }
                
                

                ListOfCourse = "";
            }
            else
            {
                objReturn = new { type = "Failure", Message = objProcess.RXMessage };
            }        

            return objReturn;
        }

        /// <summary>
        /// THIS METHOD IS USED TO GET ALL SELECTED Pages DETAILS BY Module ID FROM DATABASE
        /// </summary>
        /// <param name=ModuleID></param>
        /// <returns>Output as a Table</returns>
        /// 

        [Authorize(Roles = "User,Admin")]
        [HttpGet]
        public DataTable GetSelectedPagesByModuleId(int ModuleId, int Userid)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetSelectedPagesByModuleId(ModuleId, Userid);
        }

        [Authorize(Roles = "User,Admin")]
        [HttpGet]
        public DataTable GetSelectedCourseModuleNameById(int CourseID, int ModuleId, int UserId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();

            return objPackagesBAL.GetSelectedCourseModuleNameById(CourseID, ModuleId, UserId);
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public DataTable GetQuizByCourseIdAndModuleId(int CourseId, int ModuleId, int UserId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetQuizByCourseIdAndModuleId(CourseId, ModuleId, UserId);
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public DataTable GetQuestionsByQuizId(int QuizId, int UserId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetQuestionsByQuizId(QuizId, UserId);
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public DataTable GetOptionsByQuestionId(int QuestionId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetOptionsByQuestionId(QuestionId);
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public DataTable GetResultByQuizId(int UserId, int QuizId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetResultByQuizId(UserId, QuizId);
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public int InsertResult(int UserId, int QuizId, int Percentage)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.InsertResult(UserId, QuizId, Percentage);
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public int InsertUserAnswerHistory(int UserId, int OptionId, int UserExamAttemptID)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.InsertUserAnswerHistory(UserId, OptionId, UserExamAttemptID);
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public int SaveUserTrainingSessionbyUserId(int PageId, int UserId, int ModuleId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.SaveUserTrainingSession(PageId, UserId, ModuleId);
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public int UpdateCurrentPage(int PageId, int UserId, int ModuleId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.UpdateCurrentPage(PageId, UserId, ModuleId);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public int RearrangePage(int PageId, int DisplayOrder, int ModuleId, int Index)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.RearrangePage(PageId, DisplayOrder, ModuleId, Index);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public int ActivateDeActivatePage(int PageId, int ModuleId, bool isActive)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.ActivateDeActivatePage(PageId, ModuleId, isActive);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public int AddPageQuizAddQuestion(int PageQuizId, String Question)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.AddPageQuizAddQuestion(PageQuizId, Question);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public int DeletePageQuizAddQuestion(int PageQuizQuestionId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.DeletePageQuizAddQuestion(PageQuizQuestionId);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public int AddPageQuizQuesOption(int PageQuizQuestionId, string OptionText)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.AddPageQuizQuesOption(PageQuizQuestionId, OptionText);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public int DeletePageQuizQuestionOption(int PageQuizQuesOptionId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.DeletePageQuizQuestionOption(PageQuizQuesOptionId);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public int UpdatePageQuizQuestionOption(int PageQuizQuesOptionId, bool isCorrect)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.UpdatePageQuizQuestionOption(PageQuizQuesOptionId, isCorrect);
        }


       
        [HttpGet]
        public DataTable GetPageQuestion(int PageId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetPageQuestion(PageId);
        }
        [Authorize(Roles = "User")]
        [HttpGet]
        public DataTable GetQuestionReview(int UserId, int QuizId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetQuestionReview(UserId, QuizId);
        }
        [Authorize(Roles = "User")]
        [HttpGet]
        public DataTable GetPageQuesOptions(int PageQuizQuestionId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetPageQuesOptions(PageQuizQuestionId);
        }

        [HttpGet]
        public DataTable GetAllCourses()
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetAllCourses();
        }
        [Authorize(Roles = "User")]
        [HttpGet]
        public DataTable GetPurchasedPackages(int UserId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetPurchasedPackages(UserId);
        }
        [Authorize(Roles = "User")]
        [HttpGet]
        public DataSet GetPageByID(int PageId, int UserID)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetPageByID(PageId, UserID);
        }

      
        [HttpGet]
        public bool LockAccout(int CourseID, int UserId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            objPackagesBAL.LockAccout(CourseID, UserId);
            return objPackagesBAL.SendMail(UserId, 6, null);
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public int UnlockCourse(string UnlockCode)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.UnlockCourse(UnlockCode);
        }

       [AllowAnonymous]
        [HttpGet]
        public object GetResetData(string UnlockCode)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.GetResetData(UnlockCode);
        }

        
        [HttpGet]
        public int ResetPassword(int UserId, string UnlockCode, string Password)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.ResetPassword(UserId, UnlockCode, Password);

        }

        [HttpPost]
        public bool MakePasswordResetRequest(UserBAL obj)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            int userid = objPackagesBAL.MakePasswordResetRequest(obj.LoginID);
            if (userid != 0)
                return objPackagesBAL.SendMail(userid, 1, null);
            else
                return false;
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public int InsertResullt(int UserId, int QuizId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.InsertResullt(UserId, QuizId);

        }

        [Authorize(Roles = "User")]
        [HttpPost]
        public int SaveCard(UserCardDetail obj)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.SaveCard(obj);
        }

        string createPdf(int UserID)
        {
            string filename = "";
            UserBAL obj = new UserBAL();
            DataTable dt = obj.GetUserDetails(UserID);
            if (dt.Rows.Count > 0)
            {
                using (DocX doc = DocX.Load(HttpContext.Current.Server.MapPath("~/Content/Certificate-TEXAS.docx")))
                {
                    // Save this document as the users name followed by .docx
                    doc.ReplaceText("%Name%", dt.Rows[0]["FirstName"] + " " + dt.Rows[0]["LastName"]);
                    doc.ReplaceText("%DATE%", DateTime.Now.ToShortDateString());
                    doc.SaveAs(HttpContext.Current.Server.MapPath("~/Content/" + dt.Rows[0]["FirstName"] + ".docx"));
                }// Release this document from memory
                using (var document = new Document())
                {

                    document.LoadFromFile(HttpContext.Current.Server.MapPath("~/Content/" + dt.Rows[0]["FirstName"] + ".docx"));

                    filename = HttpContext.Current.Server.MapPath("~/Content/" + dt.Rows[0]["FirstName"] + ".pdf");
                    //Save doc file to pdf.
                    document.SaveToFile(filename, FileFormat.PDF);
                }

            }
            return filename;


        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public HttpResponseMessage Generate(int UserID)
        {

            try
            {



                string fileName = createPdf(UserID);

                if (!string.IsNullOrEmpty(fileName))
                {

                    using (MemoryStream ms = new MemoryStream())
                    {
                        using (FileStream file = new FileStream(fileName, FileMode.Open, FileAccess.Read))
                        {
                            byte[] bytes = new byte[file.Length];
                            file.Read(bytes, 0, (int)file.Length);
                            ms.Write(bytes, 0, (int)file.Length);

                            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
                            httpResponseMessage.Content = new ByteArrayContent(bytes.ToArray());
                            httpResponseMessage.Content.Headers.Add("x-filename", fileName);
                            httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                            httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");                            
                            httpResponseMessage.Content.Headers.ContentDisposition.FileName = "Certificate.pdf";
                            httpResponseMessage.StatusCode = HttpStatusCode.OK;
                            return httpResponseMessage;
                        }
                    }
                }
                return this.Request.CreateResponse(HttpStatusCode.NotFound, "File not found.");
            }
            catch (Exception ex)
            {
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
            }
        }        
       

        [Authorize(Roles = "Company")]
             [HttpGet]
         public HttpResponseMessage DownloadExcelTemplate()
         {
             try
             {
                 string fileName = HttpContext.Current.Server.MapPath("~/Content/SortSample.xlsx");

                 if (!string.IsNullOrEmpty(fileName))
                 {

                     using (MemoryStream ms = new MemoryStream())
                     {
                         using (FileStream file = new FileStream(fileName, FileMode.Open, FileAccess.Read))
                         {
                             byte[] bytes = new byte[file.Length];
                             file.Read(bytes, 0, (int)file.Length);
                             ms.Write(bytes, 0, (int)file.Length);

                             HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
                             httpResponseMessage.Content = new ByteArrayContent(bytes.ToArray());
                             httpResponseMessage.Content.Headers.Add("x-filename", fileName);
                             httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                             httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                             httpResponseMessage.Content.Headers.ContentDisposition.FileName = "Sample.xlsx";
                             httpResponseMessage.StatusCode = HttpStatusCode.OK;
                             return httpResponseMessage;
                         }
                     }
                 }
                 return this.Request.CreateResponse(HttpStatusCode.NotFound, "File not found.");
             }
             catch (Exception ex)
             {
                 return this.Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
             }
         }


        [HttpGet]
        public bool checkExpiredCourseDetail(string RequestCode)
        {           
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.checkExpiredCourseDetail(RequestCode);
           
        }

        [HttpPost]
        public DataTable VerifyCoursevalid(Users obj)
        {                       
            PackagesBAL objPackagesBAL = new PackagesBAL();
            DataTable dt = objPackagesBAL.VerifyCourseValidity(obj);
            return dt;
        }

       

    }
    
}
