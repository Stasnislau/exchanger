using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddScoped<RatesService>();
builder.Services.AddScoped<AuthorizationService>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(x =>
    {
        x.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "*",
            ValidAudience = "*",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("SECRET_KEY") ?? throw new InvalidOperationException("No secret key found")))
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();
DotNetEnv.Env.Load();


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UseMiddleware<ExceptionMiddleware>();
app.Run();

