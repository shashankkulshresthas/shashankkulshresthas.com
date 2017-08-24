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

namespace WEBAPI.Controllers
{
    public class AdminConfigurationController : ApiController
    {

        AdminConfigurationBAL obj = new AdminConfigurationBAL();
        #region "Admin Configuration"
		
		
		
		[HttpPost]
        public DataTable GetEmailConfiguration(AdminEmailConfiguration obj)
		{
            return (new AdminConfigurationBAL().GetConfiguration(obj));
		}

        // GET: /AdminConfiguration/
        [HttpGet]
        public DataTable GetConfiguration(AdminEmailConfiguration obj)
        {
            return (new AdminConfigurationBAL().GetConfiguration(obj));
        }

        [HttpPost]
        public int SaveEmailConfiguration(List<AdminEmailConfiguration> obj)
        {
            return (new AdminConfigurationBAL().SaveEmailConfiguration(obj));
        }

        [HttpPost]
        public DataTable GetSystemConfiguration(SystemConfigurationBOL obj)
        {
            return (new AdminConfigurationBAL().GetConfiguration(obj));
        }


        [HttpPost]
        public int SaveSystemConfig(List<SystemConfigurationBOL> obj)
        {
            return (new AdminConfigurationBAL().SaveSystemConfig(obj));

        }
        #endregion

        #region "CourseConfiguration"
        [HttpPost]
        public DataTable GetAllCourse()
        {
            return (new AdminCourseConfigBAL().GetAllCourse());

        }

        [HttpPost]
        public int SaveCourseDetail(CourseConfig obj)
        {
            return (new AdminCourseConfigBAL().SaveCourseDetail(obj));

        }
        #endregion

        #region "File Upload"
        #endregion
    }
}
