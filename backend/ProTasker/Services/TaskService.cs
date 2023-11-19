using Microsoft.EntityFrameworkCore;
using ProTasker.Context;
using ProTasker.Dto;
using ProTasker.Models;
using ProTasker.ServiceInterface;

namespace ProTasker.Services
{
    public class TaskService : ITaskService
    {
        private readonly ProTaskerDbContext _dbContext;

        public TaskService(ProTaskerDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public async Task<Tasks> CreateTask(TaskDto dto)
        {
            var newTask = new Tasks()
            {
                UserId = dto.UserId,
                Label = dto.Label,
                Status = dto.Status
            };
            if (newTask.UserId is not null){
                var user = await this._dbContext.Users.Include(u => u.Tasks).FirstOrDefaultAsync(t => t.Id == newTask.UserId);
                if (user is not null)
                {
                    newTask.User = user;
                }
            }
            else { newTask.UserId = null; }
            var result=await this._dbContext.Tasks.AddAsync(newTask);
            if (result is not null)
            {
                await this._dbContext.SaveChangesAsync();
            }
            else
            {
                throw new Exception("error to add task");
            }
            return result.Entity;
        }

        public async Task<Tasks> DeleteTask(int id)
        {
            var task = await this._dbContext.Tasks.FirstOrDefaultAsync(t => t.Id == id);
            if (task is null)
            {
                throw new Exception("task not found");
            }
            this._dbContext.Tasks.Remove(task);
            await this._dbContext.SaveChangesAsync();
            return task;

        }

        public async Task<List<Tasks>> GetAllTask()
        {
            var result = await this._dbContext.Tasks.ToListAsync();
            return result;
        }

        public async Task<Tasks> UpdateTaskById(int id, TaskDto dto)
        {
            var task = await _dbContext.Tasks.FirstOrDefaultAsync(t => t.Id == id);
            if (task is null)
            {
                throw new Exception("task not found");
            }
            task.UserId = dto.UserId;
            task.Label = dto.Label;
            task.Status = dto.Status;
            await _dbContext.SaveChangesAsync();
            return task;
        }

        public async Task<List<ExportDto>> GetTasksByLabelContains(string searchString)
        {
            if (string.IsNullOrEmpty(searchString))
            {               
                return await _dbContext.Tasks
                    .Select(task => new ExportDto
                    {
                        Label = task.Label,
                        Name=task.User.FirstName,
                        Status = task.Status
                    })
                    .ToListAsync();
            }
            else
            {
                return await _dbContext.Tasks
                    .Where(t => t.Label.Contains(searchString))
                    .Select(task => new ExportDto
                    {
                        Label = task.Label,
                        Name = task.User.FirstName,
                        Status = task.Status
                    })
                    .ToListAsync();
            }
        }
    }
}
