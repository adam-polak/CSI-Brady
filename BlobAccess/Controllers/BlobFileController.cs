using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using CSI_Brady.BlobAccess.Util;

namespace CSI_Brady.BlobAccess.Controllers;

public class BlobFileController
{
    private BlobContainerClient _containerClient;

    public BlobFileController(IHostEnvironment env)
    {
        _containerClient = BlobClientFactory.CreateBlobClient(env);
    }

    private string GetBlobName(int areaId, int imageId)
    {
        return $"{areaId}_{imageId}.txt";
    }

    public async Task UploadStringAsync(int areaId, int imageId, string str)
    {
        string blobName = GetBlobName(areaId, imageId);

        BlobClient client = _containerClient.GetBlobClient(blobName);

        await client.UploadAsync(BinaryData.FromString(str), overwrite: true);
    }

    public async Task DeleteBlob(int areaId, int imageId)
    {
        await _containerClient.DeleteBlobIfExistsAsync(GetBlobName(areaId, imageId));
    }

    public async Task<string> GetContentsAsString(int areaId, int imageId)
    {
        BlobClient client = _containerClient.GetBlobClient(GetBlobName(areaId, imageId));

        BlobDownloadResult result = await client.DownloadContentAsync();

        return result.Content.ToString();
    }
}