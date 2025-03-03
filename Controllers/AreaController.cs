using CSI_Brady.DataAccess.Controllers;
using CSI_Brady.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.ObjectPool;
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

    [HttpPost("note/{areaId}/{productId}")]
    public async Task<IActionResult> AddNoteToProduct(int areaId, int productId)
    {
        string note = await new StreamReader(Request.Body).ReadToEndAsync();

        await _areaController.UpdateProductNote(areaId, productId, note);

        return Ok();
    }

    [HttpPost("setproducts/{areaId}")]
    public async Task<IActionResult> AddProducts(int areaId)
    {
        string json = await new StreamReader(Request.Body).ReadToEndAsync();

        List<int>? productIds = JsonConvert.DeserializeObject<List<int>>(json);
        if(productIds == null) {
            return BadRequest();
        }

        List<int> addedProducts = await _areaController.GetProductIds(areaId);

        for(int i = 0; i < productIds.Count; i++)
        {
            if(addedProducts.Contains(productIds.ElementAt(i))) continue;

            await _areaController.AddProductToArea(areaId, productIds.ElementAt(i));
        }

        return Ok();
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