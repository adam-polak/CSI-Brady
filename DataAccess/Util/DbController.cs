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

    protected void DoCommand(string sql, object[] parameters)
    {
        _connection.Open();
        _connection.Execute(sql, parameters);
        _connection.Close();
    }

    protected async Task DoCommandAsync(string sql, object[] parameters)
    {
        await _connection.OpenAsync();
        await _connection.ExecuteAsync(sql, parameters);
        await _connection.CloseAsync();
    }

    protected List<T> DoQuery<T>(string sql, object parameters)
    {
        _connection.Open();
        List<T> list = _connection.Query<T>(sql, parameters).AsList();
        _connection.Close();

        return list;
    }

    protected async Task<List<T>> DoQueryAsync<T>(string sql, object parameters)
    {
        await _connection.OpenAsync();
        List<T> list = (await _connection.QueryAsync<T>(sql, parameters)).AsList();
        await _connection.CloseAsync();

        return list;
    }
}