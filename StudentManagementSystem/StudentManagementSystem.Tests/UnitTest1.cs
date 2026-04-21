using Microsoft.Extensions.Logging;
using Moq;
using StudentManagementSystem.Models;
using StudentManagementSystem.Repositories.Interfaces;
using StudentManagementSystem.Services.Implementations;

namespace StudentManagementSystem.Tests;

public class StudentServiceTests
{
    private readonly Mock<IStudentRepository> _repositoryMock;
    private readonly StudentService _service;

    public StudentServiceTests()
    {
        _repositoryMock = new Mock<IStudentRepository>();
        var loggerMock = new Mock<ILogger<StudentService>>();
        _service = new StudentService(_repositoryMock.Object, loggerMock.Object);
    }

    [Fact]
    public async Task GetAllStudents_ReturnsAllStudents()
    {
        var students = new List<Student>
        {
            new() { Id = 1, Name = "Alice", Email = "alice@test.com", Age = 20, Course = "Math" },
            new() { Id = 2, Name = "Bob", Email = "bob@test.com", Age = 22, Course = "CS" }
        };

        _repositoryMock.Setup(r => r.GetAllAsync()).ReturnsAsync(students);

        var result = await _service.GetAllStudents();

        Assert.Equal(2, result.Count());
    }

    [Fact]
    public async Task GetStudentById_WhenStudentExists_ReturnsStudent()
    {
        var student = new Student
        {
            Id = 10,
            Name = "John",
            Email = "john@test.com",
            Age = 19,
            Course = "Physics"
        };

        _repositoryMock.Setup(r => r.GetByIdAsync(10)).ReturnsAsync(student);

        var result = await _service.GetStudentById(10);

        Assert.Equal("John", result.Name);
        Assert.Equal("Physics", result.Course);
    }

    [Fact]
    public async Task GetStudentById_WhenStudentDoesNotExist_ThrowsException()
    {
        _repositoryMock.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((Student)null!);

        var ex = await Assert.ThrowsAsync<Exception>(() => _service.GetStudentById(999));

        Assert.Equal("Student not found", ex.Message);
    }

    [Fact]
    public async Task AddStudent_SetsCreatedDate_AndCallsRepository()
    {
        var student = new Student
        {
            Name = "Sarah",
            Email = "sarah@test.com",
            Age = 21,
            Course = "Biology"
        };

        await _service.AddStudent(student);

        _repositoryMock.Verify(r => r.AddAsync(student), Times.Once);
        Assert.NotEqual(default, student.CreatedDate);
    }

    [Fact]
    public async Task UpdateStudent_AndDeleteStudent_CallRepositoryMethods()
    {
        var student = new Student
        {
            Id = 3,
            Name = "Mike",
            Email = "mike@test.com",
            Age = 23,
            Course = "Chemistry"
        };

        await _service.UpdateStudent(student);
        await _service.DeleteStudent(3);

        _repositoryMock.Verify(r => r.UpdateAsync(student), Times.Once);
        _repositoryMock.Verify(r => r.DeleteAsync(3), Times.Once);
    }
}
