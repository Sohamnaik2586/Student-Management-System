using Microsoft.AspNetCore.Razor.TagHelpers;
using StudentManagementSystem.Models;
using StudentManagementSystem.Repositories.Interfaces;
using StudentManagementSystem.Services.Interfaces;
namespace StudentManagementSystem.Services.Implementations
{
    public class StudentService: IStudentService
    {
        private readonly IStudentRepository _repository;
        private readonly ILogger<StudentService> _logger;

        public StudentService(IStudentRepository repository, ILogger<StudentService> logger)
        {
            _repository = repository;
            _logger = logger;
        }
        public async Task<IEnumerable<Student>> GetAllStudents()
        {
            _logger.LogInformation("Fetching all students");
            return await _repository.GetAllAsync();
        }
        public async Task<Student> GetStudentById(int id)
        {
            _logger.LogInformation($"Fetching student with ID: {id}");

            var student = await _repository.GetByIdAsync(id);

            if (student == null)
            {
                _logger.LogWarning($"Student not found with ID: {id}");
                throw new Exception("Student not found");
            }

            return student;
        }

        public async Task AddStudent(Student student)
        {
            _logger.LogInformation("Adding new student");

            student.CreatedDate = DateTime.Now;
            await _repository.AddAsync(student);
        }

        public async Task UpdateStudent(Student student)
        {
            _logger.LogInformation($"Updating student with ID: {student.Id}");
            await _repository.UpdateAsync(student);
        }

        public async Task DeleteStudent(int id)
        {
            _logger.LogInformation($"Deleting student with ID: {id}");
            await _repository.DeleteAsync(id);
        }
    }
}
