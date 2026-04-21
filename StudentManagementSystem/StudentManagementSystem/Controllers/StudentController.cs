using Microsoft.AspNetCore.Mvc;
using StudentManagementSystem.DTOs;
using StudentManagementSystem.Models;
using StudentManagementSystem.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
namespace StudentManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class StudentController: ControllerBase
    {
        private readonly IStudentService _service;

        public StudentController(IStudentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var students = await _service.GetAllStudents();
            //return Ok(students);
            return Ok(new ApiResponse<IEnumerable<Student>>
            {
                Success = true,
                Message = "Students fetched successfully",
                Data = students
            });

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var student = await _service.GetStudentById(id);

            return Ok(new ApiResponse<Student>
            {
                Success = true,
                Message = "Student fetched successfully",
                Data = student
            });
        }

        [HttpPost]
        public async Task<IActionResult> Add(StudentCreateDto dto)
        {
            var student = new Student
            {
                Name = dto.Name,
                Email = dto.Email,
                Age = dto.Age,
                Course = dto.Course
            };

            await _service.AddStudent(student);

            return Ok(new ApiResponse<string>
            {
                Success = true,
                Message = "Student created successfully",
                Data = null
            });
        }

        [HttpPut]
        public async Task<IActionResult> Update(StudentUpdateDto dto)
        {
            var student = new Student
            {
                Id = dto.Id,
                Name = dto.Name,
                Email = dto.Email,
                Age = dto.Age,
                Course = dto.Course
            };

            await _service.UpdateStudent(student);

            return Ok(new ApiResponse<string>
            {
                Success = true,
                Message = "Student updated successfully",
                Data = null
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteStudent(id);

            return Ok(new ApiResponse<string>
            {
                Success = true,
                Message = "Student deleted successfully",
                Data = null
            });
        }
    }
}
