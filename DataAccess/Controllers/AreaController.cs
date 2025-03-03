using CSI_Brady.DataAccess.Models;
using CSI_Brady.DataAccess.Util;

namespace CSI_Brady.DataAccess.Controllers;

public class AreaController : DbController
{
    public AreaController(IHostEnvironment env) : base(env)
    {
    }

    public async Task<List<AreaProductModel>> GetProducts(int areaId)
    {
        string sql = "SELECT product.id, product.name, product.link, product.imgsrc, area_to_product.count, area_to_product.note"
                    + " FROM area_to_product"
                    + " JOIN product"
                    + " ON area_to_product.productid = product.id"
                    + " WHERE area_to_product.areaid = @id;";
        object obj = new { id = areaId };

        return await DoQueryAsync<AreaProductModel>(sql, obj);
    }

    public async Task<List<int>> GetProductIds(int areaId)
    {
        string sql = "SELECT product.id FROM area_to_product"
                    + " JOIN product ON area_to_product.productid = product.id"
                    + " WHERE area_to_product.areaid = @id;";
        object obj = new { id = areaId };

        return await DoQueryAsync<int>(sql, obj);
    }

    public async Task<List<ImageTakenByModel>> GetImages(int productId)
    {
        string sql = "SELECT  image.id, image.date, user_table.firstname, user_table.lastname FROM image_to_product"
                    + " JOIN image ON image_to_product.imageid = image.id"
                    + " JOIN user_table ON image.userid = user_table.id"
                    + " WHERE image_to_product.productid = @id;";
        object obj = new { id = productId };

        return await DoQueryAsync<ImageTakenByModel>(sql, obj);
    }

    public async Task AddToViolationCount(int areaId, int amt)
    {
        string sql = $"UPDATE area SET violationcount = violationcount + @amt WHERE id = @id;";
        object[] obj = { new { id = areaId, amt = amt } };

        await DoCommandAsync(sql, obj);
    }

    public async Task AddProductToArea(int areaId, int productId)
    {
        string sql = "INSERT INTO area_to_product (areaid, productid)"
                    + " VALUES (@area, @product);";
        object[] parameters = { new { area = areaId, product = productId } };

        await DoCommandAsync(sql, parameters);
    }

    public async Task AddToProductCount(int areaId, int productId, int amt)
    {
        string sql = "UPDATE area_to_product SET count = count + @amt"
                    + " WHERE areaid = @aid AND productid = @pid;";
        object[] arr = { new { amt = amt, aid = areaId, pid = productId } };

        await DoCommandAsync(sql, arr);
    }
}