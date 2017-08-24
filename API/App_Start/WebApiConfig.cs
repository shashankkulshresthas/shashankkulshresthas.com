using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Routing;
using Newtonsoft.Json.Serialization;

namespace WEBAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute
                (
            name: "DefaultApi",
            routeTemplate: "api/{controller}/{action}/{id}",
            defaults: new { id = RouteParameter.Optional }
        );
            
            //var cors = new EnableCorsAttribute("http://localhost:88/WEBAPI/", "*", "*");
            //config.EnableCors(cors);    

            config.Routes.MapHttpRoute
                (
             name: "AuthenticationApi",
             routeTemplate: "api/{controller}/{action}/{Type}/{LookupId}",
             defaults: new { user = RouteParameter.Optional, pass = RouteParameter.Optional }
         );


            config.Routes.MapHttpRoute
                (
            name: "DeleteApiWithId",
            routeTemplate: "api/{controller}/{action}/{Id}",
            defaults: new { Id = RouteParameter.Optional }
        );

            // config.Routes.MapHttpRoute("DefaultApiGet", "api/{controller}/{action}/{para1}/{para2}");

            config.Routes.MapHttpRoute("DefaultApiWithId", "api/{controller}/{id}", new { id = RouteParameter.Optional }, new { id = @"\d+" });
            config.Routes.MapHttpRoute("DefaultApiWithAction", "api/{controller}/{action}");
            //config.Routes.MapHttpRoute("DefaultApiGet", "api/{controller}", new { action = "Get" }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Get) });
            config.Routes.MapHttpRoute("DefaultApiPost", "api/{controller}/{action}/{Data}", new { action = "Post" }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Post) });

            //config.Routes.MapHttpRoute("MyRoute3", "api/PackageAndComponent/Post/{Data}", new { controller = "PackageAndComponent", action = "Post" });

        }
        public static void Authentication(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "AuthenticationApi",
                routeTemplate: "api/{controller}/{user}/{pass}",
                defaults: new { user = RouteParameter.Optional, pass = RouteParameter.Optional }
            );

            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}
