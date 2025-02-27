using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CSI_Brady.Controllers;

[Route("facilityapi")]
public class FacilityController : ControllerBase
{
    [HttpGet("{id}")]
    public IActionResult GetFacility(int id)
    {
        string address;
        switch(id) {
            case 1:
                address = "9123 Good Road";
                break;
            case 2:
                address = "4213 Bad Road";
                break;
            case 3:
                address = "8543 Spectacular Road, Milwaukee, WI 53534";
                break;
            default:
                address = "Not found";
                break;
        }

        object facility = new 
        { 
            Id = id, 
            Address = address, 
            CompanyName = "Quad",
            CompanyImgLink = "https://static.stocktitan.net/company-logo/quad-lg.webp"
        };

        return Ok(JsonConvert.SerializeObject(facility));
    }
}