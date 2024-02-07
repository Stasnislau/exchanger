using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

[ApiController]
[Route("api/[controller]")]
public class AuthorizationController
{
    private readonly AuthorizationService _AuthorizationService;
    public AuthorizationController(AuthorizationService authorizationService)
    {
        _AuthorizationService = authorizationService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody]string username,[FromBody] string password)
    {
        try
        {
            var response = await _AuthorizationService.Login(username, password);
            string jsonString = JsonConvert.SerializeObject(response);
            return new ContentResult
            {
                Content = jsonString,
                ContentType = "application/json",
                StatusCode = 200
            };
        }
        catch (Exception)
        {
            throw;
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] string username,[FromBody] string password,[FromBody] string email)
    {
        try
        {
            var response = await _AuthorizationService.Register(username, password, email);
            string jsonString = JsonConvert.SerializeObject(response ?
                new
                {
                    message = "User created",
                    success = true
                } :
                new
                {
                    message = "User not created",
                    success = false
                });

            return new ContentResult
            {
                Content = jsonString,
                ContentType = "application/json",
                StatusCode = 200
            };
        }
        catch (Exception)
        {
            throw;
        }
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        try
        {
            bool response = await _AuthorizationService.Logout();
            string jsonString = JsonConvert.SerializeObject(response ?
                new
                {
                    message = "User logged out",
                    success = true
                } :
                new
                {
                    message = "User not logged out",
                    success = false
                });
            return new ContentResult
            {
                Content = jsonString,
                ContentType = "application/json",
                StatusCode = 200
            };
        }
        catch (Exception)
        {
            throw;
        }
    }

    [HttpPost("refresh")]
    [Authorize]
    public async Task<IActionResult> Refresh()
    {
        try
        {
            var response = await _AuthorizationService.Refresh();
            string jsonString = JsonConvert.SerializeObject(response);
            return new ContentResult
            {
                Content = jsonString,
                ContentType = "application/json",
                StatusCode = 200
            };
        }
        catch (Exception)
        {
            throw;
        }
    }
}