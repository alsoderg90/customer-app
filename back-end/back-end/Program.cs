using Microsoft.EntityFrameworkCore;
using back_end.Models;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddDbContext<CustomerContext>(opt => opt.UseInMemoryDatabase("CustomerList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var CorsPolicy = "devCorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, builder => {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors(CorsPolicy);

app.MapGet("/", () => "Hello World!");

app.MapGet("/api/customers", async (CustomerContext db) =>
    await db.Customers.Include(x => x.Address).ToListAsync());

app.MapGet("/api/addresses", async (CustomerContext db) =>
    await db.Addresses.ToListAsync());

app.MapGet("/api/customers/{id}", async (int id, CustomerContext db) =>
    await db.Customers.FindAsync(id)
        is Customer customer
            ? Results.Ok(customer)
            : Results.NotFound());

app.MapPost("/api/customers", async (Customer customer, CustomerContext db) =>
    {
        System.Console.WriteLine(customer);
        db.Customers.Add(customer);
        await db.SaveChangesAsync();

        return Results.Created($"/customers/{customer.Id}", customer);
    }) ;

app.MapDelete("/api/customers/{id}", async (int id, CustomerContext db) =>
    {
        if (await db.Customers.FindAsync(id) is Customer customer)
        {
            db.Customers.Remove(customer);
            await db.SaveChangesAsync();
            if (await db.Addresses.FindAsync(id) is Address address)
            {
                db.Addresses.Remove(address);
                await db.SaveChangesAsync();
            }
            return Results.Ok(customer);
        }
    return Results.NotFound();
});

app.Run();
