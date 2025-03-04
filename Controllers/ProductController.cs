using CSI_Brady.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CSI_Brady.Controllers;

[Route("productapi")]
public class ProductController : ControllerBase
{
    private ILogger<ProductController> _logger;
    private DataAccess.Controllers.ProductController _productController;
    private DataAccess.Controllers.AreaController _areaController;

    public ProductController(ILogger<ProductController> logger, IHostEnvironment env)
    {
        _logger = logger;
        _productController = new DataAccess.Controllers.ProductController(env);
        _areaController = new DataAccess.Controllers.AreaController(env);
    }

    [HttpGet("products")]
    public async Task<IActionResult> GetAllProducts()
    {
        List<ProductModel> products = await _productController.GetAllProducts();

        string json = JsonConvert.SerializeObject(products);

        return Ok(json);
    }

    [HttpPost("increment/{areaId}/{productId}")]
    public async Task<IActionResult> IncrementQuantity(int areaId, int productId)
    {
        await _areaController.AddToProductCount(areaId, productId, 1);
        return Ok();
    }

    [HttpPost("decrement/{areaId}/{productId}")]
    public async Task<IActionResult> DecrementQuantity(int areaId, int productId)
    {
        await _areaController.AddToProductCount(areaId, productId, -1);
        return Ok();
    }
}