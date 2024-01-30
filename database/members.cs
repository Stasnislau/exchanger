namespace database
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }

        public int RefreshTokenId { get; set; }

        public string favorite_currency { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation property
        public List<Rate> Rates { get; set; }
        public RefreshToken RefreshToken { get; set; }
    }

    public class RefreshToken
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Token { get; set; }
        public DateTime ExpiresAt { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation property
        public User User { get; set; }
    }

    public class Rate
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Value { get; set; }

        public string base_currency { get; set; }

        public string target_currency { get; set; }

        public int? amount { get; set; }

        public int? result { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation property
        public User User { get; set; }
    }
}

