using System.ComponentModel.DataAnnotations;
using ProTasker.Models;

namespace ProTasker.Dto
{
    public class TaskDto
    {
        public int? UserId { get; set; }

        [Required]
        [StringLength(255,ErrorMessage ="error max is 255 caracters")]
        public string Label { get; set; } = "0";

        [Required]
        public State Status { get; set; } 
    }
}
