using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using BAL;
using BOL;

namespace WEBAPI.Controllers
{
    public class PageController : ApiController
    {
        /// <summary>
        /// THIS METHOD IS USED TO SAVE Page DETAILS IN  DATABASE
        /// </summary>
        /// <param name=></param>
        /// <returns>Output as a int</returns>
         [Authorize(Roles = "Admin")] 
        [HttpPost]
        public int InsertPage(Page Page)
        {
            PageBAL objOrder = new PageBAL();
            return objOrder.InsertPage(Page);
        }

          /// <summary>
        /// THIS METHOD IS USED TO Delete Page DETAILS IN  DATABASE
        /// </summary>
        /// <param name=></param>
        /// <returns>Output as a int</returns>
       [Authorize(Roles = "Admin")]
        [HttpPost]
        public int DeletePage(Page Page)
        {
            PageBAL objOrder = new PageBAL();
            return objOrder.DeletePage(Page);
        }
       

    }
}
