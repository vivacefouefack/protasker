using ProTasker.Models;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ProTasker.Dto
{
    public class ExportDto
    {
        [Required]
        [StringLength(255, ErrorMessage = "error max is 255 caracters")]
        [Description("Libellé de la tâche")]
        public string Label { get; set; } = "0";

        [Description("Attribution")]
        public string Name { get; set; } = null!;

        [Required]
        [Description("Statut")]
        public State Status { get; set; }
    }
}
