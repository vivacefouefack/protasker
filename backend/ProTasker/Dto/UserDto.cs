using System.ComponentModel.DataAnnotations;

namespace ProTasker.Dto
{
    public class UserDto
    {
        [Required]
        [StringLength(255)]
        public string LastName { get; set; } = null!;

        [Required]
        [StringLength(255)]
        public string FirstName { get; set; } = null!;


        [Required]
        [StringLength(255)]
        public string Photo { get; set; } = null!;

    }
}
