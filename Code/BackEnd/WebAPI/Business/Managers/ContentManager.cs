using WebAPI.Business.Services;
using WebAPI.Core.Result;
using WebAPI.Models;

namespace WebAPI.Business.Managers;

public class ContentManager : IContentService {

    private readonly BlogosphereContext _context;
    public ContentManager(BlogosphereContext context) {
        _context = context;
    }

    public List<Content> GetAll() {
        return _context.Contents.ToList();
    }
    public Content GetById(int id) {
        var content = _context.Contents.SingleOrDefault(t => t.ContentId == id);
        return content;
    }
    public List<Content> FindByUserId(int id) {
        var contentList = _context.Contents.Where(t => t.AuthorId == id).ToList();
        return contentList;
    }
    public List<Content> FindLikedByUser(int id) {
        var likes = _context.Likes
                .Where(t => t.UserId == id)
                .ToList<Like>()
                .Select(t => t.LikedContentId)
                .ToList<int>();
        var contents = _context.Contents
                .Where(t => likes.Contains(t.ContentId))
                .ToList<Content>();
        return contents;
    }
    public List<Content> GetByCategory(int categoryId) {
        var contents = _context.Contents
                .Where(t => t.CategoryId == categoryId)
                .ToList<Content>();
        return contents;
    }
    public List<Content> SearchContainsInTitle(string keyword) {
        var contents = _context.Contents
                .Where(t => t.Title.Contains(keyword))
                .ToList<Content>();
        return contents;
    }
    public List<Content> SearchContainsInText(string keyword) {
        var contents = _context.Contents
                .Where(t => t.Content1.Contains(keyword))
                .ToList<Content>();
        return contents;
    }
    public Result NewContent(Content newContent) {
        _context.Contents.Add(newContent);
        _context.SaveChanges();
        return new Result(true, "New Content created: " + newContent.Title);
    }
    public Result UpdateContent(int id, Content updatedContent) {
        var tempContent = _context.Contents
                .SingleOrDefault(t => t.ContentId == updatedContent.ContentId);
        if (tempContent is null) {
            return new Result(false, "Content not found: " + updatedContent.ContentId);
        }
        
        tempContent.AuthorId    = updatedContent.AuthorId   != default ? updatedContent.AuthorId    : tempContent.AuthorId;
        tempContent.CategoryId  = updatedContent.CategoryId != default ? updatedContent.CategoryId  : tempContent.CategoryId;
        tempContent.Content1    = updatedContent.Content1   != default ? updatedContent.Content1    : tempContent.Content1;
        tempContent.ContentId   = updatedContent.ContentId  != default ? updatedContent.ContentId   : tempContent.ContentId;
        tempContent.ImagePath   = updatedContent.ImagePath  != default ? updatedContent.ImagePath   : tempContent.ImagePath;
        tempContent.PublishDate = updatedContent.PublishDate!= default ? updatedContent.PublishDate : tempContent.PublishDate;
        tempContent.Title       = updatedContent.Title      != default ? updatedContent.Title       : tempContent.Title;
        tempContent.Visibility  = updatedContent.Visibility != default ? updatedContent.Visibility  : tempContent.Visibility;
        _context.SaveChanges();

        return new Result(true, "Successfully updated content: " + updatedContent.ContentId);
    }
    public Result DeleteContent(int id) {
        var tempContent = _context.Contents
                .SingleOrDefault(t => t.ContentId == id);
        if (tempContent is null) {
            return new Result(false, "Content not found: " + id);
        }
        _context.Contents.Remove(tempContent);
        _context.SaveChanges();
        return new Result(true, "Content successfully deleted: " + id);
    }
}