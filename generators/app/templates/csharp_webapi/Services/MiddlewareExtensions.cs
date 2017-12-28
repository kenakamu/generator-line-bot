using Microsoft.AspNetCore.Builder;

namespace <%= appname %>.Middleware
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseLineValidationMiddleware(this IApplicationBuilder app, string channelSecret)
        {
            return app.UseMiddleware<LineValidationMiddleware>(channelSecret);
        }
    }
}
