namespace WebAPI.Core.Result;

public class DataResult<T> : Result {
    T Data;
    public DataResult(bool Success, T Data) : base(Success) {
        this.Data = Data;
    }

    public DataResult(bool Success, string Message, T Data) : base(Success, Message) {
        this.Data = Data;
    }

    public T getData() {
        return Data;
    }
}