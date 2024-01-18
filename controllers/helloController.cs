using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class HelloController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Hello, World!");
    }

    [HttpGet("greet/{name}")]
    public IActionResult Greet(string name)
    {
        return Ok($"Hello, {name}!");
    }
}