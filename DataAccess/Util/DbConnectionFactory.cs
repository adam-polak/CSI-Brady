using System.Data.Common;
using Microsoft.Data.SqlClient;

namespace CSI_Brady.DataAccess.Util;

public static class DbConnectionFactory
{
    public static DbConnection CreateDbConnection()
    {
        string? connectionString = Environment.GetEnvironmentVariable("DatabaseConnectionString");
        if(connectionString == null)
        {
            throw new Exception("Missing DatabaseConnectionString environment variable");
        }

        return new SqlConnection(connectionString);
    }
}