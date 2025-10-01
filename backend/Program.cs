using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using backend.Data;
using backend.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Add CORS to let frfontend talk
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
// Change the backend URL
builder.WebHost.UseUrls("http://localhost:5001");

// add pgsql to services
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(Environment.GetEnvironmentVariable("PG_CONNECTION")));

var app = builder.Build();
app.UseCors();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    try
    {
        db.Database.CanConnect();
        Console.WriteLine("✅ Connected to MySQL successfully!");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"❌ Database connection failed: {ex.Message}");
    }
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/", () => "Server is running!");

app.MapGet("/api/tasks", (AppDbContext db) => db.Tasks.ToListAsync());

// Add a new task
app.MapPost("/api/tasks", async (AppDbContext db, TodoItem task) =>
{
    db.Tasks.Add(task);
    await db.SaveChangesAsync();
    return Results.Created($"/api/tasks/{task.Id}", task);
});

// Delete task using ID
app.MapDelete("/api/tasks/{id}", async (AppDbContext db, string id) =>
{
    var toBeDeleted = await db.Tasks.FindAsync(id);
    if (toBeDeleted == null) return Results.NotFound();

    db.Tasks.Remove(toBeDeleted);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

// Updating a task based on ID
app.MapPut("/api/tasks/{id}", async (AppDbContext db, string id, TodoItem updatedTask) =>
{
    var toBeUpdated = await db.Tasks.FindAsync(id);
    if (toBeUpdated == null) return Results.NotFound();

    toBeUpdated.Title = updatedTask.Title;
    toBeUpdated.IsComplete = updatedTask.IsComplete;

    await db.SaveChangesAsync();
    return Results.Ok(toBeUpdated);
});

app.Run();
