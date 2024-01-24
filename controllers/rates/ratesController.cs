using System;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]

public class RatesController(RatesService ratesService) : ControllerBase
{
    private static readonly Random _random = new();
    private readonly RatesService _ratesService = ratesService;

    private decimal GenerateRandomRate()
    {
        return (decimal)_random.NextDouble() * (1.5M - 0.5M) + 0.5M;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok("please order a currency");
    }

    [HttpGet("get")]

    public async Task<IActionResult> GetRate(string main, string target)
    {
        try
        {
            var response = await _ratesService.GetCurrentRate(main, target);
            return Ok(response);
        }
        catch (HttpRequestException e)
        {
            return HandleError(e);
        }
    }
    private IActionResult HandleError(Exception e)
    {
        Console.WriteLine("LETIT TUT");
        return StatusCode(500, new
        {
            error = e.Message
        });
    }
}