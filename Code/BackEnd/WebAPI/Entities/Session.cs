namespace WebAPI.Entities;

public class Session {
    public int sessionId { get; set; }
	public int userId { get; set; }
	public string? sessionKey { get; set; }
}