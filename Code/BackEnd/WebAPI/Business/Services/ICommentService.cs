using WebAPI.Core.Result;
using WebAPI.Models;

using WebAPI.Models.DTOs;

namespace WebAPI.Business.Services;


public interface ICommentService {
    
    public List<CommentUserDTO> GetAll();
    public Comment GetById(int id);
    public List<CommentUserDTO> GetByContent(int contentId);
    public Result NewComment(Comment comment);
    public Result DeleteComment(int commentId);
}