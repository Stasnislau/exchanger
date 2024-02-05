namespace database
{
    public class User
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string PasswordHash { get; set; }
        public required string Email { get; set; }

        public int RefreshTokenId { get; set; }

        public string? favoriteCurrency { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation property
        public List<Rate>? Rates { get; set; }
        public RefreshToken? RefreshToken { get; set; }
    }

    public class RefreshToken
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public required string Token { get; set; }
        public DateTime ExpiresAt { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation property
        public User? User { get; set; }
    }

    public class Rate
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal Value { get; set; }

        public required string BaseCurrency { get; set; }

        public required string TargetCurrency { get; set; }

        public decimal? Amount { get; set; }

        public decimal? Result { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation property
        public User? User { get; set; }
    }
}

