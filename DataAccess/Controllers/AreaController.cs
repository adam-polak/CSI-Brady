using CSI_Brady.DataAccess.Models;
using CSI_Brady.DataAccess.Util;

namespace CSI_Brady.DataAccess.Controllers;

public class AreaController : DbController
{
    public async Task<List<ProductModel>> GetProducts(int areaId)
    {
        string sql = "SELECT product.id, product.name, product.link, product.imgsrc"
                    + " FROM area_to_product"
                    + " RIGHT JOIN product"
                    + " ON area_to_product.productid = product.id"
                    + " WHERE area_to_product.areaid = @id;";
        object obj = new { id = areaId };

        return await DoQueryAsync<ProductModel>(sql, obj);
    }
}