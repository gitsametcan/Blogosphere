using WebAPI.Core.Result;
using WebAPI.Models;

namespace WebAPI.Business.Services;

public interface ICategoryService
{
    public List<Category> GetAll();
    public Category GetById(int id);
    public List<Category> FindByName(string name);
    public Result NewCategory(Category category);
    public Result UpdateCategory(int id, Category category);
    public Result DeleteCategory(int categoryId);
}