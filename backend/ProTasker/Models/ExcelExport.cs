using OfficeOpenXml;

namespace ProTasker.Models
{
    public class ExcelExport
    {
        public static byte[] ExportToExcel<T>(List<T> data)
        {
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("task_list");
                worksheet.Cells.LoadFromCollection(data, true);
                return package.GetAsByteArray();
            }
        }
    }
}
