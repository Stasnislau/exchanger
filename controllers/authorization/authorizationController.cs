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
    public async Task<IActionResult> Login([FromBody] LoginDTO dto)
    {
        try
        {
            var response = await _AuthorizationService.Login(dto.username, dto.password);
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
    public async Task<IActionResult> Register([FromBody] RegisterDTO dto)
    {
        try
        {
            var response = await _AuthorizationService.Register(dto.username, dto.password, dto.email);
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