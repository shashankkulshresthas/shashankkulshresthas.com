using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using BAL;
using Microsoft.Owin.Security.OAuth;

namespace WEBAPI.Provides
{
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            DataTable dtUser = new DataTable();
            UserBAL obj = new UserBAL { LoginID = context.UserName, Password = context.Password };
            dtUser = obj.CheckLoginExistOrNot(obj);
            if (dtUser == null || dtUser.Rows.Count == 0)
            {
                context.SetError("invalid_grant", "1");
                return;
            }
            else if (dtUser.Rows[0][0].ToString() == "0")
            {
                context.SetError("invalid_grant", "0");
                return;
            }
            

            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim("ID", dtUser.Rows[0]["UserID"].ToString()));
            identity.AddClaim(new Claim(ClaimTypes.Role, dtUser.Rows[0]["UserType"].ToString()));

            context.Validated(identity);

        }
    }
}