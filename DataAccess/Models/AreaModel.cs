namespace CSI_Brady.DataAccess.Models;

/**
    The model to be used for retrieving the areas on a specific facility page
*/
public class AreaModel
{
    public required int Id { get; set; }
    public required string Code { get; set; }
    public required int ViolationCount { get; set; }
}