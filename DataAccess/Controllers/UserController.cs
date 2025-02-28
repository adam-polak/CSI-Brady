using CSI_Brady.DataAccess.Models;
using CSI_Brady.DataAccess.Util;

namespace CSI_Brady.DataAccess.Controllers;

public class UserController : DbController
{
    public UserController(IHostEnvironment env) : base(env)
    {
    }

    public async Task<bool> ContainsUser(string email)
    {
        string sql = "SELECT * FROM user_table WHERE email=@email;";
        object obj = new { email = email };
        
        return (await DoQueryAsync<UserModel>(sql, obj)).Count != 0;
    }

    public async Task<int> GetUserId(string email)
    {
        string sql = "SELECT * FROM user_table WHERE email=@email;";
        object obj = new { email = email };

        return (await DoQueryAsync<UserModel>(sql, obj)).FirstOrDefault()?.Id ?? -1;
    }

    public async Task CreateUser(string email, string firstName, string lastName)
    {
        string sql = "INSERT INTO user_table (email, firstname, lastname) (@email, @first, @last);";
        object[] parameters = { new { email = email, first = firstName, last = lastName } }; 

        await DoCommandAsync(sql, parameters);
    }
}