using Microsoft.AspNetCore.Mvc;
using ProTasker.Dto;
using ProTasker.Models;
using ProTasker.ServiceInterface;

namespace ProTasker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExcelexportController : ControllerBase
    {
        private readonly ITaskService _service;

        public ExcelexportController(ITaskService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> ExportAllTasksToExcel()
        {
            List<ExportDto> allTasks = await _service.GetTasksByLabelContains("");
            byte[] excelData = ExcelExport.ExportToExcel(allTasks);
            return File(excelData, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "exported_tasks.xlsx");
        }

        [HttpGet("search")]
        public async Task<IActionResult> ExportSearchTasksToExcel(string searchText)
        {
            List<ExportDto> allTasks = await _service.GetTasksByLabelContains(searchText);
            byte[] excelData = ExcelExport.ExportToExcel(allTasks);
            return File(excelData, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "exported_tasks.xlsx");
        }
    }
}
