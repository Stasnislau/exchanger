using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
[Authorize]
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

    [HttpPost("save")]
    [Authorize]
    public async Task<IActionResult> SaveRate([FromBody]string main,[FromBody] string target,[FromBody] decimal value,[FromBody] decimal? amount = null,[FromBody] decimal? result = null)
    {
        try
        {
            bool response = await _ratesService.SaveRate(main, target, value, amount, result);
            string jsonString = JsonConvert.SerializeObject(response ?
                new
                {
                    message = "Rate saved",
                    success = true
                } :
                new
                {
                    message = "Rate not saved",
                    success = false
                });
            return new ContentResult
            {
                Content = jsonString,
                ContentType = "application/json",
                StatusCode = 200
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error", ex.Message);
            throw;
        }
    }

    [HttpGet("history")]
    [Authorize]
    public async Task<IActionResult> GetHistory()
    {
        try
        {
            var response = await _ratesService.GetHistory();
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

    [HttpDelete("delete")]
    [Authorize]
    public async Task<IActionResult> DeleteRate(int id)
    {
        try
        {
            bool response = await _ratesService.DeleteRate(id);
            string jsonString = JsonConvert.SerializeObject(response ?
                new
                {
                    message = "Rate deleted",
                    success = true
                } :
                new
                {
                    message = "Rate not deleted",
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