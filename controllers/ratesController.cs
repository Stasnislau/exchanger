using System;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]

public class RatesController : ControllerBase
{
    private static readonly Random random = new();

    private decimal generateRandomRate()
    {
        return (decimal)random.NextDouble() * (1.5M - 0.5M) + 0.5M;
    }

    [HttpGet]
    public IActionResult get()
    {
        return Ok("please order a currency");
    }

    [HttpGet("{currency1}/{currency2}")]
    
    public async Task<IActionResult> greet(string currency1, string currency2)
    {
        using HttpClient client = new HttpClient();
        try
        {
            string? api_key = Environment.GetEnvironmentVariable("CURRENCY_BEACON_API_KEY");
            if (api_key == null)
            {
                return BadRequest("API key not found");
            }
            string url = $"https://api.exchangeratesapi.io/latest?base={currency1}?api_key={api_key}";
            HttpResponseMessage response = await client.GetAsync(url);
            string responseBody = await response.Content.ReadAsStringAsync();
            return Ok("SUCCESS");


        }
        catch (HttpRequestException e)
        {
            return BadRequest(e.Message);
        }
    }
}