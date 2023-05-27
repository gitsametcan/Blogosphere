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
        var comment = TempDatabase.CategoryList.Where(t => t.categoryId == id).SingleOrDefault();
        return comment; 
    }

    [HttpGet("FindByName/{name}")]
    public List<Category> FindByName(string name) {
        var commentList = TempDatabase.CategoryList.Where(t => t.categoryTitle.Contains(name)).ToList<Category>();
        return commentList;
    }

    [HttpPost("NewCategory")]
    public IActionResult NewCategory([FromBody] Category category) {
        TempDatabase.CategoryList.Add(category);
        return Ok();
    }

    [HttpPut("UpdateCategory")]
    public IActionResult UpdateCategory([FromBody] Category category) {
        TempDatabase.CategoryList.Add(category);
        return Ok();
    }

    [HttpDelete("DeleteCategory/{categoryId}")]
    public IActionResult DeleteCategory(int categoryId) {
        var category = TempDatabase.CategoryList.SingleOrDefault(t => t.categoryId == categoryId);
        if (category is null) {
            return NotFound("Category with id " + categoryId + " not found.");
        }
        TempDatabase.CategoryList.Remove(category);
        return Ok();
    }
}