FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY StudentManagementSystem.sln ./
COPY StudentManagementSystem/*.csproj StudentManagementSystem/
RUN dotnet restore StudentManagementSystem/StudentManagementSystem.csproj

COPY StudentManagementSystem/. StudentManagementSystem/
WORKDIR /src/StudentManagementSystem
RUN dotnet publish StudentManagementSystem.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "StudentManagementSystem.dll"]
