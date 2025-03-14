using CSI_Brady.DataAccess.Models;
using CSI_Brady.DataAccess.Util;

namespace CSI_Brady.DataAccess.Controllers;

public class ProductController : DbController
{
    public ProductController(IHostEnvironment env) : base(env)
    {
    }

    public async Task CreateProduct(string name, string link, string imgSrc)
    {
        string sql = "INSERT INTO product (name, link, imgsrc)"
                    + " VALUES (@name, @link, @img);";
        object[] parameters = { new { name = name, link = link, img = imgSrc } };

        await DoCommandAsync(sql, parameters);
    }

    public async Task<List<ProductModel>> GetAllProducts()
    {
        string sql = "SELECT * FROM product;";

        return await DoQueryAsync<ProductModel>(sql);
    }

    public async Task<List<int>> GetProductIdsFromViolation(int violationId)
    {
        string sql = "SELECT productid"
            + " FROM product_to_violation"
            + " WHERE violationid = @id;";
        object obj = new { id = violationId };
        
        return await DoQueryAsync<int>(sql, obj);
    }

    public async Task<List<ImageModel>> GetImages(int productId)
    {
        string sql = "SELECT image.id, image.date, image.areaid, image.userid FROM image_to_product"
                    + " JOIN image_to_product.imageid = image.id"
                    + " WHERE image_to_product.productid = @id;";
        object obj = new { id = productId };

        return await DoQueryAsync<ImageModel>(sql, obj);
    }
}