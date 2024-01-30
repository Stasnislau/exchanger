using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public class LoginResponseDTO
{
    public string token { get; set; }
    public string refreshToken { get; set; }

}

public class AuthorizationService
{
    private string GenerateJWToken(string username, string userID, string secret)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.NameIdentifier, userID)

        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

        var token = new JwtSecurityToken(
            issuer: "*",
            audience: "*",
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    // public async Task<LoginResponseDTO> Login(string username, string password)
    // {
        // check the credentials in the database

        // var token = GenerateJWToken(user.Username, user.Id.ToString(), Environment.GetEnvironmentVariable("SECRET_KEY") ?? throw new InvalidOperationException("No secret key found"));

        // return new LoginResponseDTO
        // {
        //     Token = token
        // };
    // }

};