using CSI_Brady.DataAccess.Models;
using CSI_Brady.DataAccess.Util;

namespace CSI_Brady.DataAccess.Controllers;

public class ViolationController : DbController
{
    public ViolationController(IHostEnvironment env) : base(env)
    {
    }

    public async Task<List<ViolationModel>> GetViolationsForProduct(int productId)
    {
        string sql = "SELECT violation.name, violation.summary, violation.link"
                    + " FROM product_to_violation RIGHT JOIN violation"
                    + " ON product_to_violation.violationid = violation.id"
                    + " WHERE product_to_violation.productid = @id;";
        object obj = new { id = productId };
        return await DoQueryAsync<ViolationModel>(sql, obj);
    }
}