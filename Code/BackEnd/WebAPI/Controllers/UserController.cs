using Microsoft.AspNetCore.Mvc;
using WebAPI.DataManagement;
using WebAPI.Entities;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]s")]
public class UserController : ControllerBase {
    
    [HttpGet("GetAll")]
    public IActionResult GetAll() {
        var userList = TempDatabase.UserList.OrderBy(x => x.userId).ToList<User>();
        if (userList is null) {
            return NotFound();
        }
        return Ok(userList);
    }

    [HttpGet("GetById/{id}")]
    public IActionResult GetById(int id) {
        var user = TempDatabase.UserList.Where(t => t.userId == id).SingleOrDefault();
        if (user is null) {
            return NotFound();
        }
        return Ok(user); 
    }

    [HttpGet("GetByUsername/{username}")]
    public IActionResult GetByUsername(string username) {
        var user = TempDatabase.UserList.Where(t => t.username.Equals(username)).SingleOrDefault();
        if (user is null) {
            return NotFound();
        }
        return Ok(user);
    }

    [HttpGet("GetByEmail/{email}")]
    public IActionResult GetByEmail(string email) {
        var user = TempDatabase.UserList.Where(t => t.email.Equals(email)).SingleOrDefault();
        if (user is null) {
            return NotFound();
        }
        return Ok(user);
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