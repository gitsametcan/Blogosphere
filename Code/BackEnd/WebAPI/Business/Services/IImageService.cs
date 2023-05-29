using Microsoft.AspNetCore.Mvc;
using WebAPI.Core.Result;

namespace WebAPI.Business.Services;

public interface IImageService {
    
    public IActionResult GetImage(string FilePath);
    public Result UploadImage(IFormFile file);
    public Result DeleteImage(string FileName);
}