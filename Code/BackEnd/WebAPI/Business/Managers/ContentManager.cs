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

    public List<Content> FindCommentedByUser(int Id) {
        var commentList = _context.Comments
                .Where(t => t.PosterId == Id)
                .ToList()
                .Select(t => t.ContentId)
                .ToList();
        var contentList = _context.Contents
                .Where(t => commentList.Contains(t.ContentId))
                .ToList();
        return contentList;
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
    public List<Content> GetTrendings(int sinceDays) {
        var referenceDate = DateTime.Now.AddDays(-sinceDays);
        var orderedList = _context.Contents
                .ToList()
                .OrderByDescending( t => LikeCountOfContent( t.ContentId, referenceDate ) )
                .ToList();
        return orderedList;
    }

    public List<Content> GetAllWithPages(int PageSize, int PageNumber) {
        return PutIntoPages(GetAll(), PageSize, PageNumber);
    }
    public List<Content> FindByUserIdWithPages(int Id, int PageSize, int PageNumber) {
        return PutIntoPages(FindByUserId(Id), PageSize, PageNumber);
    }
    public List<Content> FindLikedByUserWithPages(int Id, int PageSize, int PageNumber) {
        return PutIntoPages(FindLikedByUser(Id), PageSize, PageNumber);
    }
    public List<Content> FindCommentedByUserWithPages(int Id, int PageSize, int PageNumber) {
        return PutIntoPages(FindCommentedByUser(Id), PageSize, PageNumber);
    }

    public List<Content> GetByCategoryWithPages(int CategoryId, int PageSize, int PageNumber) {
        return PutIntoPages(GetByCategory(CategoryId), PageSize, PageNumber);
    }
    public List<Content> SearchContainsInTitleWithPages(string keyword, int PageSize, int PageNumber) {
        return PutIntoPages(SearchContainsInTitle(keyword), PageSize, PageNumber);
    }
    public List<Content> SearchContainsInTextWithPages(string keyword, int PageSize, int PageNumber) {
        return PutIntoPages(SearchContainsInText(keyword), PageSize, PageNumber);
    }
    public List<Content> GetTrendingsWithPages(int sinceDays, int PageSize, int PageNumber) {
        return GetTrendings(sinceDays).Skip(PageNumber * PageSize).Take(PageSize).ToList();
    }

    public int GetAllCount() {
        return GetAll().Count();
    }
    public int FindByUserIdCount(int Id) {
        return FindByUserId(Id).Count();
    }
    public int FindLikedByUserCount(int Id) {
        return FindLikedByUser(Id).Count();
    }
    public int FindCommentedByUserCount(int Id) {
        return FindCommentedByUser(Id).Count();
    }
    public int GetByCategoryCount(int CategoryId) {
        return GetByCategory(CategoryId).Count();
    }
    public int SearchContainsInTitleCount(string keyword) {
        return SearchContainsInTitle(keyword).Count();
    }
    public int SearchContainsInTextCount(string keyword) {
        return SearchContainsInText(keyword).Count();
    }
    public int GetTrendingsCount(int sinceDays) {
        return GetTrendings(sinceDays).Count();
    }

    private List<Content> PutIntoPages(List<Content> contentList, int PageSize, int PageNumber) {
        var orderedContentList = contentList.OrderBy(t => t.PublishDate).ToList();
        var rangedContentList = orderedContentList.Skip(PageNumber * PageSize).Take(PageSize).ToList();
        return rangedContentList;
    }

    private int LikeCountOfContent(int ContentId, DateTime since) {
        int count = _context.Likes
                .Where(t => t.LikedContentId == ContentId && t.LikeDate > since)
                .Count();
        return count;
    }

    public Result NewContent(Content newContent) {
        newContent.PublishDate = DateTime.Now;
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
        
        tempContent.AuthorId         = updatedContent.AuthorId          != default ? updatedContent.AuthorId            : tempContent.AuthorId;
        tempContent.CategoryId       = updatedContent.CategoryId        != default ? updatedContent.CategoryId          : tempContent.CategoryId;
        tempContent.Content1         = updatedContent.Content1          != default ? updatedContent.Content1            : tempContent.Content1;
        tempContent.ContentId        = updatedContent.ContentId         != default ? updatedContent.ContentId           : tempContent.ContentId;
        tempContent.ImagePath        = updatedContent.ImagePath         != default ? updatedContent.ImagePath           : tempContent.ImagePath;
        tempContent.PublishDate      = updatedContent.PublishDate       != default ? updatedContent.PublishDate         : tempContent.PublishDate;
        tempContent.ShortDescription = updatedContent.ShortDescription  != default ? updatedContent.ShortDescription    : tempContent.ShortDescription;
        tempContent.Title            = updatedContent.Title             != default ? updatedContent.Title               : tempContent.Title;
        tempContent.Visibility       = updatedContent.Visibility;
        _context.SaveChanges();

        return new Result(true, "Successfully updated content: " + updatedContent.ContentId);
    }
    public Result DeleteContent(int id) {
        var tempContent = _context.Contents
                .SingleOrDefault(t => t.ContentId == id);
        if (tempContent is null) {
            return new Result(false, "Content not found: " + id);
        }
        
        var likesList = _context.Likes.Where(t => t.LikedContentId == id).ToList();
        var commentsList = _context.Comments.Where(t => t.ContentId == id).ToList();
        foreach (var comment in commentsList) {
            _context.Comments.Remove(comment);
        }
        _context.SaveChanges();
        foreach (var like in likesList) {
            _context.Likes.Remove(like);
        }
        _context.SaveChanges();
        
        _context.Contents.Remove(tempContent);
        _context.SaveChanges();
        return new Result(true, "Content successfully deleted: " + id);
    }
}