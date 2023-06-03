using Microsoft.AspNetCore.Mvc;
using WebAPI.Business.Managers;
using WebAPI.Business.Services;
using WebAPI.Core.Result;
using WebAPI.Models;
using WebAPI.Models.DTOs;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]s")]
public class CommentController : ControllerBase {

    private readonly ICommentService _service;

    public CommentController(BlogosphereContext context) {
        _service = new CommentManager(context);
    }

    [HttpGet("GetAll")]
    public DataResult<List<CommentUserDTO>> GetAll() {
        return new DataResult<List<CommentUserDTO>>(true, _service.GetAll());
    }

    [HttpGet("GetById/{id}")]
    public DataResult<Comment> GetById(int id) {
        return new DataResult<Comment>(true, _service.GetById(id)); 
    }

    [HttpGet("GetByContent/{contentId}")]
    public DataResult<List<CommentUserDTO>> GetByContent(int contentId) {
        return new DataResult<List<CommentUserDTO>>(true, _service.GetByContent(contentId));
    }

    [HttpPost("NewComment")]
    public Result NewComment([FromBody] Comment comment) {
        return _service.NewComment(comment);
    }

    [HttpDelete("DeleteComment")]
    public Result DeleteComment([FromQuery] int commentId) {
        return _service.DeleteComment(commentId);
    }
}