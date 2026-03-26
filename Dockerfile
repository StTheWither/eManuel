FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["hacktues12/BackEnd/minAPI/minAPI.csproj", "minAPI/"]
COPY ["hacktues12/BackEnd/SQLlibrary/SQLlibrary.csproj", "SQLlibrary/"]
RUN dotnet restore "minAPI/minAPI.csproj"

COPY hacktues12/BackEnd/ .
COPY hacktues12/my-hacktues-app/ .

RUN dotnet publish "minAPI/minAPI.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "minAPI.dll"]