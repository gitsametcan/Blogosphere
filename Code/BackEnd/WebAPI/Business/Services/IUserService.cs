using WebAPI.Core.Result;
using WebAPI.Models;

namespace WebAPI.Business.Services;


public interface IUserService {
    public List<User> GetAll();
    public DataResult<User> GetById(int id);
    public DataResult<User> GetByUsername(string username);
    public DataResult<User> GetByEmail(string email);
    public List<User> GetAllAlphabetically();
    public List<User> GetAllAlphabeticallyWithPages(int PageSize, int PageNumber);
    public DataResult<int> VerifyByUsername(string UserName, string Password);
    public DataResult<int> VerifyByEmail(string Email, string Password);
    public Result RegisterUser(User newUser);
    public Result UpdateUser(int id, User updatedUser);
    public Result DeleteUser(int id);
}