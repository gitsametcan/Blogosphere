using WebAPI.Core.Result;
using WebAPI.Models;

namespace WebAPI.Business.Services;

public interface IContentService {
    public List<Content> GetAll();
    public Content GetById(int id);
    public List<Content> FindByUserId(int Id);
    public List<Content> FindLikedByUser(int Id);
    public List<Content> FindCommentedByUser(int Id);
    public List<Content> GetByCategory(int categoryId);
    public List<Content> SearchContainsInTitle(string keyword);
    public List<Content> SearchContainsInText(string keyword);
    public List<Content> GetTrendings(int sinceDays);
    public List<Content> GetAllWithPages(int PageSize, int PageNumber);
    public List<Content> FindByUserIdWithPages(int Id, int PageSize, int PageNumber);
    public List<Content> FindLikedByUserWithPages(int Id, int PageSize, int PageNumber);
    public List<Content> FindCommentedByUserWithPages(int Id, int PageSize, int PageNumber);
    public List<Content> GetByCategoryWithPages(int CategoryId, int PageSize, int PageNumber);
    public List<Content> SearchContainsInTitleWithPages(string keyword, int PageSize, int PageNumber);
    public List<Content> SearchContainsInTextWithPages(string keyword, int PageSize, int PageNumber);
    public List<Content> GetTrendingsWithPages(int sinceDays, int PageSize, int PageNumber);
    public Result NewContent(Content newContent);
    public Result UpdateContent(int id, Content updatedContent);
    public Result DeleteContent(int id);

}