using Auth0.AspNetCore.Authentication;
using CSI_Brady.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
if(builder.Environment.IsDevelopment())
{
    builder.Configuration.AddJsonFile("./secrets.json");
}

builder.Services.AddAuth0WebAppAuthentication(options => {
    options.Domain = builder.Configuration["Auth0Domain"] ?? "";
    options.ClientId = builder.Configuration["Auth0ClientId"] ?? "";
});

builder.Services.AddControllersWithViews();

builder.Services.AddHostedService<FastAPIService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();
app.UseRouting();

if(app.Environment.IsDevelopment())
{
    /*
        **IMPORTANT**
        -Must only be used in development
        -This is exists to allow Auth0 to work locally
    */
    app.UseSameSiteNoneMiddleware();
}

app.MapControllers();

app.Run();
