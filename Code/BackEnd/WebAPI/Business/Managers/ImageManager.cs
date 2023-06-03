using System.Security.Cryptography;
using System.Text;
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
        string fName = StringToSHA256(file.FileName);
        string path = System.IO.Directory.GetCurrentDirectory() + "\\Assets\\" + fName + ".jpg";
        using (var stream = new FileStream(path, FileMode.Create))
        {
            file.CopyTo(stream);
        }
        return new Result(true, fName + ".jpg");
    }
    public Result DeleteImage(string FileName) {
        File.Delete(System.IO.Directory.GetCurrentDirectory() + "\\Assets\\" + FileName);
        return new Result(true, "File successfully deleted: " + FileName);
    }

    private string StringToSHA256(string key)  {
        using (SHA256 sha256Hash = SHA256.Create()) {  
            byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(key));
            StringBuilder builder = new StringBuilder();
            foreach (var item in bytes) {
                builder.Append(item.ToString("x2"));
            }
            return builder.ToString();  
        }  
    }

}