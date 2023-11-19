using ProTasker.Dto;
using ProTasker.Models;

namespace ProTasker.ServiceInterface
{
    public interface IUserService
    {
        public Task<User> CreateUser(UserDto dto);
        public Task<List<User>> GetAllUser();
    }
}
