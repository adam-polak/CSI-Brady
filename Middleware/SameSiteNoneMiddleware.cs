namespace CSI_Brady.Middleware;

public class SameSiteNoneMiddleware
{
    private readonly RequestDelegate _next;
    private ILogger<SameSiteNoneMiddleware> _logger;

    public SameSiteNoneMiddleware(ILogger<SameSiteNoneMiddleware> logger, RequestDelegate next)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        _logger.Log(LogLevel.Critical, "Middleware should only be used locally");

        CookieOptions cookieOptions = new CookieOptions
        {
            Secure = false,
            HttpOnly = true,
            SameSite = SameSiteMode.None
        };

        context.Response.Cookies.Append("DevelopmentCookie", "cookieValue", cookieOptions);

        await _next(context);
    }
}

public static class SameSiteNoneMiddlewareExtensions
{
    public static IApplicationBuilder UseSameSiteNoneMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<SameSiteNoneMiddleware>();
    }
}