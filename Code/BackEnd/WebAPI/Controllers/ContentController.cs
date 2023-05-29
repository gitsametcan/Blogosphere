using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Business.Managers;
using WebAPI.Business.Services;
using WebAPI.Core.Result;
using WebAPI.Models;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]s")]
public class ContentController : ControllerBase {
    
    private readonly IContentService _service;

    public ContentController(BlogosphereContext context) {
        _service = new ContentManager(context);
    }

    [HttpGet("GetAll")]
    public DataResult<List<Content>> GetAll() {
        return new DataResult<List<Content>>(true, _service.GetAll());
    }

    [HttpGet("GetById/{id}")]
    public DataResult<Content> GetById(int id) {
        return new DataResult<Content>(true, _service.GetById(id));
    }

    [HttpGet("GetByUser/{Id}")]
    public DataResult<List<Content>> FindByUserId(int Id) {
        return new DataResult<List<Content>>(true, _service.FindByUserId(Id)); 
    }

    [HttpGet("FindLikedByUser")]
    public DataResult<List<Content>> FindLikedByUser([FromQuery, BindRequired] int Id) {
        return new DataResult<List<Content>>(true, _service.FindLikedByUser(Id)); 
    }

    [HttpGet("GetByCategory/{CategoryId}")]
    public DataResult<List<Content>> GetByCategory(int CategoryId) {
        return new DataResult<List<Content>>(true, _service.GetByCategory(CategoryId));
    }

    [HttpGet("SearchContainsInTitle")]
    public DataResult<List<Content>> SearchContainsInTitle([FromQuery] string keyword) {
        return new DataResult<List<Content>>(true, _service.SearchContainsInTitle(keyword));
    }

    [HttpGet("SearchContainsInText")]
    public DataResult<List<Content>> SearchContainsInText([FromQuery] string keyword) {
        return new DataResult<List<Content>>(true, _service.SearchContainsInText(keyword));
    }

    [HttpGet("GetTrendings")]
    public DataResult<List<Content>> GetTrendings([FromQuery] int sinceDays) {
        return new DataResult<List<Content>>(true, _service.GetTrendings(sinceDays));
    }

    [HttpGet("GetAllWithPages")]
    public DataResult<List<Content>> GetAllWithPages([FromQuery]int PageSize, [FromQuery] int PageNumber) {
        return new DataResult<List<Content>>(true, _service.GetAllWithPages(PageSize, PageNumber));
    }

    [HttpGet("GetByCategoryWithPages/{CategoryId}")]
    public DataResult<List<Content>> GetByCategoryWithPages(
            int CategoryId, 
            [FromQuery] int PageSize, 
            [FromQuery] int PageNumber) {
        return new DataResult<List<Content>>(true, _service.GetByCategoryWithPages(CategoryId, PageSize, PageNumber));
    }

    [HttpGet("SearchContainsInTitleWithPages")]
    public DataResult<List<Content>> SearchContainsInTitleWithPages(
            [FromQuery] string keyword,
            [FromQuery] int PageSize,
            [FromQuery] int PageNumber) {
        return new DataResult<List<Content>>(true, _service.SearchContainsInTitleWithPages(keyword, PageSize, PageNumber));
    }

    [HttpGet("SearchContainsInTextWithPages")]
    public DataResult<List<Content>> SearchContainsInTextWithPages(
            [FromQuery] string keyword,
            [FromQuery] int PageSize,
            [FromQuery] int PageNumber) {
        return new DataResult<List<Content>>(true, _service.SearchContainsInTextWithPages(keyword, PageSize, PageNumber));
    }

    [HttpGet("GetTrendingsWithPages")]
    public DataResult<List<Content>> GetTrendingsWithPages(
            [FromQuery] int sinceDays,
            [FromQuery] int PageSize,
            [FromQuery] int PageNumber) {
        return new DataResult<List<Content>>(true, _service.GetTrendingsWithPages(sinceDays, PageSize, PageNumber));
    }

    [HttpPost("NewContent")]
    public Result NewContent([FromBody] Content newContent) {
        return _service.NewContent(newContent);
    }

    [HttpPut("UpdateContent")]
    public Result UpdateContent(int id, [FromBody] Content updatedContent) {
        return _service.UpdateContent(id, updatedContent);
    }

    [HttpDelete("DeleteContent")]
    public Result DeleteContent(int id) {
        return _service.DeleteContent(id);
    }
}