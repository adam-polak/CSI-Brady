using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
if(builder.Environment.IsDevelopment())
{
    builder.Configuration.AddJsonFile("./secrets.json");
}

builder.Services.AddControllersWithViews();

builder.Services.AddHostedService<FastAPIService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.MapControllers();

app.Run();
