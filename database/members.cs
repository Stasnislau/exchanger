namespace database
{
    public class User
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string PasswordHash { get; set; }
        public required string Email { get; set; }

        public int RefreshTokenId { get; set; }

        public string? favorite_currency { get; set; }
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
        public int Value { get; set; }

        public required string base_currency { get; set; }

        public required string target_currency { get; set; }

        public int? amount { get; set; }

        public int? result { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation property
        public required User User { get; set; }
    }
}

