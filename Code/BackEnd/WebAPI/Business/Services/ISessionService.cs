using WebAPI.Core.Result;
using WebAPI.Models;

namespace WebAPI.Business.Services;

public interface ISessionService {

    public DataResult<User> FindUser(string SessionKey);
    public Result CreateSession(string SessionKey, int userId);
    public Result DeleteSession(string SessionKey);

}