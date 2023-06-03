using Microsoft.AspNetCore.Mvc;
using WebAPI.Business.Services;
using WebAPI.Business.Managers;
using WebAPI.Models;
using WebAPI.Core.Result;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]s")]
public class UserController : ControllerBase {

    private readonly IUserService _service;

    public UserController(BlogosphereContext context) {
        _service = new UserManager(context);
    }
    
    [HttpGet("GetAll")]
    public DataResult<List<User>> GetAll() {
        return new DataResult<List<User>>(true, _service.GetAll());
    }

    [HttpGet("GetById/{id}")]
    public DataResult<User> GetById(int id) {
        return _service.GetById(id); 
    }

    [HttpGet("GetByUsername/{username}")]
    public DataResult<User> GetByUsername(string username) {
        return _service.GetByUsername(username);
    }

    [HttpGet("GetByEmail/{email}")]
    public DataResult<User> GetByEmail(string email) {
        return _service.GetByEmail(email);
    }

    [HttpGet("GetAllCount")]
    public DataResult<int> GetAllCount() {
        return _service.GetAllCount();
    }

    [HttpGet("GetAllAlphabetically")]
    public DataResult<List<User>> GetAllAlphabetically() {
        return new DataResult<List<User>>(true, _service.GetAllAlphabetically());
    }

    [HttpGet("GetAllAlphabeticallyWithPages")]
    public DataResult<List<User>> GetAllAlphabeticallyWithPages([FromQuery] int PageSize, [FromQuery] int PageNumber) {
        return new DataResult<List<User>>(true, _service.GetAllAlphabeticallyWithPages(PageSize, PageNumber));
    }

    [HttpGet("VerifyByUsername")]
    public DataResult<int> VerifyByUsername([FromQuery] string UserName, [FromQuery] string Password) {
        return _service.VerifyByUsername(UserName, Password);
    }

    [HttpGet("VerifyByEmail")]
    public DataResult<int> VerifyByEmail([FromQuery] string Email, [FromQuery] string Password) {
        return _service.VerifyByEmail(Email, Password);
    }

    [HttpGet("BanUser")]
    public Result BanUser([FromQuery] int id) {
        return _service.BanUser(id);
    }

    [HttpGet("UnbanUser")]
    public Result UnbanUser([FromQuery] int id) {
        return _service.UnbanUser(id);
    }

    [HttpPost("RegisterUser")]
    public Result RegisterUser([FromBody] User user) {
        return _service.RegisterUser(user);
    }

    [HttpPut("UpdateUser/{id}")]
    public Result UpdateUser(int id, [FromBody] User updatedUser) {
        return _service.UpdateUser(id, updatedUser);
    }

    [HttpDelete("DeleteUser/{id}")]
    public Result DeleteUser(int id) {
        return _service.DeleteUser(id);
    }

}