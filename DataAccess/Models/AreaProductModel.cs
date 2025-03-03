namespace CSI_Brady.DataAccess.Models;

public class AreaProductModel
{
    public required int Id { get; set; }
    public required string Name { get; set; }
    public required string Link { get; set; }
    public required string ImgSrc { get; set; }
    public required int Count { get; set; }
    public required string Note { get; set; }
}