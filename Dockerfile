# 1. Използваме SDK за компилиране
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Копиране на файловете и възстановяване на пакетите
COPY *.csproj ./
RUN dotnet restore

# Компилиране на приложението
COPY . ./
RUN dotnet publish -c Release -o out

# Финално изображение
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "YourProjectName.dll"]