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
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthorizationService(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
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
            expires: DateTime.UtcNow.AddHours(30), // TODO: Change to 30 minutes in production, this is for testing
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

    public async Task<bool> Logout()
    {
        var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        var refreshToken = await _context.RefreshTokens.Where(x => x.UserId.ToString() == userId).FirstOrDefaultAsync();
        if (refreshToken == null)
        {
            throw new CustomBadRequest("User is not logged in");
        }
        _context.RefreshTokens.Remove(refreshToken);
        int result = await _context.SaveChangesAsync();
        if (result == 0)
        {
            throw new CustomException("Could not remove refresh token", 500);
        }
        return true;
    }

    public async Task<LoginResponseDTO> Refresh(string refreshToken)
    {
        if (string.IsNullOrEmpty(refreshToken))
        {
            throw new CustomBadRequest("Invalid refresh token");
        }
        var handler = new JwtSecurityTokenHandler();
        var jsonToken = handler.ReadToken(refreshToken) as JwtSecurityToken;
        int userId = int.Parse(jsonToken.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value);
        var user = await _context.Users.Where(x => x.Id == userId).FirstOrDefaultAsync();
        if (user == null)
        {
            throw new CustomBadRequest("Invalid refresh token");
        }
        var token = GenerateJWToken(user.Username, user.Id.ToString(), Environment.GetEnvironmentVariable("SECRET_KEY") ?? throw new InvalidOperationException("No secret key found"));
        var newRefreshToken = GenerateJWToken(user.Username, user.Id.ToString(), Environment.GetEnvironmentVariable("REFRESH_SECRET_KEY") ?? throw new InvalidOperationException("No refresh secret key found"));
        var refreshTokenEntity = new RefreshToken
        {
            Token = newRefreshToken,
            UserId = user.Id,
            ExpiresAt = DateTime.Now.ToUniversalTime().AddDays(14),
            CreatedAt = DateTime.Now.ToUniversalTime()
        };
        var existingRefreshToken = await _context.RefreshTokens.Where(x => x.UserId == user.Id).FirstOrDefaultAsync();
        if (existingRefreshToken != null)
        {
            user.RefreshToken.Token = newRefreshToken;
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
            refreshToken = newRefreshToken
        };
    }

};