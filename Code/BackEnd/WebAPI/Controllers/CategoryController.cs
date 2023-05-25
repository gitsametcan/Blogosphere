using Microsoft.AspNetCore.Mvc;
using WebAPI.DataManagement;
using WebAPI.Entities;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]s")]
public class CategoryController : ControllerBase {
    
    [HttpGet("GetAll")]
    public List<Category> GetAll() {
        var commentList = TempDatabase.CategoryList.OrderBy(x => x.categoryId).ToList<Category>();
        return commentList;
    }

    [HttpGet("GetById/{id}")]
    public Category? GetById(int id) {
        var comment = TempDatabase.CategoryList.Where(book => book.categoryId == id).SingleOrDefault();
        return comment; 
    }

    [HttpGet("FindByName/{name}")]
    public List<Category> FindByName(string name) {
        var commentList = TempDatabase.CategoryList.Where(x => x.categoryTitle.Contains(name)).ToList<Category>();
        return commentList;
    }
}