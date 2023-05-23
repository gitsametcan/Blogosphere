namespace WebAPI.Entities;

public class Content {
    public int contentId { get; set; }
    public string? title { get; set; }
    public DateTime publishDate { get; set; }
    public string? content { get; set; }
    public string? imagePath { get; set; }
    public int authorId { get; set; }
    public int categoryId { get; set; }
    public int visibility { get; set; }

}