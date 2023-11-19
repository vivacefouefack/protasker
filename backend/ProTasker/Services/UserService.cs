using Microsoft.EntityFrameworkCore;
using ProTasker.Context;
using ProTasker.Dto;
using ProTasker.Models;
using ProTasker.ServiceInterface;

namespace ProTasker.Services
{
    public class UserService:IUserService
    {
        private readonly ProTaskerDbContext _dbContext;

        public UserService(ProTaskerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<User>> GetAllUser()
        {
            var result = await this._dbContext.Users.ToListAsync();
            return result;
        }

        public async Task<User> CreateUser(UserDto dto)
        {
            var newUser = new User()
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Photo = dto.Photo
            };
            var result = await this._dbContext.Users.AddAsync(newUser);
            if (result is not null)
            {
                await this._dbContext.SaveChangesAsync();
            }
            else
            {
                throw new Exception("error to add user");
            }
            return result.Entity;
        }
    }
}
