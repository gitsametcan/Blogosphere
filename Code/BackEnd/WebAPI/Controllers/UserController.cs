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

    [HttpGet("GetByUsername/{username}")]
    public User GetByUsername(string username) {
        var user = TempDatabase.UserList.Where(t => t.username.Equals(username)).SingleOrDefault();
        return user;
    }

    [HttpGet("GetByEmail/{email}")]
    public User GetByEmail(string email) {
        var user = TempDatabase.UserList.Where(t => t.email.Equals(email)).SingleOrDefault();
        return user;
    }

    [HttpPost("RegisterUser")]
    public IActionResult RegisterUser([FromBody] User user) {
        var tempuser = TempDatabase.UserList
            .Where(t => t.username == user.username || t.email == user.email || t.userId == user.userId)
            .SingleOrDefault();
        if (tempuser is not null) {
            return BadRequest();
        }
        TempDatabase.UserList.Add(user);
        return Ok();
    }

}