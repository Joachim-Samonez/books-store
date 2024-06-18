using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string connString;
if (builder.Environment.IsDevelopment())
{
    connString = builder.Configuration.GetConnectionString("DefaultConnection");
}
else
{
    var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

    if (connUrl != null && connUrl.StartsWith("postgres://"))
    {
        connUrl = connUrl.Replace("postgres://", string.Empty);

        var pgUserPass = connUrl.Split('@')[0];
        var pgHostPortDb = connUrl.Split('@')[1];
        var pgHostPort = pgHostPortDb.Split('/')[0];
        var pgDb = pgHostPortDb.Split('/')[1];
        var pgUser = pgUserPass.Split(':')[0];
        var pgPass = pgUserPass.Split(':')[1];
        var pgHost = pgHostPort.Split(':')[0];
        var pgPort = pgHostPort.Contains(":") ? pgHostPort.Split(':')[1] : "5432"; // Default PostgreSQL port is 5432

        connString = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
    }
    else
    {
        throw new InvalidOperationException("DATABASE_URL environment variable is not set or is not in the correct format.");
    }
}

builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseNpgsql(connString);
});

builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseNpgsql(connString);
});



builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.MapFallbackToController("Index", "Fallback");

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    context.Database.Migrate();
    DbInitializer.Initialize(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "A problem has occured during migration");
}

app.Run();
