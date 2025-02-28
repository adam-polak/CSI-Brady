namespace CSI_Brady.DataAccess.Models;

/**
    The model to be used for retrieving the facilities on the home page
*/
public class FacilityModel
{
    public required int Id { get; set; }
    public required string Address { get; set; }
    public required string CompanyName { get; set; }
    public required string CompanyImgSrc { get; set; }
}