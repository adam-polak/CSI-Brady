using CSI_Brady.Middleware;
using CSI_Brady.Util.Auth0;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
if(builder.Environment.IsDevelopment())
{
    builder.Configuration.AddJsonFile("./secrets.json");
}

string domain = $"https://{builder.Configuration["Auth0:Domain"]}/";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => 
    {
        options.Authority = domain;
        options.Audience = builder.Configuration["Auth0:Audience"];
        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = ClaimTypes.NameIdentifier
        };
    });

/*
    * from https://auth0.com/docs/quickstart/backend/aspnet-core-webapi
    
    -To add policy follow format below
*/
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("loggedin", policy => policy.Requirements.Add(
        new HasScopeRequirement("loggedin", domain)));
});

builder.Services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

builder.Services.AddControllersWithViews();

builder.Services.AddHostedService<FastAPIService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
} else {
    /*
        **IMPORTANT**
        -Must only be used in development
        -This is exists to allow Auth0 to work locally
    */
    app.UseSameSiteNoneMiddleware();
}

app.UseAuthentication();

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
