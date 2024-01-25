
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

public record struct IResponseBody
{
    public struct Meta
    {
        public int Code;
        public string? disclaimer;
        public string? error_type;
        public string? error_detail;
    }

    public struct Response
    {
        public string date;
        [JsonPropertyName("base")]
        public Dictionary<string, decimal> Rates;
    }

    public Meta meta;
    public Response response;
}
public class RatesService
{
    private readonly string _sampleJsonFilePath = "mock.json"; // TODO delete this
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
        // string url = $"https://api.currencybeacon.com/v1/latest?api_key={api_key}&base={main}";
        // HttpResponseMessage response = await client.GetAsync(url);
        // if (response.IsSuccessStatusCode)
        // {
        //     string responseBody = await response.Content.ReadAsStringAsync();
        //     JObject json = JObject.Parse(responseBody);
        //     decimal rates = (decimal)json["rates"][target];
        //     return rate;
        // }
        // else
        // {
        //     throw new Exception("API call failed");
        // }
        var incoming = new IResponseBody();
        using StreamReader r = new(_sampleJsonFilePath);
        string json = await r.ReadToEndAsync();
        incoming = JsonConvert.DeserializeObject<IResponseBody>(json);
        if (incoming.response.Rates.Count == 0)
        {
            throw new Exception("No rates found");
        }
        decimal rate = incoming.response.Rates[target.ToUpper()];
        return rate;
    }
}