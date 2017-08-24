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
    public class TemplateMasterController : ApiController
    {
        //
        // GET: /TemplateMaster/

        [HttpPost]
        public DataTable GetAllTemplates()
        {
            return (new TemplateMasterBAL().GetAllTemplates());
        }

        [HttpPost]
        public DataTable GetTemplateById(TemplateMasterBOL obj)
        {
            return (new TemplateMasterBAL().GetTemplateById(obj));
        }

        [HttpPost]
        public int UpdateTemplate(TemplateMasterBOL obj)
        {
            return (new TemplateMasterBAL().UpdateTemplate(obj));
        }

    }
}
