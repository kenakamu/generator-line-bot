using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.Extensions.Primitives;
using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace <%= appname %>.Middleware
{
    /// <summary>
    /// Verify if the request is valid, then returns LINE Webhook events from the request.
    /// </summary>
    public class LineValidationMiddleware
    {
        private readonly RequestDelegate next;
        private string channelSecret;

        public LineValidationMiddleware(RequestDelegate next, string channelSecret)
        {
            this.next = next;
            this.channelSecret = channelSecret;
        }

        public async Task Invoke(HttpContext context)
        {
            context.Request.EnableRewind();
            StringValues lineSignatureHeader;
            IHeaderDictionary headers = context.Request.Headers;
            var xLineSignature = context.Request.Headers.TryGetValue("X-Line-Signature", out lineSignatureHeader);
            var content = new StreamReader(context.Request.Body).ReadToEnd();
            if (string.IsNullOrEmpty(lineSignatureHeader.FirstOrDefault()) || !VerifySignature(channelSecret, lineSignatureHeader.First(), content))
            {
                throw new Exception("Signature validation faild.");
            }
            context.Request.Body.Position = 0;
            await next(context);
        }

        /// <summary>
        /// The signature in the X-Line-Signature request header must be verified to confirm that the request was sent from the LINE Platform.
        /// Authentication is performed as follows.
        /// 1. With the channel secret as the secret key, your application retrieves the digest value in the request body created using the HMAC-SHA256 algorithm.
        /// 2. The server confirms that the signature in the request header matches the digest value which is Base64 encoded
        /// https://developers.line.me/en/docs/messaging-api/reference/#signature-validation
        /// </summary>
        /// <param name="channelSecret">ChannelSecret</param>
        /// <param name="xLineSignature">X-Line-Signature header</param>
        /// <param name="requestBody">RequestBody</param>
        /// <returns></returns>
        internal static bool VerifySignature(string channelSecret, string xLineSignature, string requestBody)
        {
            try
            {
                var key = Encoding.UTF8.GetBytes(channelSecret);
                var body = Encoding.UTF8.GetBytes(requestBody);

                using (HMACSHA256 hmac = new HMACSHA256(key))
                {
                    var hash = hmac.ComputeHash(body, 0, body.Length);
                    var xLineBytes = Convert.FromBase64String(xLineSignature);
                    return SlowEquals(xLineBytes, hash);
                }
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Compares two-byte arrays in length-constant time. 
        /// This comparison method is used so that password hashes cannot be extracted from on-line systems using a timing attack and then attacked off-line.
        /// <remarks> http://bryanavery.co.uk/cryptography-net-avoiding-timing-attack/#comment-85　</remarks>
        /// </summary>
        private static bool SlowEquals(byte[] a, byte[] b)
        {
            uint diff = (uint)a.Length ^ (uint)b.Length;
            for (int i = 0; i < a.Length && i < b.Length; i++)
                diff |= (uint)(a[i] ^ b[i]);
            return diff == 0;
        }
    }
}
