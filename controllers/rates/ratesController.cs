using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
        try
        {
            var response = await _ratesService.GetCurrentRate(main, target);

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