using CSI_Brady.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CSI_Brady.Controllers;

[Route("facilityapi")]
public class FacilityController : ControllerBase
{
    private ILogger<FacilityController> _logger;
    private DataAccess.Controllers.FacilityController _facilityController;

    public FacilityController(ILogger<FacilityController> logger, IHostEnvironment env)
    {
        _logger = logger;
        _facilityController = new DataAccess.Controllers.FacilityController(env);
    }

    [HttpGet("facilities")]
    public async Task<IActionResult> GetFacilities()
    {
        FacilityModel[] facilities = (await _facilityController.GetFacilities()).ToArray();

        string json = JsonConvert.SerializeObject(facilities);

        return Ok(json);
    }

    [HttpGet("facility/{facilityId}")]
    public async Task<IActionResult> GetFacility(int facilityId)
    {
        FacilityModel facility = await _facilityController.GetFacility(facilityId);

        string json = JsonConvert.SerializeObject(facility);

        return Ok(json);
    }

    [HttpGet("areas/{facilityId}")]
    public async Task<IActionResult> GetFacilityAreas(int facilityId)
    {
        AreaModel[] areas = (await _facilityController.GetAreas(facilityId)).ToArray();

        string json = JsonConvert.SerializeObject(areas);

        return Ok(json);
    }
}