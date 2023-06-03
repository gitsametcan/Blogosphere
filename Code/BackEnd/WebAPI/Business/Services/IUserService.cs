using WebAPI.Core.Result;
using WebAPI.Models;

namespace WebAPI.Business.Services;


public interface IUserService {
    public List<User> GetAll();
    public DataResult<User> GetById(int id);
    public DataResult<User> GetByUsername(string username);
    public DataResult<User> GetByEmail(string email);
    public List<User> GetAllAlphabetically();
    public DataResult<int> GetAllCount();
    public List<User> SearchByUserName(string keyword);
    public int SearchByUserNameCount(string keyword);
    public List<User> SearchByUserNameWithPages(string keyword, int PageSize, int PageNumber);
    public List<User> GetAllAlphabeticallyWithPages(int PageSize, int PageNumber);
    public DataResult<int> VerifyByUsername(string UserName, string Password);
    public DataResult<int> VerifyByEmail(string Email, string Password);
    public Result BanUser(int id);
    public Result UnbanUser(int id);
    public Result RegisterUser(User newUser);
    public Result UpdateUser(int id, User updatedUser);
    public Result DeleteUser(int id);
}