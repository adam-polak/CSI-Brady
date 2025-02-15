using Microsoft.AspNetCore.Mvc;

namespace CSI_Brady.Controllers;

public class AccountController : ControllerBase
{
    [HttpGet("profile")]
    public IActionResult Profile()
    {
        return Ok();
    }
}