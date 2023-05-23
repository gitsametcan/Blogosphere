using Microsoft.AspNetCore.Mvc;
using WebAPI.DataManagement;
using WebAPI.Entities;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]s")]
public class UserController : ControllerBase {
    
    [HttpGet("GetAll")]
    public List<User> GetAll() {
        var userList = TempDatabase.UserList.OrderBy(x => x.userId).ToList<User>();
        return userList;
    }

    [HttpGet("GetById/{id}")]
    public User GetById(int id) {
        var user = TempDatabase.UserList.Where(t => t.userId == id).SingleOrDefault();
        return user; 
    }
}