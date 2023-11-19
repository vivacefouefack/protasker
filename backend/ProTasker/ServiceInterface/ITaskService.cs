using ProTasker.Dto;
using ProTasker.Models;

namespace ProTasker.ServiceInterface
{
    public interface ITaskService
    {
        public Task<Tasks> DeleteTask(int id);
        public Task<Tasks> UpdateTaskById(int id,TaskDto dto);
        public Task<List<Tasks>> GetAllTask();
        public Task<Tasks> CreateTask(TaskDto dto);
        public Task<List<ExportDto>> GetTasksByLabelContains(string searchString);
    }
}
