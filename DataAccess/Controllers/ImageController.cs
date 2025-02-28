using CSI_Brady.DataAccess.Util;

namespace CSI_Brady.DataAccess.Controllers;

public class ImageController : DbController
{
    public async Task CreateImage(int areaId, int userId)
    {
        string sql = "INSERT INTO image (areaid, userid)"
                    + " VALUES (@area, @user);";
        object[] parameters = { new { area = areaId, user = userId } };

        await DoCommandAsync(sql, parameters);
    }
}