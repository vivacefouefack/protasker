using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProTasker.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(255)]
        public string LastName { get; set; } = null!;

        [MaxLength(255)]
        public string FirstName { get; set; } = null!;

        [MaxLength(255)]
        public string Photo { get; set; } = null!;

        public ICollection<Tasks> Tasks { get; set; } = new List<Tasks>();
    }
}
