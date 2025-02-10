using System.Diagnostics;

public class AiService : BackgroundService
{
    private readonly ILogger<AiService> _logger;
    private Process _aiProcess;

    public AiService(ILogger<AiService> logger)
    {
        _logger = logger;
        _aiProcess = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "fastapi",
                Arguments = "run --host 127.0.0.1. ./FastAPI/api.py",
                RedirectStandardOutput = true,
                RedirectStandardError = true
            }
        };
    }

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        _aiProcess.Start();
        await _aiProcess.WaitForExitAsync();
        _logger.Log(LogLevel.Information, "AI API process exited");
    }

    public override void Dispose()
    {
        _aiProcess?.Kill();
        base.Dispose();
    }
}