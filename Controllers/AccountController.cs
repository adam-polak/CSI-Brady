using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CSI_Brady.Controllers;

public class AccountController : ControllerBase
{
    [Authorize]
    public IActionResult Profile()
    {
        return Ok(JsonConvert.SerializeObject(new {
            Name = User.Identity?.Name,
            EmailAddress = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value
        }));
    }
}