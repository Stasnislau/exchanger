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
            return Ok(response);

        }
        catch (Exception)
        {
            throw;
        }
    }

    [HttpPost("save")]
    [Authorize]
    public async Task<IActionResult> SaveRate([FromBody] RateDTO dto)
    {
        try
        {
            bool response = await _ratesService.SaveRate(dto.main, dto.target, dto.value, dto.amount, dto.result);
            var responseMessage = response ?
                new
                {
                    message = "Rate saved",
                    success = true
                } :
                new
                {
                    message = "Rate not saved",
                    success = false
                };
            return Ok(responseMessage);
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
            if (response.Count == 0)
            {
                return NoContent();
            }
            else
            {
                return Ok(response);
            }
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
            var responseMessage = response ?
                new
                {
                    message = "Rate deleted",
                    success = true
                } :
                new
                {
                    message = "Rate not deleted",
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