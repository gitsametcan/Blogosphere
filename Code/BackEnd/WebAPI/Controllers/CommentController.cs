using Microsoft.AspNetCore.Mvc;
using WebAPI.DataManagement;
using WebAPI.Entities;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]s")]
public class CommentController : ControllerBase {

    [HttpGet("GetAll")]
    public List<Comment> GetAll() {
        var commentList = TempDatabase.CommentList.OrderBy(x => x.commentId).ToList<Comment>();
        return commentList;
    }

    [HttpGet("GetById/{id}")]
    public Comment GetById(int id) {
        var comment = TempDatabase.CommentList.Where(t => t.commentId == id).SingleOrDefault();
        return comment; 
    }

    [HttpGet("GetByContent/{contentId}")]
    public List<Comment> GetByContent(int contentId) {
        var commentList = TempDatabase.CommentList.Where(t => t.contentId == contentId).ToList<Comment>();
        return commentList;
    }
}