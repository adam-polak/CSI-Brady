namespace CSI_Brady.DataAccess.Models;

public class ImageModel
{
    public required int Id { get; set; }
    public required string Date { get; set; }
    public required int AreaId { get; set; }
    public required int UserId { get; set; }
}