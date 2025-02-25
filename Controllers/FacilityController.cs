using Microsoft.AspNetCore.Mvc;

namespace CSI_Brady.Controllers;

[Route("facility")]
public class FacilityController : ControllerBase
{
    [HttpGet("test/{id}")]
    public IActionResult TestRoute(int id)
    {
        return Ok(id);
    }
}