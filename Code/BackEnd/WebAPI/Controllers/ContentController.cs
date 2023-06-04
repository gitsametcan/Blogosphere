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

    [HttpGet("FindCommentedByUser")]
    public DataResult<List<Content>> FindCommentedByUser([FromQuery, BindRequired]int Id) {
        return new DataResult<List<Content>>(true, _service.FindCommentedByUser(Id));
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

    [HttpGet("FindByUserIdWithPages/{Id}")]
    public DataResult<List<Content>> FindByUserIdWithPages(
            int Id, 
            [FromQuery] int PageSize, 
            [FromQuery] int PageNumber) {
        return new DataResult<List<Content>>(true, _service.FindByUserIdWithPages(Id, PageSize, PageNumber));
    }

    [HttpGet("FindLikedByUserWithPages")]
    public DataResult<List<Content>> FindLikedByUserWithPages(
            [FromQuery] int Id, 
            [FromQuery] int PageSize, 
            [FromQuery] int PageNumber) {
        return new DataResult<List<Content>>(true, _service.FindLikedByUserWithPages(Id, PageSize, PageNumber));
    }

    [HttpGet("FindCommentedByUserWithPages")]
    public DataResult<List<Content>> FindCommentedByUserWithPages(
            [FromQuery] int Id, 
            [FromQuery] int PageSize, 
            [FromQuery] int PageNumber) {
        return new DataResult<List<Content>>(true, _service.FindCommentedByUserWithPages(Id, PageSize, PageNumber));
    }

    [HttpGet("GetAllWithPages")]
    public DataResult<List<Content>> GetAllWithPages([FromQuery]int PageSize, [FromQuery] int PageNumber) {
        return new DataResult<List<Content>>(true, "For PageSize: " + PageSize + ", Page: " + PageNumber, _service.GetAllWithPages(PageSize, PageNumber));
    }

    [HttpGet("GetByCategoryWithPages/{CategoryId}")]
    public DataResult<List<Content>> GetByCategoryWithPages(
            int CategoryId, 
            [FromQuery] int PageSize, 
            [FromQuery] int PageNumber) {
        return new DataResult<List<Content>>(
            true, 
            "For PageSize: " + PageSize + ", Page: " + PageNumber, 
            _service.GetByCategoryWithPages(CategoryId, PageSize, PageNumber)
        );
    }

    [HttpGet("SearchContainsInTitleWithPages")]
    public DataResult<List<Content>> SearchContainsInTitleWithPages(
            [FromQuery] string keyword,
            [FromQuery] int PageSize,
            [FromQuery] int PageNumber) {
        return new DataResult<List<Content>>(
            true, 
            "For PageSize: " + PageSize + ", Page: " + PageNumber, 
            _service.SearchContainsInTitleWithPages(keyword, PageSize, PageNumber)
        );
    }

    [HttpGet("SearchContainsInTextWithPages")]
    public DataResult<List<Content>> SearchContainsInTextWithPages(
            [FromQuery] string keyword,
            [FromQuery] int PageSize,
            [FromQuery] int PageNumber) {
        return new DataResult<List<Content>>(
            true, 
            "For PageSize: " + PageSize + ", Page: " + PageNumber, 
            _service.SearchContainsInTextWithPages(keyword, PageSize, PageNumber)
        );
    }

    [HttpGet("GetTrendingsWithPages")]
    public DataResult<List<Content>> GetTrendingsWithPages(
            [FromQuery] int sinceDays,
            [FromQuery] int PageSize,
            [FromQuery] int PageNumber) {
        return new DataResult<List<Content>>(
            true, 
            "For PageSize: " + PageSize + ", Page: " + PageNumber,
            _service.GetTrendingsWithPages(sinceDays, PageSize, PageNumber)
        );
    }

    [HttpGet("GetAllCount")]
    public DataResult<int> GetAllCount() {
        return new DataResult<int>(true, _service.GetAllCount());
    }

    [HttpGet("GetByUserCount/{Id}")]
    public DataResult<int> FindByUserIdCount(int Id) {
        return new DataResult<int>(true, _service.FindByUserIdCount(Id));
    }

    [HttpGet("FindLikedByUserCount")]
    public DataResult<int> FindLikedByUserCount([FromQuery, BindRequired] int Id) {
        return new DataResult<int>(true, _service.FindLikedByUserCount(Id));
    }

    [HttpGet("FindCommentedByUserCount")]
    public DataResult<int> FindCommentedByUserCount([FromQuery] int Id) {
        return new DataResult<int>(true, _service.FindCommentedByUserCount(Id));
    }

    [HttpGet("GetByCategoryCount/{CategoryId}")]
    public DataResult<int> GetByCategoryCount(int CategoryId) {
        return new DataResult<int>(true, _service.GetByCategoryCount(CategoryId));
    }

    [HttpGet("SearchContainsInTitleCount")]
    public DataResult<int> SearchContainsInTitleCount([FromQuery]string keyword) {
        return new DataResult<int>(true, _service.SearchContainsInTitleCount(keyword));
    }

    [HttpGet("SearchContainsInTextCount")]
    public DataResult<int> SearchContainsInTextCount([FromQuery]string keyword) {
        return new DataResult<int>(true, _service.SearchContainsInTextCount(keyword));
    }

    [HttpGet("GetTrendingsCount")]
    public DataResult<int> GetTrendingsCount([FromQuery] int sinceDays) {
        return new DataResult<int>(true, _service.GetTrendingsCount(sinceDays));
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
    public Result DeleteContent([FromQuery] int id) {
        return _service.DeleteContent(id);
    }
}