# Student Management System

A full-stack Student Management System built for the ASP.NET Core Web API assignment.

This project includes:

- ASP.NET Core Web API backend
- React frontend (Vite)
- SQL Server database
- JWT authentication
- Global exception handling middleware
- Serilog logging
- Swagger API documentation
- Layered architecture (Controller -> Service -> Repository)
- Unit tests (backend + frontend)
- Dockerized full-stack deployment

## Assignment Coverage

### 1) Assignment Task

Implemented all required operations:

- Get all students
- Add new student
- Update student
- Delete student

### 2) Technical Requirements

Implemented:

- JWT Authentication
- Global Exception Handling (custom middleware)
- Logging (Serilog)
- Swagger API Documentation
- Layered Architecture

### 3) Database

- SQL Server used
- Student table fields:
  - Id
  - Name
  - Email
  - Age
  - Course
  - CreatedDate

### 4) Expected Output

Delivered:

- Working APIs with proper responses
- Clean, structured project layout
- JWT-secured student endpoints

### 5) Submission

- Code uploaded to GitHub
- This README includes setup and run steps

### 6) Evaluation Criteria Alignment

- Code quality: clear separation of concerns and DTO usage
- Architecture: controller/service/repository layers
- Error handling: centralized exception middleware
- Security: JWT-based endpoint protection
- API functionality: full CRUD + authentication

### 7) Bonus

Implemented bonus items:

- Unit testing
- Docker
- React UI

---

## Tech Stack

### Backend

- ASP.NET Core 8 Web API
- Entity Framework Core (SQL Server)
- JWT Bearer Authentication
- Serilog
- Swagger (Swashbuckle)
- xUnit + Moq

### Frontend

- React 19 + Vite
- Axios
- React Router
- Vitest + React Testing Library

### Infrastructure

- Docker + Docker Compose
- SQL Server container
- Nginx (frontend container runtime)

---

## Project Structure

- StudentManagementSystem/
  - StudentManagementSystem/ (Web API)
  - StudentManagementSystem.Tests/ (xUnit tests)
- student-ui/ (React frontend)
- docker-compose.yml

---

## API Endpoints

Base URL (local backend):

- http://localhost:5129/api
- or https://localhost:7153/api

Base URL (Docker backend):

- http://localhost:8081/api

### Auth

- POST /api/auth/login?username=admin&password=password
  - Returns JWT token

### Students (JWT protected)

- GET /api/student
- GET /api/student/{id}
- POST /api/student
- PUT /api/student
- DELETE /api/student/{id}

### Sample Student Payload

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 21,
  "course": "Computer Science"
}
```

---

## Local Setup (Without Docker)

## Prerequisites

- .NET SDK 8+
- Node.js 20+
- SQL Server

## 1) Run backend

1. Open terminal in `StudentManagementSystem/StudentManagementSystem`
2. Update connection string in `appsettings.json` if needed
3. Start API:

```powershell
dotnet run
```

Backend runs on:

- https://localhost:7153
- http://localhost:5129

Swagger:

- https://localhost:7153/swagger
- http://localhost:5129/swagger

## 2) Run frontend

1. Open terminal in `student-ui`
2. Install packages:

```powershell
npm install
```

3. Run app:

```powershell
npm run dev
```

Frontend:

- http://localhost:5173

Default login credentials:

- Username: admin
- Password: password

---

## Docker Setup (Recommended)

From project root:

```powershell
docker compose up --build -d
```

Services:

- Frontend: http://localhost:8080
- Backend: http://localhost:8081/api
- SQL Server: localhost:1433

Stop services:

```powershell
docker compose down
```

Stop and remove DB volume:

```powershell
docker compose down -v
```

Detailed Docker instructions are in `DOCKER.md`.

---

## Testing

## Backend Tests (xUnit)

From `StudentManagementSystem`:

```powershell
dotnet test StudentManagementSystem.Tests/StudentManagementSystem.Tests.csproj
```

## Frontend Tests (Vitest)

From `student-ui`:

```powershell
npm run test
```

---

## Security Notes

- JWT is required for student CRUD endpoints.
- Current login uses fixed demo credentials (`admin` / `password`) for assignment/demo purposes.
- For production, replace demo login with real user management and secure secret handling.

---

## Author

Soham Naik
