using WebAPI.Business.Services;
using WebAPI.Core.Result;
using WebAPI.Models;

namespace WebAPI.Business.Managers;

public class SessionManager : ISessionService {

    private readonly BlogosphereContext _context;
    public SessionManager(BlogosphereContext context) {
        _context = context;
    }

    public User FindUser(string SessionKey) {
        var session = _context.Sessions.SingleOrDefault(t => t.SessionKey == SessionKey);
        var user = _context.Users.SingleOrDefault(t => t.UserId == session.UserId);
        return user;
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