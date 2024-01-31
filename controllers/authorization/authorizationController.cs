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
    public async Task<IActionResult> Login(string username, string password, string email)
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
    public async Task<IActionResult> Register(string username, string password, string email)
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
}