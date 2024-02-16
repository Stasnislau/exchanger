using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

[ApiController]
[Route("api/[controller]")]
public class AuthorizationController : ControllerBase
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
            return Ok(response);
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
            var responseMessage = response ?
                new
                {
                    message = "User created",
                    success = true
                } :
                new
                {
                    message = "User not created",
                    success = false
                };

            return Ok(responseMessage);
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
            var responseMessage = response ?
                new
                {
                    message = "User logged out",
                    success = true
                } :
                new
                {
                    message = "User not logged out",
                    success = false
                };
            return Ok(responseMessage);
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
            return Ok(response);
        }
        catch (Exception)
        {
            throw;
        }
    }

    [HttpPost("forgot")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDTO dto)
    {
        try
        {
            var response = await _AuthorizationService.ForgotPassword(dto.email, dto.username, dto.newPassword);
            var responseMessage = response ?
                new
                {
                    message = "Password reset",
                    success = true
                } :
                new
                {
                    message = "Password not reset",
                    success = false
                };
            return Ok(responseMessage);
        }
        catch (Exception)
        {
            throw;
        }
    }
}