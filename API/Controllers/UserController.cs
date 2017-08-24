/*********************************************************************************************************************************
 * Copyright (c) 2016 ProtaTECHIndia
 * ---------------------------------
 * File Name                            : UserController.cs
 * Description                          : This file is used to manage User Information .
 * Namespace                            : 
 * Dependency                           : 
 * ----------------------------------
 * Development History
 * --------------------------------------------------------------------------------------------------------------------------------
 * Developer                    |   Action          |      Date         |   Description
 * --------------------------------------------------------------------------------------------------------------------------------
 * 1. Hari Ram Seth             |   Creation          |   14-Nov.-2016   |  This file is used to manage User Information . .
 * 
   
 **********************************************************************************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;
using BAL;
using System.Threading.Tasks;
using System.IO;
using System.Web;
using Newtonsoft.Json;
using BOL;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Data.SqlClient;
using System.Web.Providers.Entities;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json.Linq;
using System.Reflection;
using System.Security.Claims;


namespace WEBAPI.Controllers
{
    public class UserController : ApiController
    {
       
       

        public int GetCurrentUserID() {
            var identity = User.Identity as ClaimsIdentity;
            Claim identityClaim = identity.Claims.FirstOrDefault(c => c.Type == "ID");
            return Convert.ToInt32(identityClaim.Value);
        }

        /// <summary>
        /// This function is used to register user
        /// </summary>
        /// <returns>Output as a int</returns>
        UserBAL objUserBAL = new UserBAL();
        [AllowAnonymous]
        [HttpPost]
        public int SaveUser(UserBAL obj)
        {
           int i=  objUserBAL.SaveUser(obj);
           if (i > 0)
           {
               PackagesBAL objPackagesBAL = new PackagesBAL();
               objPackagesBAL.SendMail(i, 2, null);
           }
              return i;
        }

        [Authorize(Roles = "User,Company")]
        [HttpPost]
        public int UpdateUser(UserBAL obj)
        {
            return objUserBAL.UpdateUser(obj);
        }
        
        [Authorize]
        [Route("")]
        [HttpGet]
        public DataTable VerifyUserPassword(string Password)
        {
            int userid = GetCurrentUserID();
            DataTable dtUser = objUserBAL.VerifyUserPassword(userid, Password);
            return dtUser;
        }
        

        

        [Authorize]
        [HttpGet]
        public DataTable UsersWithNoCourse()
        {
            DataTable dtUser = objUserBAL.UsersWithNoCourse();
            return dtUser;
        }

        [Authorize]
        [Route("")]
        [HttpGet]
        public DataTable GetUserDetail()
        {
            int userid = GetCurrentUserID();
           DataTable dtUser = objUserBAL.GetUserDetail(userid);
            return dtUser;
        }


        /// <summary>
        /// This function is used to check user credentials
        /// </summary>
        /// <param name=LoginId></param>
        /// <param name="Password"></param>
        /// <returns>Output as a Table</returns>
        [HttpPost]
        public DataTable AuthenticateUser(UserBAL obj)
        {
            DataTable dtUser = new DataTable();
            dtUser = objUserBAL.CheckLoginExistOrNot(obj);
            return dtUser;
        }

          [HttpGet]
        public bool isCoursePurchased(int UserId, int CourseID)
        {
            return objUserBAL.isCoursePurchased(UserId, CourseID);
             
        }

        [HttpGet]
        public int checkProfileCompletion(int UserId)
        {
            return objUserBAL.checkProfileCompletion(UserId);             
        }
        
        [Authorize(Roles = "User,Company")]
        [HttpGet]
        public DataTable GetUserDetails(int UserId)
        {
            return objUserBAL.GetUserDetails(UserId);

        }

          [Authorize(Roles = "User,Company")]
        [Route("")]
        [HttpGet]
        public DataTable GetSecurityQuestion()
        {
            int userid = GetCurrentUserID();
            return objUserBAL.GetSecurityQuestion();
        }

          [Authorize(Roles = "User,Company")]
        [HttpGet]
        public int InsertUserSecurityQuestAns(int UserID, String QuestionIdAns)
        {
            return objUserBAL.InsertUserSecurityQuestAns(UserID, QuestionIdAns);
        }

          [Authorize(Roles = "User,Company")]
        [HttpGet]
        public DataTable GetUserSecurityQuestAns(int UserID)
        {
            return objUserBAL.GetUserSecurityQuestAns(UserID);
        }

        [HttpGet]
        public IList<BOL.Mail> MailConfiguration(int TemplateId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.MailConfiguration();
        }
        [Authorize(Roles = "User")]
        [HttpGet]
        public bool SendMail(int UserID, int MailType,Nullable<int> CourseId)
        {
            PackagesBAL objPackagesBAL = new PackagesBAL();
            return objPackagesBAL.SendMail(UserID, MailType, CourseId);
        }

          [Authorize(Roles = "Company")]
        [HttpGet]
        public DataTable GetAllUsersListByCompanyId(int CompanyId,int CourseId,string type)
        {
            UserBAL objUserBAL = new UserBAL();
            return objUserBAL.GetAllUsersListByCompanyId(CompanyId,CourseId,type);
        }


          [Authorize(Roles = "Company")]
        [HttpGet]
        public DataTable GetCourseListByCompId(int CompanyId)
        {
            UserBAL objUserBAL = new UserBAL();
            return objUserBAL.GetCourseListByCompId(CompanyId);
        }

           [Authorize(Roles = "Company")]
        [HttpGet]
        public DataTable GetCourseLicense(int CompanyId ,int CourseId)
        {
            UserBAL objUserBAL = new UserBAL();
            return objUserBAL.GetCourseLicense(CompanyId,CourseId);
        }

         [Authorize(Roles = "Company")]
        [HttpGet]
        public int InsertUserAssignCourse(int CourseId, int UserId, int PurchaseItemId)
        {
            return objUserBAL.InsertUserAssignCourse(CourseId, UserId, PurchaseItemId);
        }

         [Authorize(Roles = "Company")]
        [HttpGet]
        public int DeleteUserAssignCourse(int CourseId, int UserId, int PurchaseItemId)
        {
            return objUserBAL.DeleteUserAssignCourse(CourseId, UserId, PurchaseItemId);
        }
        
        [Authorize(Roles = "Company")]
        [HttpPost]
        public async Task<HttpResponseMessage> Upload()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                this.Request.CreateResponse(HttpStatusCode.UnsupportedMediaType);
            }

            var provider = GetMultipartProvider();
            var result = await Request.Content.ReadAsMultipartAsync(provider);
            var originalFileName = GetDeserializedFileName(result.FileData.FirstOrDefault());
            var uploadedFileInfo = new FileInfo(result.FileData.First().LocalFileName);

            UploadDataModel objUploadDataModel = new UploadDataModel();

            UploadDataModel fileUploadObj = (UploadDataModel)GetFormData<UploadDataModel>(result);

            string FileNameWithPath = uploadedFileInfo.FullName;

            DataTable dt = new DataTable();

            dt.Columns.Add("FirstName", typeof(string));
            dt.Columns.Add("MiddleName", typeof(string));
            dt.Columns.Add("LastName", typeof(string));
            dt.Columns.Add("Address", typeof(string));
            dt.Columns.Add("City", typeof(string));
            dt.Columns.Add("StateName", typeof(string));
            dt.Columns.Add("ZIP", typeof(string));
            dt.Columns.Add("PrimaryPhone", typeof(string));
            dt.Columns.Add("AlternatePhone", typeof(string));
            dt.Columns.Add("Email", typeof(string));
            dt.Columns.Add("SSN", typeof(string));


            dt = ConvertExcelToDataTable(FileNameWithPath);

            System.Data.DataColumn newColumn = new System.Data.DataColumn("UserTypeId", typeof(int)); newColumn.DefaultValue = 1; dt.Columns.Add(newColumn);
            System.Data.DataColumn newColumn2 = new System.Data.DataColumn("CompanyId", typeof(int)); newColumn2.DefaultValue = GetCompanyId(int.Parse(fileUploadObj.testString1)).Rows[0][0].ToString(); dt.Columns.Add(newColumn2);






            return this.Request.CreateResponse(HttpStatusCode.OK, new { dt });
        }

        // You could extract these two private methods to a separate utility class since
        // they do not really belong to a controller class but that is up to you
        private MultipartFormDataStreamProvider GetMultipartProvider()
        {
            var uploadFolder = "~/App_Data/Tmp/FileUploads"; // you could put this to web.config
            var root = HttpContext.Current.Server.MapPath(uploadFolder);
            Directory.CreateDirectory(root);
            return new MultipartFormDataStreamProvider(root);
        }

        // Extracts Request FormatData as a strongly typed model
        private object GetFormData<T>(MultipartFormDataStreamProvider result)
        {
            if (result.FormData.HasKeys())
            {
                var unescapedFormData = Uri.UnescapeDataString(result.FormData.GetValues(0).FirstOrDefault() ?? String.Empty);
                if (!String.IsNullOrEmpty(unescapedFormData))
                    return JsonConvert.DeserializeObject<T>(unescapedFormData);
            }

            return null;
        }

        private string GetDeserializedFileName(MultipartFileData fileData)
        {
            var fileName = GetFileName(fileData);
            return JsonConvert.DeserializeObject(fileName).ToString();
        }

        public string GetFileName(MultipartFileData fileData)
        {
            return fileData.Headers.ContentDisposition.FileName;
        }


        public DataTable ConvertExcelToDataTable(string FileNameWithPath)
        {
            //Create a new DataTable.
            DataTable dt = new DataTable();
            //Open the Excel file in Read Mode using OpenXml.           
            try
            {

                using (SpreadsheetDocument doc = SpreadsheetDocument.Open(FileNameWithPath, false))
                {
                    //Read the first Sheet from Excel file.
                    Sheet sheet = doc.WorkbookPart.Workbook.Sheets.GetFirstChild<Sheet>();

                    //Get the Worksheet instance.
                    Worksheet worksheet = (doc.WorkbookPart.GetPartById(sheet.Id.Value) as WorksheetPart).Worksheet;

                    //Fetch all the rows present in the Worksheet.
                    IEnumerable<Row> rows = worksheet.GetFirstChild<SheetData>().Descendants<Row>();

                  

                    //Loop through the Worksheet rows.
                    foreach (Row row in rows)
                    {
                        //Use the first row to add columns to DataTable.
                        if (row.RowIndex.Value == 1)
                        {
                            foreach (Cell cell in row.Descendants<Cell>())
                            {
                                dt.Columns.Add(GetValue(doc, cell));
                            }
                        }
                        else
                        {
                            //Add rows to DataTable.
                            dt.Rows.Add();
                            int i = 0;
                            foreach (Cell cell in row.Descendants<Cell>())
                            {
                                dt.Rows[dt.Rows.Count - 1][i] = GetValue(doc, cell);
                                i++;
                            }
                        }
                    }
                    
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return dt;
        }

        private string GetValue(SpreadsheetDocument doc, Cell cell)
        {
            string value = cell.CellValue.InnerText;
            if (cell.DataType != null && cell.DataType.Value == CellValues.SharedString)
            {
                return doc.WorkbookPart.SharedStringTablePart.SharedStringTable.ChildElements.GetItem(int.Parse(value)).InnerText;
            }
            return value;
        }


        public DataTable ToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);

            //Get all the properties
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Defining type of data column gives proper data table 
                var type = (prop.PropertyType.IsGenericType && prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>) ? Nullable.GetUnderlyingType(prop.PropertyType) : prop.PropertyType);
                //Setting column names as Property names
                dataTable.Columns.Add(prop.Name, type);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    //inserting property values to datatable rows
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            //put a breakpoint here and check datatable
            return dataTable;
        }


           [Authorize(Roles = "Company")]
        [HttpPost]
        public bool UsersUpload(List<BOL.Users> User)
        {       

            DataTable dt = new DataTable();
            dt = ToDataTable(User);



            SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["sqlCon"].ToString());

            //creating object of SqlBulkCopy  
            SqlBulkCopy objbulk = new SqlBulkCopy(con.ConnectionString.ToString(), SqlBulkCopyOptions.FireTriggers);
            //assigning Destination table name  
            objbulk.DestinationTableName = "Users";
            //Mapping Table column  

            //objbulk.ColumnMappings.Add("UserID", "UserID");
            objbulk.ColumnMappings.Add("UserTypeId", "UserTypeId");
            objbulk.ColumnMappings.Add("FirstName", "FirstName");
            objbulk.ColumnMappings.Add("MiddleName", "MiddleName");
            objbulk.ColumnMappings.Add("LastName", "LastName");
            objbulk.ColumnMappings.Add("Address", "Address");
            objbulk.ColumnMappings.Add("City", "City");
            objbulk.ColumnMappings.Add("StateName", "StateName");
            objbulk.ColumnMappings.Add("ZIP", "ZIP");
            objbulk.ColumnMappings.Add("PrimaryPhone", "PrimaryPhone");
            objbulk.ColumnMappings.Add("AlternatePhone", "AlternatePhone");
            objbulk.ColumnMappings.Add("Email", "Email");
            //objbulk.ColumnMappings.Add("DOB", "DOB");
            objbulk.ColumnMappings.Add("SSN", "SSN");
            //objbulk.ColumnMappings.Add("LoginName", "LoginName");
            //objbulk.ColumnMappings.Add("LoginPassword", "LoginPassword");
            //objbulk.ColumnMappings.Add("AccountCreatedOn", "AccountCreatedOn");
            //objbulk.ColumnMappings.Add("Active", "Active");
            objbulk.ColumnMappings.Add("CompanyId", "CompanyId");

            //inserting bulk Records into DataBase   



            try
            {
                con.Open();
                objbulk.WriteToServer(dt);
                con.Close();
            }
            catch (Exception)
            {
                throw;
            }           

            return true;
        }

           [Authorize(Roles = "Company")]
        [HttpPost]
        public int InsertPromotion(Promotions obj)
        {
            return (new UserBAL().InsertPromotion(obj));
        }


           [Authorize(Roles = "Company")]
        [HttpGet]
        public DataTable DisplayPromotions(int CompanyId)
        {
            return (new UserBAL().DisplayPromotions(CompanyId)); 
        }

           [Authorize(Roles = "Company")]
        [HttpGet]
        public DataTable GetCompanyId(int UserId)
        {
            return (new UserBAL().GetCompanyId(UserId));
        }

        [Authorize(Roles = "Company")]
        [HttpGet]
        public DataTable GetUserPassword(int UserId)
        {
            return (new UserBAL().GetUserPassword(UserId));
        }

        [Authorize(Roles = "Company,User,Admin")]
        [HttpPost]
        public int ChangeUserPassword(BOL.Users obj)
        {
            return (new UserBAL().ChangeUserPassword(obj));
        }

           [Authorize(Roles = "Company")]
        [HttpGet]
        public int UpdateUserPassword(int UserId, string EmailId)
        {
            return (new UserBAL().UpdateUserPassword(UserId, EmailId));
        }
  
        [Authorize(Roles = "Company")]
        [HttpPost]
        public int DeletePromotion(BOL.Promotions obj )
        {
            return (new UserBAL().DeletePromotion(obj));
        }
         [Authorize(Roles = "User,Company")]
        [HttpGet]
		public bool ValidateUsers(string email)
        {
            return (new UserBAL().ValidateUsers(email));
        }

         [Authorize(Roles = "Company")]
        [HttpGet]
        public DataTable GetAllUsersList(int UserId)
        {
            return objUserBAL.GetAllUsersList(UserId);

        }

         [Authorize(Roles = "User,Company")]
        [HttpGet]
        public DataTable GetExpiredCourse(int UserId)
        {
            return objUserBAL.GetExpiredCourse(UserId);
        }

    }

}
