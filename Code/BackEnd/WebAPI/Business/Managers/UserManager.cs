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

    public DataResult<int> GetAllCount() {
        return new DataResult<int>(true, GetAll().Count());
    }

    public List<User> GetAllAlphabetically() {
        var userList = _context.Users.OrderBy(t => t.UserName).ToList();
        return userList;
    }

    public List<User> SearchByUserName(string keyword) {
        var userList = _context.Users.Where(t => t.UserName.Contains(keyword)).ToList();
        return userList;
    }

    public int SearchByUserNameCount(string keyword) {
        var userList = SearchByUserName(keyword);
        return userList.Count();
    }

    public List<User> SearchByUserNameWithPages(string keyword, int PageSize, int PageNumber) {
        var userList = SearchByUserName(keyword);
        var userListWithPages = userList.Skip(PageNumber * PageSize).Take(PageSize).ToList();
        return userListWithPages;
    }

    public List<User> GetAllAlphabeticallyWithPages(int PageSize, int PageNumber) {
        var userList = GetAllAlphabetically();
        var userListWithPages = userList.Skip(PageNumber * PageSize).Take(PageSize).ToList();
        return userListWithPages;
    }
    public DataResult<int> VerifyByUsername(string UserName, string Password) {
        var user = GetByUsername(UserName);
        if (user.Success && user.Data.Password == Password) {
            return new DataResult<int>(true, "UserName and Password matches.", user.Data.UserId);
        }
        return new DataResult<int>(false, 0);
    }
    public DataResult<int> VerifyByEmail(string Email, string Password) {
        var user = GetByEmail(Email);
        if (user.Success && user.Data.Password == Password) {
            return new DataResult<int>(true, "Email and Password matches.", user.Data.UserId);
        }
        return new DataResult<int>(false, 0);
    }

    public Result BanUser(int id) {
        var user = _context.Users.SingleOrDefault(t => t.UserId == id);
        if (user is null) {
            return new Result(false, "User not found.");
        }
        user.Blocked = 1;
        _context.SaveChanges();
        return new Result(true, "User banned: " + user.UserName);
    }
    public Result UnbanUser(int id) {
        var user = _context.Users.SingleOrDefault(t => t.UserId == id);
        if (user is null) {
            return new Result(false, "User not found.");
        }
        user.Blocked = 0;
        _context.SaveChanges();
        return new Result(true, "User unbanned: " + user.UserName);
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