using System.Net;
using System.Net.WebSockets;
using System.Text;
using CSI_Brady.BlobAccess.Controllers;
using CSI_Brady.DataAccess.Controllers;
using CSI_Brady.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CSI_Brady.Controllers;

[Route("imageapi")]
public class ImageController : ControllerBase
{
    private readonly ILogger<ImageController> _logger;
    private readonly IHostEnvironment _env;

    public ImageController(ILogger<ImageController> logger, IHostEnvironment env)
    {
        _logger = logger;
        _env = env;
    }

    [Route("upload")]
    public async Task UploadImage()
    {
        if(!HttpContext.WebSockets.IsWebSocketRequest)
        {
            _logger.Log(LogLevel.Error, "Not a websocket request");
            HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            return;
        }

        using WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();

        await Echo(webSocket, _logger, _env);
    }

    private static ArraySegment<Byte> GetBytesFromString(string str)
    {
        return Encoding.UTF8.GetBytes(str);
    }

    private static async Task<int> GetUserId(ILogger<ImageController> logger, IHostEnvironment env, string email, string firstName, string lastName)
    {
        logger.Log(LogLevel.Information, "Retrieving user");

        UserController userController = new UserController(env);
        int userId = await userController.GetUserId(email);
        if(userId == -1)
        {
            logger.Log(LogLevel.Information, "Creating user because a user doesn't exist for this email");
            await userController.CreateUser(email, firstName, lastName);
            userId = await userController.GetUserId(email);
        }

        logger.Log(LogLevel.Information, "User retrieved successfully");

        return userId;
    }

    private static async Task<AiApiResponse?> GetResponseFromAi(ILogger<ImageController> logger, WebSocket ws, string imgBase64)
    {
        await ws.SendAsync(
            GetBytesFromString("Waiting for AI analysis"),
            WebSocketMessageType.Text,
            true,
            CancellationToken.None
        );

        using HttpClient client = new HttpClient();
        HttpResponseMessage response = await client.PostAsync(
            "http://localhost:8000/detect",
            // "https://csifastai.azurewebsites.net/detect", 
            new StringContent(imgBase64)
        );

        if(response.StatusCode != HttpStatusCode.OK)
        {
            logger.Log(LogLevel.Error, "AI API status code != 200");
            await ws.CloseAsync(
                WebSocketCloseStatus.InternalServerError,
                "Error occurred while analyzing image",
                CancellationToken.None
            );
            return null;
        }

        string json = await response.Content.ReadAsStringAsync();
        logger.Log(LogLevel.Information, $"Received response from ai: {json}");
        AiApiResponse? aiResp = JsonConvert.DeserializeObject<AiApiResponse>(json);
        if(aiResp == null || response.StatusCode == HttpStatusCode.OK)
        {
            await ws.SendAsync(
                GetBytesFromString("AI analysis completed successfully"),
                WebSocketMessageType.Text,
                true,
                CancellationToken.None
            );
        } else {
            logger.Log(LogLevel.Error, "AI API status code != 200");
            await ws.CloseAsync(
                WebSocketCloseStatus.InternalServerError,
                "Error occurred while analyzing image",
                CancellationToken.None
            );
            return null;
        }

        return aiResp;
    }

    private static async Task<string> GetBase64Img(ILogger<ImageController> logger, WebSocket ws)
    {
        WebSocketReceiveResult result;
        byte[] buffer = new byte[4096];

        MemoryStream imgStream = new MemoryStream();

        logger.Log(LogLevel.Information, "Starting to receive image");

        while((result = await ws.ReceiveAsync(
            new ArraySegment<byte>(buffer),
            CancellationToken.None
        )).MessageType == WebSocketMessageType.Binary)
        {
            await imgStream.WriteAsync(buffer, 0, result.Count);
        }

        logger.Log(LogLevel.Information, "Image read");

        imgStream.Position = 0;

        byte[] imgBytes = imgStream.ToArray();

        return Convert.ToBase64String(imgBytes);
    }

    private static async Task<UploadImageData?> GetUploadImageData(ILogger<ImageController> logger, WebSocket ws)
    {
        byte[] buffer = new byte[4098];
        WebSocketReceiveResult receiveResult = await ws.ReceiveAsync(
            new ArraySegment<byte>(buffer),
            CancellationToken.None
        );

        logger.Log(LogLevel.Information, "Image received");
        await ws.SendAsync(
            GetBytesFromString("Image received"),
            WebSocketMessageType.Text,
            true,
            CancellationToken.None
        );

        string json = Encoding.UTF8.GetString(buffer, 0, receiveResult.Count);

        UploadImageData? img;
        try 
        {
            img = JsonConvert.DeserializeObject<UploadImageData>(json);
        } catch {
            logger.Log(LogLevel.Error, "Error parsing image json");
            return null;
        }

        return img;
    }

    private static async Task Echo(WebSocket ws, ILogger<ImageController> logger, IHostEnvironment env)
    {
        logger.Log(LogLevel.Information, "Starting websocket connection");

        UploadImageData? imgData = await GetUploadImageData(logger, ws);
        if(imgData == null)
        {
            logger.Log(LogLevel.Error, "Invalid upload image json format");
            await ws.CloseAsync(
                WebSocketCloseStatus.InvalidMessageType,
                "Invalid upload",
                CancellationToken.None
            );

            return;
        }

        string imgB64 = $"{imgData.ImgTag},{await GetBase64Img(logger, ws)}";

        AiApiResponse? aiResp = await GetResponseFromAi(logger, ws, imgB64);
        if(aiResp == null) return;

        logger.Log(LogLevel.Information, "Retrieving user id");
        int userId = await GetUserId(logger, env, imgData.Email, imgData.FirstName, imgData.LastName);
        DataAccess.Controllers.ImageController imgController = new DataAccess.Controllers.ImageController(env);
        logger.Log(LogLevel.Information, "Inserting image into database");
        int imageId = await imgController.CreateImage(imgData.AreaId, userId);

        logger.Log(LogLevel.Information, "Adding violations and products to image");
        ViolationController violationController = new ViolationController(env);
        ProductController productController = new ProductController(env);
        for(int i = 0; i < aiResp.violations.Length; i++)
        {
            int violationId = await violationController.GetViolationId(aiResp.violations[i]);
            await imgController.AddViolationToImage(imageId, violationId);
            List<int> productIds = await productController.GetProductIdsFromViolation(violationId);
            
            for(int j = 0; j < productIds.Count; j++)
            {
                await imgController.AddProductToImage(imageId, productIds.ElementAt(j));
            }
        }
        logger.Log(LogLevel.Information, "All violations and products added to image");

        logger.Log(LogLevel.Information, "Uploading image to blob");
        await ws.SendAsync(
            GetBytesFromString("Saving image..."),
            WebSocketMessageType.Text,
            true,
            CancellationToken.None
        );
        BlobFileController blob = new BlobFileController(env);
        await blob.UploadStringAsync(imgData.AreaId, imageId, imgB64);

        logger.Log(LogLevel.Information, "Successful upload");
        await ws.CloseAsync(
            WebSocketCloseStatus.NormalClosure,
            "Successful upload",
            CancellationToken.None
        );
    }

    private class UploadImageData
    {
        public required string Email { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required int AreaId { get; set; }
        public required string ImgTag { get; set; }
    }

    private class AiApiResponse
    {
        public required string[] violations { get; set; }
    }
}