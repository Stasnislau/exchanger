public class UserInfoMiddleware
{
    private readonly RequestDelegate _next;

    public UserInfoMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        var user = context.User;
        if (user.Identity.IsAuthenticated)
        {
            var username = user.Identity.Name;
            var email = user.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
            Console.WriteLine(user.Claims);
            context.Items["username"] = username;
            context.Items["email"] = email;
        }
        await _next(context);
    }
}