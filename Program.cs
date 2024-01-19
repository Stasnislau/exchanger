var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();
DotNetEnv.Env.Load();

app.MapGet("/", () => "Hello World!");

app.MapControllers();
app.Run();

