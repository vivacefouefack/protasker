using Microsoft.AspNetCore.Mvc;
using ProTasker.Dto;
using ProTasker.ServiceInterface;

namespace ProTasker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _service;

        public TasksController(ITaskService service)
        {
            this._service = service;
        }


        [HttpPost]
        public async Task<IActionResult> CreateTask(TaskDto dto)
        {
            try
            {
                var result=await this._service.CreateTask(dto);
                return Ok(result);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTask()
        {
            try
            {
                var result=await this._service.GetAllTask();
                return Ok(result);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateTaskById(int id,TaskDto dto)
        {
            try
            {
                var result=await this._service.UpdateTaskById(id,dto);
                return Ok(result);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            try
            {
                var result = await this._service.DeleteTask(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
