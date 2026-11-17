using Microsoft.EntityFrameworkCore;
using Products.Api.Data;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("Products")
    ?? throw new InvalidOperationException("ConnectionStrings:Products is required.");

builder.Services.AddControllers();
builder.Services.AddDbContext<ProductsContext>(options => options.UseSqlite(connectionString));

var app = builder.Build();
app.MapControllers();
app.Run();
