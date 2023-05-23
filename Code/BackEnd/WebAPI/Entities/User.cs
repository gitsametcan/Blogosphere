namespace WebAPI.Entities;

public class User {
    public int userId { get; set; }
    public string? username { get; set; }
    public string? email { get; set; }
    public string? password { get; set; }
    public string? userType { get; set; }
    public int blocked { get; set; }
}