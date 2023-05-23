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
}