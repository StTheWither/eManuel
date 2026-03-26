FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["minAPI/minAPI.csproj", "minAPI/"]
COPY ["SQLlibrary/SQLlibrary.csproj", "SQLlibrary/"]

RUN dotnet restore "minAPI/minAPI.csproj"

COPY . .

WORKDIR "/src/minAPI"
RUN dotnet publish "minAPI.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "minAPI.dll"]