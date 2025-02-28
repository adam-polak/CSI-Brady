using CSI_Brady.DataAccess.Models;
using CSI_Brady.DataAccess.Util;

namespace CSI_Brady.DataAccess.Controllers;

public class ImageController : DbController
{
    /*
        Returns unique image id
    */
    public async Task<int> CreateImage(int areaId, int userId)
    {
        int id = await GenerateRandomId();
        
        string sql = "INSERT INTO image (id, areaid, userid)"
                    + " VALUES (@id, @area, @user);";
        object[] parameters = { new { id = id, area = areaId, user = userId } };

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
}