namespace CSI_Brady.DataAccess.Models;

/**
    The model to be used on a specific area page
*/
public class ProductModel
{
    public required int Id { get; set; }
    public required string Name { get; set; }
    public required string Link { get; set; }
    public required string ImgSrc { get; set; }
}