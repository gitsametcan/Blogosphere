using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Business.Services;
using WebAPI.Core.Result;

namespace WebAPI.Business.Managers;

public class CategoryManager : ICategoryService
{
    private readonly BlogosphereContext _context;

    public CategoryManager(BlogosphereContext context) {
        _context = context;
    }

    public List<Category> GetAll() {
        return _context.Categories.ToList();
    }
    public Category GetById(int id) {
        var category = _context.Categories
                .SingleOrDefault(t => t.CategoryId == id);
        return category;
    }
    public List<Category> FindByName(string name) {
        var commentList = _context.Categories
                .Where(t => t.CategoryTitle.Contains(name))
                .ToList<Category>();
        return commentList;
    }
    public Result NewCategory(Category category) {
        _context.Categories.Add(category);
        _context.SaveChanges();
        return new Result(true, "Successfully created category: " + category.CategoryTitle);
    }
    public Result UpdateCategory(int id, Category updatedCategory) {
        var tempCategory = _context.Categories.SingleOrDefault(t => t.CategoryId == id);
        if (tempCategory is null) {
            return new Result(false, "Category not found: " + id);
        }
        
        tempCategory.CategoryId             = updatedCategory.CategoryId                != default ? updatedCategory.CategoryId                 : tempCategory.CategoryId;
        tempCategory.CategoryTitle          = updatedCategory.CategoryTitle             != default ? updatedCategory.CategoryTitle              : tempCategory.CategoryTitle;
        tempCategory.CategoryDescription    = updatedCategory.CategoryDescription       != default ? updatedCategory.CategoryDescription        : tempCategory.CategoryDescription;

        _context.SaveChanges();
        return new Result(true, "Successfully updated category: " + tempCategory.CategoryTitle);
    }
    public Result DeleteCategory(int id) {
        var category = _context.Categories.SingleOrDefault(t => t.CategoryId == id);
        if (category is null) {
            return new Result(false, "Category with id " + id + " not found.");
        }
        _context.Categories.Remove(category);
        _context.SaveChanges();
        return new Result(true, "Category removed successfully: " + category.CategoryTitle);
    }
}