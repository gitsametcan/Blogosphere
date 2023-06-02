using Microsoft.AspNetCore.Mvc;
using WebAPI.Business.Managers;
using WebAPI.Business.Services;
using WebAPI.Core.Result;
using WebAPI.Models;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]s")]
public class LikeController : ControllerBase {

    private readonly ILikeService _service;

    public LikeController(BlogosphereContext context) {
        _service = new LikeManager(context);
    }
    
    [HttpGet("GetAll")]
    public DataResult<List<Like>> GetAll() {
        return new DataResult<List<Like>>(true, _service.GetAll());
    }

    [HttpGet("GetById/{id}")]
    public DataResult<Like> GetById(int id) {
        return new DataResult<Like>(true, _service.GetById(id)); 
    }

    [HttpGet("GetByContent/{contentId}")]
    public DataResult<List<Like>> GetByContent(int contentId) {
        return new DataResult<List<Like>>(true, _service.GetByContent(contentId));
    }

    [HttpGet("GetCountByContentAndDislike/{ContentId}")]
    public DataResult<int> GetCountByContentAndDislike(int ContentId, [FromQuery] int Dislike) {
        return new DataResult<int>(true, _service.GetCountByContentAndDislike(ContentId, Dislike));
    }

    [HttpPost("NewLike")]
    public Result NewLike([FromBody] Like newLike) {
        return _service.NewLike(newLike);
    }

    [HttpPut("UpdateLike/{id}")]
    public Result UpdateLike(int id, [FromBody] Like updatedLike) {
        return _service.UpdateLike(id, updatedLike);
    }

    [HttpDelete("DeleteLike/{id}")]
    public Result DeleteLike(int id) {
        return _service.DeleteLike(id);
    }
}