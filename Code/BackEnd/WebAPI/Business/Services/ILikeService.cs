using WebAPI.Core.Result;
using WebAPI.Models;

namespace WebAPI.Business.Services;

public interface ILikeService {

    public List<Like> GetAll();
    public Like GetById(int id);
    public List<Like> GetByContent(int contentId);
    public Result NewLike(Like newLike);
    public Result UpdateLike(int id, Like updatedLike);
    public Result DeleteLike(int id);

}