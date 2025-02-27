using System.Net;
using System.Net.WebSockets;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CSI_Brady.Controllers;

[Route("imageapi")]
public class ImageController : ControllerBase
{
    private readonly ILogger<ImageController> _logger;

    public ImageController(ILogger<ImageController> logger)
    {
        _logger = logger;
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

        await Echo(webSocket, _logger);
    }

    private static ArraySegment<Byte> GetBytesFromString(string str)
    {
        return Encoding.UTF8.GetBytes(str);
    }

    private static async Task Echo(WebSocket ws, ILogger<ImageController> logger)
    {
        logger.Log(LogLevel.Information, "Starting websocket connection");

        byte[] buffer = new byte[1000000];
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

        ReceiveImage? receiveImg = JsonConvert.DeserializeObject<ReceiveImage>(json);
        if(receiveImg == null)
        {
            logger.Log(LogLevel.Error, "Invalid upload image json format");
            await ws.CloseAsync(
                WebSocketCloseStatus.InvalidMessageType,
                "Invalid upload",
                CancellationToken.None
            );
            return;
        }


        await ws.SendAsync(
            GetBytesFromString("Starting AI analysis"),
            WebSocketMessageType.Text,
            true,
            CancellationToken.None
        );

        using HttpClient client = new HttpClient();
        HttpResponseMessage response = await client.PostAsync(
            "https://csifastai.azurewebsites.net/detect", 
            new StringContent(receiveImg.ImageBase64)
        );

        AiApiResponse? aiResp = JsonConvert.DeserializeObject<AiApiResponse>(await response.Content.ReadAsStringAsync());
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
            return;
        }

        logger.Log(LogLevel.Information, "Successful upload");
        await ws.CloseAsync(
            WebSocketCloseStatus.NormalClosure,
            "Successful upload",
            CancellationToken.None
        );
    }

    private class ReceiveImage
    {
        public required int AreaId { get; set; }
        public required string ImageBase64 { get; set; }
    }

    private class AiApiResponse
    {
        public required string[] violations { get; set; }
        public required string[] detections { get; set; }
    }
}