using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using database;

public class UserInfoMiddleware
{
    private readonly RequestDelegate _next;

    public UserInfoMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {

        var header = context.Request.Headers.ContainsKey("Authorization") ? context.Request.Headers["Authorization"].ToString() : null;
        if (header != null)
        {
            var token = header.Split(" ")[1];
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;
            int userId = int.Parse(jsonToken.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value);
            var user = context.User;
            user.AddIdentity(new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, userId.ToString()) }));
        }
        await _next(context);
    }
}