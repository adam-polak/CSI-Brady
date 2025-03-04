using CSI_Brady.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CSI_Brady.Controllers;

[Route("facilityapi")]
public class FacilityController : ControllerBase
{
    private ILogger<FacilityController> _logger;
    private DataAccess.Controllers.FacilityController _facilityController;
    private DataAccess.Controllers.AreaController _areaController;

    public FacilityController(ILogger<FacilityController> logger, IHostEnvironment env)
    {
        _logger = logger;
        _facilityController = new DataAccess.Controllers.FacilityController(env);
        _areaController = new DataAccess.Controllers.AreaController(env);
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
        
        List<AreaWebModel> areaWebModels = [];
        for(int i = 0; i < areas.Length; i++)
        {
            AreaWebModel model = new AreaWebModel()
            {
                Id = areas[i].Id,
                Code = areas[i].Code,
                ViolationCount = areas[i].ViolationCount,
                ProductCount = (await _areaController.GetProductIds(areas[i].Id)).Count
            };

            areaWebModels.Add(model);
        }
        string json = JsonConvert.SerializeObject(areaWebModels);

        return Ok(json);
    }

    public class AreaWebModel
    {
        public required int Id { get; set; }
        public required string Code { get; set; }
        public required int ViolationCount { get; set; }
        public required int ProductCount { get; set; }
    }
}