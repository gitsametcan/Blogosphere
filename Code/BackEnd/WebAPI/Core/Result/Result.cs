namespace WebAPI.Core.Result;

public class Result {
    private bool Success { get; set; }
    private string? Message { get; set; }

    public Result(bool Success) {
        this.Success = Success;
    }

    public Result(bool Success, string Message) {
        this.Success = Success;
        this.Message = Message;
    }


}