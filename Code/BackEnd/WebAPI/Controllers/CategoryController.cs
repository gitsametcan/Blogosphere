using Microsoft.AspNetCore.Mvc;
using WebAPI.Business.Managers;
using WebAPI.Business.Services;
using WebAPI.Core.Result;
using WebAPI.Models;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]s")]
public class CategoryController : ControllerBase {
    
    private readonly ICategoryService _service;
    public CategoryController(BlogosphereContext context) {
        _service = new CategoryManager(context);
    }

    [HttpGet("GetAll")]
    public DataResult<List<Category>> GetAll() {
        return new DataResult<List<Category>>(true, _service.GetAll());
    }

    [HttpGet("GetById/{id}")]
    public DataResult<Category> GetById(int id) {
        return new DataResult<Category>(true, _service.GetById(id)); 
    }

    [HttpGet("FindByName/{name}")]
    public DataResult<List<Category>> FindByName(string name) {
        return new DataResult<List<Category>>(true, _service.FindByName(name));
    }

    [HttpPost("NewCategory")]
    public Result NewCategory([FromBody] Category category) {
        return _service.NewCategory(category);
    }

    [HttpPut("UpdateCategory/{id}")]
    public Result UpdateCategory(int id, [FromBody] Category category) {
        return _service.UpdateCategory(id, category);
    }

    [HttpDelete("DeleteCategory/{categoryId}")]
    public Result DeleteCategory(int categoryId) {
        return _service.DeleteCategory(categoryId);
    }
}