public class RateDTO
{
    public required string main { get; set; }
    public required string target { get; set; }
    public required decimal value { get; set; }
    public decimal? amount { get; set; }
    public decimal? result { get; set; }
}