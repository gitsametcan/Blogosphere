using Microsoft.AspNetCore.Mvc;
using WebAPI.DataManagement;
using WebAPI.Entities;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]s")]
public class LikeController : ControllerBase {
    
    [HttpGet("GetAll")]
    public List<Like> GetAll() {
        var likeList = TempDatabase.LikeList.OrderBy(x => x.likeId).ToList<Like>();
        return likeList;
    }

    [HttpGet("GetById/{id}")]
    public Like GetById(int id) {
        var like = TempDatabase.LikeList.Where(t => t.likeId == id).SingleOrDefault();
        return like; 
    }

    [HttpGet("GetByContent/{contentId}")]
    public List<Like> GetByContent(int contentId) {
        var likeList = TempDatabase.LikeList.Where(t => t.likedContentId == contentId).ToList<Like>();
        return likeList;
    }

    [HttpPost("LeaveLike")]
    public IActionResult LeaveLike([FromQuery] int userId, [FromQuery] int contentId, [FromQuery] int dislike) {
        var tempLike = TempDatabase.LikeList
            .SingleOrDefault(t => t.userId == userId && t.likedContentId == contentId);
        if (tempLike is not null) {
            return BadRequest();
        }
        Like like = new Like();
        like.userId = userId;
        like.likedContentId = contentId;
        like.likeDate = DateTime.Now;
        like.dislike = dislike;
        return Ok();
    }
}