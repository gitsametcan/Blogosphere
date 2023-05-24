using Microsoft.AspNetCore.Mvc;
using WebAPI.DataManagement;
using WebAPI.Entities;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]s")]
public class SessionController : ControllerBase {
    
    [HttpGet("FindUser")]
    public IActionResult FindUser([FromQuery] string SessionKey) {
        var session = TempDatabase.SessionList.Where(t => t.sessionKey == SessionKey).SingleOrDefault();
        
        if (session is null) {
            return NotFound("Session not found.");
        }

        var user = TempDatabase.UserList.Where(t=> t.userId == session.userId).SingleOrDefault();

        if (user is null) {
            return NotFound("Corresponding user for session(" + SessionKey + ") not found.");
        }

        return Ok(user);
    }

    [HttpPost("NewSession")]
    public IActionResult CreateSession([FromQuery] string SessionKey, [FromQuery] int userId) {
        Session session = new Session();
        session.sessionId = 0;
        session.sessionKey = SessionKey;
        session.userId = userId;
        
        var user = TempDatabase.UserList.Where(t => t.userId == userId).SingleOrDefault();
        if (user is null) {
            return NotFound("User not found.");
        }

        TempDatabase.SessionList.Add(session);
        return Ok();
    }
}