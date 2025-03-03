using CSI_Brady.DataAccess.Models;
using CSI_Brady.DataAccess.Util;
using Microsoft.AspNetCore.Authentication.OAuth.Claims;

namespace CSI_Brady.DataAccess.Controllers;

public class ImageController : DbController
{
    public ImageController(IHostEnvironment env) : base(env)
    {
    }

    /*
   Returns unique image id
*/
    public async Task<int> CreateImage(int areaId, int userId)
    {
        int id = await GenerateRandomId();
        string date = DateTime.Now.ToShortDateString();
        string sql = "INSERT INTO image (id, date, areaid, userid)"
                    + " VALUES (@id, @date, @area, @user);";
        object[] parameters = { new { id = id, date = date, area = areaId, user = userId } };

        await DoCommandAsync(sql, parameters);

        return id;
    }

    private async Task<int> GenerateRandomId()
    {
        Random rnd = new Random();
        
        int id = rnd.Next(0, 999999999);
        while(await ContainsId(id))
        {
            id = rnd.Next(0, 999999999);
        }

        return id;
    }

    public async Task<bool> ContainsId(int id)
    {
        string sql = "SELECT * FROM IMAGE WHERE id=@id;";
        object obj = new { id = id };

        return (await DoQueryAsync<ImageModel>(sql, obj)).Count != 0;
    }

    public async Task AddProductToImage(int imgId, int productId)
    {
        string sql = "INSERT INTO image_to_product (imageid, productid)"
                    + " VALUES (@img, @product);";
        object[] parameters = { new { img = imgId, product = productId } };

        await DoCommandAsync(sql, parameters);
    }

    public async Task RemoveProductFromImage(int imageId, int productId)
    {
        string sql = "DELETE FROM image_to_product WHERE imageid = @img AND productid = @prod;";
        object[] parameters = { new { img = imageId, prod = productId } };

        await DoCommandAsync(sql, parameters);
    }

    public async Task AddViolationToImage(int imgId, int violationId)
    {
        string sql = "INSERT INTO image_to_violations (imageid, violationid)"
                    + " VALUES (@img, @vio);";
        object[] parameters = { new { img = imgId, vio = violationId } };

        await DoCommandAsync(sql, parameters);
    }

    public async Task<List<ViolationModel>> GetViolationsForImage(int imageId)
    {
        string sql = "SELECT violation.Name, violation.Summary, violation.Link FROM image_to_violations"
                    + " JOIN violation ON image_to_violations.violationid = violation.id"
                    + " WHERE image_to_violations.imageid = @id;";
        object obj = new { id = imageId };

        return await DoQueryAsync<ViolationModel>(sql, obj);
    }

    public async Task<List<ProductModel>> GetProductsForImage(int imageId)
    {
        string sql = "SELECT product.Id, product.Name, product.Link, product.ImgSrc FROM image_to_product"
                    + " JOIN product ON image_to_product.productid = product.id"
                    + " WHERE image_to_product.imageid = @id;";
        object obj = new { id = imageId };

        return await DoQueryAsync<ProductModel>(sql, obj);
    }

    public async Task<List<int>> GetProductIdsForImage(int imageId)
    {
        string sql = "SELECT product.Id FROM image_to_product"
                    + " JOIN product ON image_to_product.productid = product.id"
                    + " WHERE image_to_product.imageid = @id;";
        object obj = new { id = imageId };

        return await DoQueryAsync<int>(sql, obj);
    }
}