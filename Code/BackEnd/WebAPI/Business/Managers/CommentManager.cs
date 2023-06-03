using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Business.Services;
using WebAPI.Core.Result;
using WebAPI.Models.DTOs;

namespace WebAPI.Business.Managers;

public class CommentManager : ICommentService
{
    private readonly BlogosphereContext _context;

    public CommentManager(BlogosphereContext context) {
        _context = context;
    }

    public List<CommentUserDTO> GetAll() {
        return _context.Comments
                .Select(t => 
                    new CommentUserDTO(t, _context.Users
                                            .SingleOrDefault(k => k.UserId == t.PosterId)
                            )
                    )
                .ToList();
    }

    public Comment GetById(int id) {
        var comment = _context.Comments.SingleOrDefault(t => t.CommentId == id);
        return comment;
    }
    
    public List<CommentUserDTO> GetByContent(int contentId) {
        var commentList = _context.Comments
                .Where(t => t.ContentId == contentId)
                .ToList<Comment>()
                .Select(t => new CommentUserDTO(t, _context.Users.SingleOrDefault(k => k.UserId == t.PosterId)))
                .ToList();
        return commentList;
    }

    public Result NewComment(Comment comment) {
        comment.PublishDate = DateTime.Now;
        _context.Comments.Add(comment);
        _context.SaveChanges();
        return new Result(true, "New comment created: " + comment.CommentContent);
    }

    public Result DeleteComment(int commentId) {
        var comment = _context.Comments.Where(t => t.CommentId == commentId).SingleOrDefault();
        if (comment is null) {
            return new Result(false, "Comment not found: " + commentId);
        }
        _context.Comments.Remove(comment);
        _context.SaveChanges();
        return new Result(true, "Comment successfully deleted: " + "");
    }

}