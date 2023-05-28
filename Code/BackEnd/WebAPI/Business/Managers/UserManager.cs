using WebAPI.Core.Result;
using WebAPI.Models;
using WebAPI.Business.Services;

namespace WebAPI.Business.Managers;

public class UserManager : IUserService {
    private readonly BlogosphereContext _context;
    public UserManager(BlogosphereContext context) {
        _context = context;
    }
    public List<User> GetAll() {
        return _context.Users.ToList();
    }
    public DataResult<User> GetById(int id) {
        var user = _context.Users.SingleOrDefault(t => t.UserId == id);
        if (user is null) {
            return new DataResult<User>(false, null);
        }
        return new DataResult<User>(true, user);
    }
    public DataResult<User> GetByUsername(string username) {
        var user = _context.Users.SingleOrDefault(t => t.UserName == username);
        if (user is null) {
            return new DataResult<User>(false, null);
        }
        return new DataResult<User>(true, user);
    }
    public DataResult<User> GetByEmail(string email) {
        var user = _context.Users.SingleOrDefault(t => t.Email == email);
        if (user is null) {
            return new DataResult<User>(false, null);
        }
        return new DataResult<User>(true, user);
    }
    public Result RegisterUser(User newUser) {
        _context.Users.Add(newUser);
        _context.SaveChanges();
        return new Result(true, "New User created: " + newUser.UserName);
    }
    public Result UpdateUser(int id, User updatedUser) {
        var tempUser = _context.Users.SingleOrDefault(t => t.UserId == id);
        if (tempUser is null) {
            return new Result(false, "User not found: " + id);
        }
        
        tempUser.UserId     = updatedUser.UserId    != default ? updatedUser.UserId     : tempUser.UserId;
        tempUser.UserName   = updatedUser.UserName  != default ? updatedUser.UserName   : tempUser.UserName;
        tempUser.Email      = updatedUser.Email     != default ? updatedUser.Email      : tempUser.Email;
        tempUser.Password   = updatedUser.Password  != default ? updatedUser.Password   : tempUser.Password;
        tempUser.UserType   = updatedUser.UserType  != default ? updatedUser.UserType   : tempUser.UserType;
        tempUser.Blocked    = updatedUser.Blocked   != default ? updatedUser.Blocked    : tempUser.Blocked;

        _context.SaveChanges();
        return new Result(true, "User created successfully: " + updatedUser.UserName);
    }
    public Result DeleteUser(int id) {
        var user = _context.Users.SingleOrDefault(t => t.UserId == id);
        if (user is null) {
            return new Result(false, "User not found: " + id);
        }
        _context.Users.Remove(user);
        _context.SaveChanges();
        return new Result(true, "User deleted successfully: " + id);
    }
}