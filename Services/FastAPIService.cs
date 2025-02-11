using System.Diagnostics;

public class FastAPIService : BackgroundService
{
    private readonly ILogger<FastAPIService> _logger;
    private Process _apiProcess;

    public FastAPIService(ILogger<FastAPIService> logger)
    {
        _logger = logger;
        _apiProcess = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "fastapi",
                Arguments = "run --host localhost ./FastAPI/api.py",
                RedirectStandardOutput = true,
                RedirectStandardError = true
            }
        };
    }

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        _apiProcess.Start();
        await _apiProcess.WaitForExitAsync();
        _logger.Log(LogLevel.Information, "AI API process exited");
    }

    public override void Dispose()
    {
        _apiProcess?.Kill();
        base.Dispose();
    }
}