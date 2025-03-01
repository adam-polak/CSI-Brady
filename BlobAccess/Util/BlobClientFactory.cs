using Azure.Storage.Blobs;
using CSI_Brady.Util;

namespace CSI_Brady.BlobAccess.Util;

public static class BlobClientFactory
{
    public static BlobContainerClient CreateBlobClient(IHostEnvironment env)
    {
        string? connectionString;
        string? containerName;
        if(env.IsDevelopment())
        {
            connectionString = JsonHelper.GetJsonSecret("BlobConnectionString");
            containerName = JsonHelper.GetJsonSecret("BlobContainerName");
        } else {
            connectionString = Environment.GetEnvironmentVariable("BlobConnectionString");
            containerName = Environment.GetEnvironmentVariable("BlobContainerName");
        }

        if(connectionString == null || containerName == null)
        {
            throw new Exception("Missing blob connection information");
        }

        return new BlobContainerClient(connectionString, containerName);
    }
}