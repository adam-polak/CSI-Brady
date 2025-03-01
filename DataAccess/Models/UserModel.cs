namespace CSI_Brady.DataAccess.Models;

public class UserModel
{
    public required int Id { get; set; }
    public required string Email { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
}