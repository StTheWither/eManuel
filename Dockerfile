FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["hacktues12/BackEnd/minAPI/minAPI.csproj", "minAPI/"]
COPY ["BackEnd/SQLlibrary/SQLlibrary.csproj", "SQLlibrary/"]

RUN dotnet restore "BackEnd/minAPI/minAPI.csproj"

COPY BackEnd/ .

RUN dotnet publish "BackEnd/minAPI/minAPI.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "minAPI.dll"]