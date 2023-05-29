using Microsoft.AspNetCore.Mvc;
using WebAPI.Business.Services;
using WebAPI.Core.Result;
using WebAPI.Models;

namespace WebAPI.Business.Managers;

public class ImageManager : IImageService {

    public IActionResult GetImage(string FilePath) {
        return new PhysicalFileResult(System.IO.Directory.GetCurrentDirectory() + "\\Assets\\" + FilePath, "image/jpeg");
    }
    public Result UploadImage(IFormFile file) {
        string fName = file.FileName;
        string path = Path.Combine(System.IO.Directory.GetCurrentDirectory(), "Assets/" + file.FileName);
        using (var stream = new FileStream(path, FileMode.Create))
        {
            file.CopyTo(stream);
        }
        return new Result(true, "File successfully uploaded: " + file.FileName);
    }
    public Result DeleteImage(string FileName) {
        File.Delete(System.IO.Directory.GetCurrentDirectory() + "\\Assets\\" + FileName);
        return new Result(true, "File successfully deleted: " + FileName);
    }

}