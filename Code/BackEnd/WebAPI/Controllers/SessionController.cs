using Microsoft.AspNetCore.Mvc;
using WebAPI.Business.Managers;
using WebAPI.Business.Services;
using WebAPI.Core.Result;
using WebAPI.Models;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]s")]
public class SessionController : ControllerBase {

    private readonly ISessionService _service;

    public SessionController(BlogosphereContext context) {
        _service = new SessionManager(context);
    }

    [HttpGet("FindUser")]
    public DataResult<User> FindUser([FromQuery] string SessionKey) {
        return new DataResult<User>(true, _service.FindUser(SessionKey));
    }

    [HttpPost("NewSession")]
    public Result CreateSession([FromQuery] string SessionKey, [FromQuery] int userId) {
        return _service.CreateSession(SessionKey, userId);
    }

    [HttpDelete("DeleteSession")]
    public Result DeleteSession([FromQuery] string SessionKey) {
        return _service.DeleteSession(SessionKey);
    }
}