using CSI_Brady.DataAccess.Models;
using CSI_Brady.DataAccess.Util;

namespace CSI_Brady.DataAccess.Controllers;

public class FacilityController : DbController
{
    public async Task<List<FacilityModel>> GetFacilities()
    {
        string sql = "SELECT facility.id, facility.address, company.name, company.imgsrc"
                    + " FROM facility FULL JOIN company"
                    + " ON facility.companyid = company.id;";
        
        return await DoQueryAsync<FacilityModel>(sql);
    }

    public async Task<List<AreaModel>> GetAreas(int facilityId)
    {
        string sql = "SELECT area.id, area.code FROM area"
                    + " WHERE facilityid = @id";
        object obj = new { id = facilityId };

        return await DoQueryAsync<AreaModel>(sql, obj);
    }
}