using System.Data.Common;
using Dapper;

namespace CSI_Brady.DataAccess.Util;

public abstract class DbController
{
    private DbConnection _connection;

    public DbController()
    {
        _connection = DbConnectionFactory.CreateDbConnection();
    }

    private void DoCommand(string sql, object[] parameters)
    {
        _connection.Open();
        _connection.Execute(sql, parameters);
        _connection.Close();
    }

    private async Task DoCommandAsync(string sql, object[] parameters)
    {
        await _connection.OpenAsync();
        await _connection.ExecuteAsync(sql, parameters);
        await _connection.CloseAsync();
    }

    private List<T> DoQuery<T>(string sql, object parameters)
    {
        _connection.Open();
        List<T> list = _connection.Query<T>(sql, parameters).AsList();
        _connection.Close();

        return list;
    }
}