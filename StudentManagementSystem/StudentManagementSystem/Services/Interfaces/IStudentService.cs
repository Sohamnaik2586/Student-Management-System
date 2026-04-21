using StudentManagementSystem.Models;
namespace StudentManagementSystem.Services.Interfaces
{
    public interface IStudentService
    {
        Task<IEnumerable<Student>> GetAllStudents();
        Task<Student> GetStudentById(int id);
        Task AddStudent(Student student);
        Task UpdateStudent(Student student);
        Task DeleteStudent(int id);
    }
}
