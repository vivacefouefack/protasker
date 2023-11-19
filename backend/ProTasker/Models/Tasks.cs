using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProTasker.Models
{
    public class Tasks
    {
        [Key]
        public int Id { get; set; }

        public int? UserId { get; set; }

        [MaxLength(255)]
        public string Label { get; set; } = null!;

        public State Status { get; set; } = State.InProgress;

        public User User { get; set; } = null!;

    }
}
