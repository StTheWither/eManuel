# 1. Използваме SDK за компилиране
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копираме проекта и теглим пакетите
COPY ["minAPI.csproj", "./"]
RUN dotnet restore "./minAPI.csproj"

# Копираме останалото и правим Publish
COPY . .
RUN dotnet publish "minAPI.csproj" -c Release -o /app/publish

# 2. Използваме лек Runtime за стартиране
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Render автоматично подава порт през променливата PORT
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "EduCrave.dll"]