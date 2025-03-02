using CSI_Brady.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CSI_Brady.Controllers;

[Route("productapi")]
public class ProductController : ControllerBase
{
    private ILogger<ProductController> _logger;
    private DataAccess.Controllers.ProductController _productController;

    public ProductController(ILogger<ProductController> logger, IHostEnvironment env)
    {
        _logger = logger;
        _productController = new DataAccess.Controllers.ProductController(env);
    }

    [HttpGet("products")]
    public async Task<IActionResult> GetAllProducts()
    {
        List<ProductModel> products = await _productController.GetAllProducts();

        string json = JsonConvert.SerializeObject(products);

        return Ok(json);
    }
}