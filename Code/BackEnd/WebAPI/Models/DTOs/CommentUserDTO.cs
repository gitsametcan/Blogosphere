namespace WebAPI.Models.DTOs;

public class CommentUserDTO {
    public Comment comment {get; set;}
    public User user {get; set;}

    public CommentUserDTO(Comment comment, User user) {
        this.comment = comment;
        this.user = user;
    }
    
}