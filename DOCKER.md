# Full Stack Docker Run Guide

## Prerequisites

- Docker Desktop installed and running

## Build and run

From the project root:

```powershell
docker compose up --build -d
```

## Access

- Frontend: http://localhost:8080
- Backend API: http://localhost:8081/api
- SQL Server: localhost,1433

## Default login

- Username: admin
- Password: password

## Useful commands

Show running containers:

```powershell
docker compose ps
```

View logs:

```powershell
docker compose logs -f
```

Stop everything:

```powershell
docker compose down
```

Stop and remove database volume:

```powershell
docker compose down -v
```

## Optional: set a stronger SQL password

PowerShell:

```powershell
$env:SA_PASSWORD="YourStrongPassword123!"; docker compose up --build -d
```
