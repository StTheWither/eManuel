# 1. Среда за компилация
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Трябва да укажем, че файловете са в BackEnd/ папка
COPY ["BackEnd/minAPI/minAPI.csproj", "minAPI/"]
COPY ["BackEnd/SQLlibrary/SQLlibrary.csproj", "SQLlibrary/"]

# Правим restore на основния проект
RUN dotnet restore "minAPI/minAPI.csproj"

# Копираме съдържанието на BackEnd папката в работната директория /app
COPY BackEnd/ .

# Компилираме minAPI
RUN dotnet publish "minAPI/minAPI.csproj" -c Release -o /out

# 2. Среда за стартиране
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /out .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "minAPI.dll"]