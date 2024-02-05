using System.Security.Claims;
using System.Text.Json.Serialization;
using database;
using Newtonsoft.Json;
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

public struct RatesResponse
{
    public string mainCurrency;
    public string targetCurrency;
    public decimal rate;
    public string date;

}
public class RatesService
{
    private readonly ApplicationDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public RatesService(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }
    public async Task<RatesResponse> GetCurrentRate(string main, string target)
    {
        using HttpClient client = new();
        string? api_key = Environment.GetEnvironmentVariable("CURRENCY_BEACON_API_KEY") ?? throw new Exception("API key not found");
        if (api_key == null)
        {
            throw new CustomBadRequest("API key not found");
        }
        if (!Constants.availableCurrencies.Contains(main))
        {
            throw new CustomBadRequest("Main currency not found");
        }
        if (!Constants.availableCurrencies.Contains(target))
        {
            throw new CustomBadRequest("Target currency not found");
        }
        string url = $"https://api.currencybeacon.com/v1/latest?api_key={api_key}&base={main}";
        HttpResponseMessage response = await client.GetAsync(url);
        var incoming = new IResponseBody();
        incoming = JsonConvert.DeserializeObject<IResponseBody>(response.Content.ReadAsStringAsync().Result);
        if (incoming.response.Rates.Count == 0)
        {
            throw new Exception("No rates found");
        }
        decimal rate = incoming.response.Rates[target.ToUpper()];
        string date = incoming.response.date;
        return new RatesResponse
        {
            mainCurrency = main,
            targetCurrency = target,
            rate = rate,
            date = date
        };
    }

    public async Task<bool> SaveRate(string main, string target, decimal value, decimal? amount = null, decimal? result = null)
    {
        var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        var rate = new Rate
        {
            UserId = int.Parse(userId),
            User = _context.Users.Where(x => x.Id == int.Parse(userId)).FirstOrDefault() ?? throw new CustomBadRequest("User not found"),
            Value = value,
            BaseCurrency = main,
            TargetCurrency = target,
            Amount = amount,
            Result = result,
            CreatedAt = DateTime.UtcNow
        };
        await _context.Rates.AddAsync(rate);
        int success = await _context.SaveChangesAsync();
        if (success == 0)
        {
            throw new CustomBadRequest("Could not save rate");
        }
        return true;
    }
}
