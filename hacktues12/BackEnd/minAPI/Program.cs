using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Data.Sqlite;
using Microsoft.IdentityModel.Tokens;
using minAPI.Models;
using SQLlibrary;

var builder = WebApplication.CreateBuilder(args);

// ── SWAGGER ──────────────────────────────────────────────
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ── CORS (allow frontend on any port) ────────────────────
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// ── JWT AUTH ──────────────────────────────────────────────
// var jwtKey = "hackathon-secret-key-32chars-min!!"; // store in appsettings in prod
// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options =>
//     {
//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             ValidateIssuerSigningKey = true,
//             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
//             ValidateIssuer = false,
//             ValidateAudience = false
//         };
//     });
// builder.Services.AddAuthorization();

var app = builder.Build();

// ── MIDDLEWARE ORDER MATTERS ──────────────────────────────
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors();
// app.UseAuthentication();
// app.UseAuthorization();
app.UseStaticFiles(); // for serving uploaded images

// ═══════════════════════════════════════════════════════════
//  AUTH ENDPOINTS
// ═══════════════════════════════════════════════════════════

// POST /auth/register
app.MapPost("/auth/register", (RegisterRequest req) =>
{

    // var exists = (long)(checkCmd.ExecuteScalar() ?? 0L);
    // if (exists > 0)
    //     return Results.BadRequest("Email already registered");

    // Hash password (simple for hackathon — use BCrypt in prod)
     // var hash = Convert.ToBase64String(
     //     System.Security.Cryptography.SHA256.HashData(Encoding.UTF8.GetBytes(req.Password))
     // );

    var callingOrganizer = new CallingOrganizer();
    var result = callingOrganizer.RegisterUser(req.Firstname, req.Lastname, req.Email, req.Pass, req.Role);

    return Results.Ok(new RegisterResponse
    {
        IsSuccessfulRegistration = result
    });
});


app.Run();