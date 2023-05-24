using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.DataManagement;
using WebAPI.Entities;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]s")]
public class ContentController : ControllerBase {
    
    [HttpGet("GetAll")]
    public List<Content> GetAll() {
        var commentList = TempDatabase.ContentList.OrderBy(x => x.contentId).ToList<Content>();
        return commentList;
    }

    [HttpGet("GetById/{id}")]
    public Content GetById(int id) {
        var content = TempDatabase.ContentList.Where(t => t.contentId == id).SingleOrDefault();
        return content;
    }

    [HttpGet("GetByUser/{Id}")]
    public List<Content> FindByUserId(int Id) {
        var content = TempDatabase.ContentList.Where(t => t.authorId == Id).ToList<Content>();
        return content; 
    }

    [HttpGet("FindLikedByUser")]
    public List<Content> FindLikedByUser([FromQuery, BindRequired] int Id) {
        var likedContentIds = TempDatabase.LikeList
                .Where(t => t.userId == Id).ToList<Like>()
                .Select(t => t.likedContentId)
                .ToList<int>();
        var contents = TempDatabase.ContentList.Where(t => likedContentIds.Contains(t.contentId)).ToList<Content>();
        return contents; 
    }
}