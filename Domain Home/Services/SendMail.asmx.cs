using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Amazon.SimpleEmail;
using Amazon.SimpleEmail.Model;

namespace Domain_Home
{
    /// <summary>
    /// Summary description for SendMail
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]    
    [System.Web.Script.Services.ScriptService]
    public class SendMail : System.Web.Services.WebService
    {
        private readonly string FROM = "no-reply@sean-clark.com";
        private readonly string TO = "sean@sean-clark.com";
        private readonly string SUBJECT = "Message from sean-clark.com";

        private readonly string BODY = @"From: {0}<p>Message:{1}";

        [WebMethod]
        public void Send(string name, string replyTo, string messageBody)
        {
            var destination = new Destination()
            {
                ToAddresses = new List<string>() { TO }
            };

            var subject = new Content(SUBJECT);

            var body = new Body()
            {
                Html = new Content(string.Format(BODY, name, messageBody))
            };

            var message = new Message(subject, body);

            var request = new SendEmailRequest(FROM, destination, message);            

            request.ReplyToAddresses = new List<string> { replyTo };

            var region = Amazon.RegionEndpoint.USEast1;

            using (var client = new AmazonSimpleEmailServiceClient(region))
            {
                try
                {                    
                    client.SendEmail(request);
                }
                catch(Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
            }
        }
    }
}
