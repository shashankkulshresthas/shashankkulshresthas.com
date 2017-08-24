/*********************************************************************************************************************************
 * Copyright (c) 2016 ProtaTECHIndia
 * ---------------------------------
 * File Name                            : ContactUsController.cs
 * Description                          : This file is used to save Contact us Information .
 * Namespace                            : 
 * Dependency                           : 
 * ----------------------------------
 * Development History
 * --------------------------------------------------------------------------------------------------------------------------------
 * Developer                    |   Action          |      Date         |   Description
 * --------------------------------------------------------------------------------------------------------------------------------
 * 1. Hari Ram Seth             |   Creation          |   11-Nov.-2016   |  This file is used to save Contact us Information .
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
namespace WEBAPI.Controllers
{

    public class ContactUsController : ApiController
    {

        //[System.Web.Http.AcceptVerbs("GET", "POST")]
        //[System.Web.Http.HttpGet]
        [HttpPost]
        public int SaveContactInfo(ContactUsBAL obj)
        {
            ContactUsBAL objContactUsBAL = new ContactUsBAL();
            return objContactUsBAL.SaveContactInfo(obj);
        }
        [HttpGet]
        public DataTable GetContactusInfo()
        {
            ContactUsBAL objContactUsBAL = new ContactUsBAL();
            return objContactUsBAL.GetContactusInfo();
        }
       
    }
}
