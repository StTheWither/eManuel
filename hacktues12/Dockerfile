FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Трябва да добавим BackEnd/ пред пътищата
COPY ["BackEnd/minAPI/minAPI.csproj", "minAPI/"]
COPY ["BackEnd/SQLlibrary/SQLlibrary.csproj", "SQLlibrary/"]

RUN dotnet restore "minAPI/minAPI.csproj"

COPY BackEnd/ . 

RUN dotnet publish "minAPI/minAPI.csproj" -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /out .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "minAPI.dll"]