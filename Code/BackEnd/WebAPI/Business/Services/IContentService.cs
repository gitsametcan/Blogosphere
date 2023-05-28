using WebAPI.Core.Result;
using WebAPI.Models;

namespace WebAPI.Business.Services;

public interface IContentService {
    public List<Content> GetAll();
    public Content GetById(int id);
    public List<Content> FindByUserId(int Id);
    public List<Content> FindLikedByUser(int Id);
    public List<Content> GetByCategory(int categoryId);
    public List<Content> SearchContainsInTitle(string keyword);
    public List<Content> SearchContainsInText(string keyword);
    public Result NewContent(Content newContent);
    public Result UpdateContent(int id, Content updatedContent);
    public Result DeleteContent(int id);

}