using WebAPI.Core.Result;
using WebAPI.Models;

namespace WebAPI.Business.Services;

public interface ICommentService {
    
    public List<Comment> GetAll();
    public Comment GetById(int id);
    public List<Comment> GetByContent(int contentId);
    public Result NewComment(Comment comment);
    public Result DeleteComment(int commentId);
}