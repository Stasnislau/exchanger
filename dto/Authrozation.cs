public class LoginDTO
{
    public required string username { get; set; }
    public required string password { get; set; }
}

public class RegisterDTO
{
    public required string username { get; set; }
    public required string password { get; set; }
    public required string email { get; set; }
}

public class ForgotPasswordDTO
{
    public required string email { get; set; }
    public required string username { get; set; }
    public required string newPassword { get; set; }
}
