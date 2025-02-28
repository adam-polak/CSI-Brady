using CSI_Brady.DataAccess.Models;
using CSI_Brady.DataAccess.Util;

namespace CSI_Brady.DataAccess.Controllers;

public class ProductController : DbController
{
    public async Task CreateProduct(string name, string link, string imgSrc)
    {
        string sql = "INSERT INTO product (name, link, imgsrc)"
                    + " VALUES (@name, @link, @img);";
        object[] parameters = { new { name = name, link = link, img = imgSrc } };

        await DoCommandAsync(sql, parameters);
    }
}