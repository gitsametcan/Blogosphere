using WebAPI.Business.Services;
using WebAPI.Core.Result;
using WebAPI.Models;

namespace WebAPI.Business.Managers;

public class SessionManager : ISessionService {

    private readonly BlogosphereContext _context;
    public SessionManager(BlogosphereContext context) {
        _context = context;
    }

    public DataResult<User> FindUser(string SessionKey) {
        var session = _context.Sessions.SingleOrDefault(t => t.SessionKey == SessionKey);
        if (session is null) {
            return new DataResult<User>(false, "Session is not available: " + SessionKey, null);
        }
        var user = _context.Users.SingleOrDefault(t => t.UserId == session.UserId);
        if (user is null) {
            return new DataResult<User>(false, "User is not available: " + session.UserId, null);
        }
        return new DataResult<User>(true, "Session successfully found.", user);
    }
    public Result CreateSession(string SessionKey, int userId) {
        Session session = new Session();
        session.SessionId = 0;
        session.SessionKey = SessionKey;
        session.UserId = userId;
        _context.Sessions.Add(session);
        _context.SaveChanges();
        return new Result(true, "Session successfully created : " + SessionKey);
    }
    public Result DeleteSession(string SessionKey) {
        var session = _context.Sessions.SingleOrDefault(t => t.SessionKey == SessionKey);
        if (session is null) {
            return new Result(false, "Sessions not found: " + SessionKey);
        }
        _context.Sessions.Remove(session);
        _context.SaveChanges();
        return new Result(true, "Session deleted successfully: " + SessionKey);
    }
}