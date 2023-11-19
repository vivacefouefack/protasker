using Microsoft.AspNetCore.Mvc;
using ProTasker.Dto;
using ProTasker.ServiceInterface;

namespace ProTasker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            this._service = service;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(UserDto dto)
        {
            try
            {
                var result = await this._service.CreateUser(dto);
                return Ok(result);
            }
            catch(Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            try
            {
                var result = await this._service.GetAllUser();
                return Ok(result);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
