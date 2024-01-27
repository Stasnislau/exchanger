using System;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]

public class RatesController(RatesService ratesService) : ControllerBase
{
    private readonly RatesService _ratesService = ratesService;

    [HttpGet]
    public IActionResult Get()
    {
        return Ok("please order a currency");
    }

    [HttpGet("get")]

    public async Task<IActionResult> GetRate(string main, string target)
    {
        var response = await _ratesService.GetCurrentRate(main, target);
        return Ok(response);
    }
}