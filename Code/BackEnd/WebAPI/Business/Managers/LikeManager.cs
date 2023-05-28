using WebAPI.Business.Services;
using WebAPI.Core.Result;
using WebAPI.Models;

namespace WebAPI.Business.Managers;

public class LikeManager : ILikeService {

    private readonly BlogosphereContext _context;

    public LikeManager(BlogosphereContext context) {
        _context = context;
    }

    public List<Like> GetAll() {
        return _context.Likes.ToList<Like>();
    }
    public Like GetById(int id) {
        var like = _context.Likes.SingleOrDefault(t => t.LikeId == id);
        return like;
    }
    public List<Like> GetByContent(int contentId) {
        return _context.Likes.Where(t => t.LikedContentId == contentId).ToList<Like>();;
    }
    public Result NewLike(Like newLike) {
        _context.Likes.Add(newLike);
        _context.SaveChanges();
        return new Result(true, "New Like created.");
    }
    public Result UpdateLike(int id, Like updatedLike) {
        var tempLike = _context.Likes.SingleOrDefault(t => t.LikeId == updatedLike.LikeId);
        if (tempLike is null) {
            return new Result(false, "Like not found: " + updatedLike.LikeId);
        }
        tempLike.Dislike           = updatedLike.Dislike        != default ? updatedLike.Dislike        : tempLike.Dislike;
        tempLike.LikeDate          = updatedLike.LikeDate       != default ? updatedLike.LikeDate       : tempLike.LikeDate;
        tempLike.LikedContentId    = updatedLike.LikedContentId != default ? updatedLike.LikedContentId : tempLike.LikedContentId;
        tempLike.UserId            = updatedLike.UserId         != default ? updatedLike.UserId         : tempLike.UserId;
        _context.SaveChanges();

        return new Result(true, "Successfully updated like: " + updatedLike.LikeId);
    }
    public Result DeleteLike(int id) {
        var like = _context.Likes.SingleOrDefault(t => t.LikeId == id);
        if (like is null) {
            return new Result(false, "Content not found: " + id);
        }
        _context.Likes.Remove(like);
        _context.SaveChanges();
        return new Result(true, "Like successfully deleted: " + id);
    }
}