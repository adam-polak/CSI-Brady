using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CSI_Brady.Controllers;

public class AccountController : ControllerBase
{
    [HttpGet("profile")]
    [Authorize("loggedin")]
    public IActionResult Profile()
    {
        return Ok();
    }
}