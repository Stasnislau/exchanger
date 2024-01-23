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

    [HttpGet("get")]
    
    public async Task<IActionResult> getRate(string main, string target)
    {
        using HttpClient client = new HttpClient();
        try
        {
            string? api_key = Environment.GetEnvironmentVariable("CURRENCY_BEACON_API_KEY");
            if (api_key == null)
            {
                return BadRequest("API key not found");
            }
            if (!Constants.availableCurrencies.Contains(main))
            {
                return BadRequest("Main currency not found");
            }
            if (!Constants.availableCurrencies.Contains(target))
            {
                return BadRequest("Target currency not found");
            }
            Console.WriteLine($"main: {main}, target: {target}, api_key: {api_key}");
            string url = $"https://api.exchangeratesapi.io/latest?base={main}&access_key={api_key}";
            HttpResponseMessage response = await client.GetAsync(url); 
            string responseBody = await response.Content.ReadAsStringAsync();
            // if (response.success == false)
            // {
            //     return BadRequest("API call failed", response.error);
            // }
            return Ok(responseBody);
        }
        catch (HttpRequestException e)
        {
            return BadRequest(e.Message);
        }
    }
}