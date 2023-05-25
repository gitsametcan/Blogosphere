namespace WebAPI.Entities;

public class Like {
    public int likeId { get; set; }
    public int userId { get; set; } // liker
    public int likedContentId { get; set; }
    public int dislike { get; set; }
    public DateTime likeDate { get; set; }
}