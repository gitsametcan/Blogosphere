namespace WebAPI.Entities;

public class Comment {
    public int commentId { get; set; }
    public int posterId { get; set; }
    public string? commentContent { get; set; }
    public int contentId { get; set; }
    public DateTime publishDate { get; set; }
}

