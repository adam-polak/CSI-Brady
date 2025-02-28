using CSI_Brady.DataAccess.Models;
using CSI_Brady.DataAccess.Util;

namespace CSI_Brady.DataAccess.Controllers;

public class FacilityController : DbController
{
    public async Task<List<FacilityModel>>GetFacilities()
    {
        string sql = "SELECT facility.id, facility.address, company.name, company.imgsrc"
                    + " FROM facility FULL JOIN company"
                    + " ON facility.companyid = company.id;";
        
        return await DoQueryAsync<FacilityModel>(sql);
    }
}