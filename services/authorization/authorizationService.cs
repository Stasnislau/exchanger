using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using database;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;

public class LoginResponseDTO
{
    public string? token { get; set; }
    public string? refreshToken { get; set; }

}

public class AuthorizationService
{

    private readonly ApplicationDbContext _context;

    public AuthorizationService(ApplicationDbContext context)
    {
        _context = context;
    }
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
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );
        return new JwtSecurityTokenHandler().WriteToken(token);

    }

    public async Task<bool> Register(string username, string password, string email)
    {
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
        if (_context.Users.Where(x => x.Username == username || x.Email == email).FirstOrDefault() != null)
        {
            throw new CustomBadRequest("User already exists");
        }
        var user = new User
        {
            Username = username,
            PasswordHash = hashedPassword,
            Email = email
        };

        await _context.Users.AddAsync(user);
        int result = await _context.SaveChangesAsync();

        if (result == 0)
        {
            throw new CustomException("Could not save user", 500);
        }

        return true;
    }

    public async Task<LoginResponseDTO> Login(string username, string password)
    {
        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        {
            throw new CustomBadRequest("Invalid credentials");
        }
        var user = await _context.Users.Where(x => x.Username == username).FirstOrDefaultAsync();
        if (user == null)
        {
            throw new CustomBadRequest("Invalid credentials");
        }
        if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
        {
            throw new CustomBadRequest("Invalid credentials");
        }
        var token = GenerateJWToken(username, user.Id.ToString(), Environment.GetEnvironmentVariable("SECRET_KEY") ?? throw new InvalidOperationException("No secret key found"));
        var refreshToken = GenerateJWToken(username, user.Id.ToString(), Environment.GetEnvironmentVariable("REFRESH_SECRET_KEY") ?? throw new InvalidOperationException("No refresh secret key found"));
        var refreshTokenEntity = new RefreshToken
        {
            Token = refreshToken,
            UserId = user.Id,
            ExpiresAt = DateTime.Now.ToUniversalTime().AddDays(14),
            CreatedAt = DateTime.Now.ToUniversalTime()
        };
        var existingRefreshToken = await _context.RefreshTokens.Where(x => x.UserId == user.Id).FirstOrDefaultAsync();
        if (existingRefreshToken != null)
        {
            user.RefreshToken.Token = refreshToken;
            user.RefreshToken.ExpiresAt = refreshTokenEntity.ExpiresAt;
            user.RefreshToken.CreatedAt = refreshTokenEntity.CreatedAt;
            _context.RefreshTokens.Update(user.RefreshToken);
        }
        else
        {
            await _context.RefreshTokens.AddAsync(refreshTokenEntity);
        }

        int result = await _context.SaveChangesAsync();
        if (result == 0)
        {
            throw new CustomBadRequest("Could not save refresh token");
        }

        return new LoginResponseDTO
        {
            token = token,
            refreshToken = refreshToken
        };
    }



};