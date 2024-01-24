
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

public class RatesService
{
    private readonly string _sampleJsonFilePath = "../../mock.json"; // TODO delete this
    public async Task<decimal> GetCurrentRate(string main, string target)
    {
        using HttpClient client = new();
        string? api_key = Environment.GetEnvironmentVariable("CURRENCY_BEACON_API_KEY") ?? throw new Exception("API key not found");
        if (api_key == null)
        {
            throw new Exception("API key not found");
        }
        if (!Constants.availableCurrencies.Contains(main))
        {
            throw new Exception("Main currency not found");
        }
        if (!Constants.availableCurrencies.Contains(target))
        {
            throw new Exception("Target currency not found");
        }
        using StreamReader reader = new(_sampleJsonFilePath); // TODO delete this
        var json = reader.ReadToEnd(); // TODO delete this
        var jarray = JArray.Parse(json); // TODO delete this
        // Console.WriteLine($"main: {main}, target: {target}, api_key: {api_key}");
        // string url = $"https://api.exchangeratesapi.io/latest?base={main}&access_key={api_key}";
        // HttpResponseMessage response = await client.GetAsync(url);
        // string responseBody = await response.Content.ReadAsStringAsync();
        // if (response.success == false)
        // {
        //     return BadRequest("API call failed", response.error);
        // }
        var result = JObject.Parse(responseBody);


        // check if result.success is false
        Console.WriteLine(result["success"]);
        // if (result.Value<bool>("success") == false)
        // {
        //     throw new Exception("API call failed");
        // }
        Console.WriteLine(result);
        // var rate = result["rates"];
        // if (rate == null)
        // {
        //     throw new Exception("Currency rate not found");
        // }
        return result.Value<decimal>("rate");
    }
}