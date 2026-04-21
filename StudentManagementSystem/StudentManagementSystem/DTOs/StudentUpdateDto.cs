using System.ComponentModel.DataAnnotations;

namespace StudentManagementSystem.DTOs
{
    public class StudentUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Range(1, 100)]
        public int Age { get; set; }

        [Required]
        public string Course { get; set; }
    }
}