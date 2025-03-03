using CSI_Brady.DataAccess.Controllers;
using CSI_Brady.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CSI_Brady.Controllers;

[Route("areaapi")]
public class AreaController : ControllerBase
{
    private ILogger<AreaController> _logger;
    private DataAccess.Controllers.AreaController _areaController;
    private ViolationController _violationController;

    public AreaController(ILogger<AreaController> logger, IHostEnvironment env)
    {
        _logger = logger;
        _areaController = new DataAccess.Controllers.AreaController(env);
        _violationController = new ViolationController(env);
    }

    [HttpGet("products/{areaId}")]
    public async Task<IActionResult> GetProducts(int areaId)
    {
        _logger.Log(LogLevel.Information, "Retrieving products from database");
        List<AreaProductModel> productList = await _areaController.GetProducts(areaId);
        _logger.Log(LogLevel.Information, "Successfully retrieved products");

        string json = JsonConvert.SerializeObject(productList);

        return Ok(json);
    }

    private class ProductWebModel
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
        public required string Link { get; set; }
        public required string ImgSrc { get; set; }
        public required ViolationModel[] Violations { get; set; }
    }
}