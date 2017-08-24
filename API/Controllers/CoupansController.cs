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
    public class CoupansController : ApiController
    {
         CoupansBAL objCoupansBAL = new CoupansBAL();
        [HttpPost]
         public int SaveCoupans(Coupans obj)
        {
            int i = objCoupansBAL.SaveCoupans(obj);
            return i;
        }


        [HttpPost]
        public DataTable GetCoupans(Coupans obj)
        {
            DataTable dt = objCoupansBAL.GetCoupans(obj);
            return dt;
        }

        // Delete Coupans
        [HttpPost]
        public int DeleteCoupan(Coupans obj)
        {
            int i = objCoupansBAL.DeleteCoupan(obj);
            return i;
        }

    }
}
