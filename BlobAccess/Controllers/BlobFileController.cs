using Azure.Storage.Blobs;
using CSI_Brady.BlobAccess.Util;

namespace CSI_Brady.BlobAccess.Controllers;

public class BlobFileController
{
    private BlobContainerClient _client;

    public BlobFileController(IHostEnvironment env)
    {
        _client = BlobClientFactory.CreateBlobClient(env);
    }
}