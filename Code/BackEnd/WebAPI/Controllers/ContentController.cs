using Microsoft.AspNetCore.Mvc;
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

    [HttpGet("GetByUser/{userId}")]
    public List<Content> FindByUserId(int userId) {
        var content = TempDatabase.ContentList.Where(t => t.authorId == userId).ToList<Content>();
        return content; 
    }
}