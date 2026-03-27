using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Data.Sqlite;
using Microsoft.IdentityModel.Tokens;
using minAPI.Models;
using SQLlibrary;
using SQLlibrary.Data;
using SQLlibrary.Entities;
using System;
using System.Linq;
using System.Text.Json;

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
    static bool IsValidRole(string role)
{
    if (string.IsNullOrWhiteSpace(role))
        return false;

    string normalizedRole = role.Trim().ToLower();
    return normalizedRole == "student" || normalizedRole == "teacher";
}

    // var exists = (long)(checkCmd.ExecuteScalar() ?? 0L);
    // if (exists > 0)
    //     return Results.BadRequest("Email already registered");

    // Hash password (simple for hackathon — use BCrypt in prod)
     // var hash = Convert.ToBase64String(
     //     System.Security.Cryptography.SHA256.HashData(Encoding.UTF8.GetBytes(req.Password))
     // );


    if (string.IsNullOrWhiteSpace(req.Firstname) || !req.Firstname.All(char.IsLetter))
        return Results.BadRequest(new { Message = "Invalid first name" });
        
    if (string.IsNullOrWhiteSpace(req.Lastname) || !req.Lastname.All(char.IsLetter))
        return Results.BadRequest(new { Message = "Invalid last name" });

    if (string.IsNullOrWhiteSpace(req.Pass) || req.Pass.Length > 20)
        return Results.BadRequest(new { Message = "Invalid password" });

    if (string.IsNullOrWhiteSpace(req.Email) || !req.Email.Contains("@"))
        return Results.BadRequest(new { Message = "Invalid email" });

    if (!req.PhoneNumber.All(char.IsDigit) || req.PhoneNumber.Length < 8 || req.PhoneNumber.Length > 15)
        return Results.BadRequest(new { Message = "Invalid phone number" });

    
if (!IsValidRole(req.Role))
{
    return Results.BadRequest(new RegisterResponse
    {
        IsSuccessfulRegistration = false
    });
}
    string normalizedRole = req.Role.Trim().ToLower();
    var callingOrganizer = new CallingOrganizer();
    var result = callingOrganizer.RegisterUser(
        req.Firstname,
        req.Lastname,
        req.Email,
        req.Pass,
        req.PhoneNumber,
        normalizedRole
    );

    return Results.Ok(new RegisterResponse
    {
        IsSuccessfulRegistration = result
    });
});

app.MapPost("/auth/login", (LoginRequest req) =>
{
    if (string.IsNullOrWhiteSpace(req.Email))
    {
        return Results.BadRequest(new LoginResponse
        {
            IsSuccessfulLogin = false,
            Message = "Email is required"
        });
    }

    if (string.IsNullOrWhiteSpace(req.Password))
    {
        return Results.BadRequest(new LoginResponse
        {
            IsSuccessfulLogin = false,
            Message = "Password is required"
        });
    }

    var loginChecker = new LoginChecker();
    var result = loginChecker.LoginUser(req.Email, req.Password);

    if (result == LoginResult.UserNotFound)
    {
        return Results.Ok(new LoginResponse
        {
            IsSuccessfulLogin = false,
            Message = "User not found"
        });
    }

    if (result == LoginResult.WrongPassword)
    {
        return Results.Ok(new LoginResponse
        {
            IsSuccessfulLogin = false,
            Message = "Wrong password"
        });
    }

    return Results.Ok(new LoginResponse
    {
        IsSuccessfulLogin = true,
        Message = "Login successful"
    });
});

app.MapPost("/teacher/profile", (JsonElement req) =>
{
    try
    {
        // string teacherIdText = req.GetProperty("teacherId").GetString() ?? "";
        string subject = req.GetProperty("subject").GetString() ?? "";
        string city = req.GetProperty("city").GetString() ?? "";
        string teachingMode = req.GetProperty("teachingMode").GetString() ?? "";
        string description = req.GetProperty("description").GetString() ?? "";
        string grades = req.GetProperty("grades").GetString() ?? "";
        decimal pricePerHour = req.GetProperty("pricePerHour").GetDecimal();
        string firstName = req.GetProperty("firstName").GetString() ?? "";
        string lastName = req.GetProperty("lastName").GetString() ?? "";

        var teacherOrganizer = new TeacherProfileOrganizer();
        var result = teacherOrganizer.RegisterTeacherProfile(subject, city, teachingMode, description, pricePerHour, grades, firstName, lastName);

        return Results.Ok(new
        {
            IsSuccessful = result,
            Message = "Teacher profile created successfully"
        });
    }
    catch (Exception ex)
    {
        return Results.Problem(
            title: "Teacher profile error",
            detail: ex.Message
        );
    }
});

static bool IsValidTeachingMode(string teachingMode)
{
    if (string.IsNullOrWhiteSpace(teachingMode))
        return false;

    string normalizedMode = teachingMode.Trim().ToLower();

    return normalizedMode == "online"
        || normalizedMode == "in-person"
        || normalizedMode == "both";
}

app.MapPost("/student/profile", (JsonElement req) =>
{
    try
    {
        string subjects = req.GetProperty("subjects").GetString() ?? "";
        string city = req.GetProperty("city").GetString() ?? "";
        string preferredMode = req.GetProperty("preferredMode").GetString() ?? "";
        string description = req.GetProperty("description").GetString() ?? "";
        string freeTime = req.GetProperty("freeTime").GetString() ?? "";
        string grades = req.GetProperty("grades").GetString() ?? "";
        string firstName = req.GetProperty("firstName").GetString() ?? "";
        string lastName = req.GetProperty("lastName").GetString() ?? "";

        var studentOrganizer = new StudentProfileOrganizer();

        var result = studentOrganizer.RegisterStudentProfile(
            subjects,
            city,
            preferredMode,
            description,
            freeTime,
            grades,
            firstName,
            lastName
        );

        return Results.Ok(new
        {
            IsSuccessful = result,
            Message = "Student profile created successfully"
        });
    }
    catch (Exception ex)
    {
        return Results.Problem(
            title: "Student profile error",
            detail: ex.Message
        );
    }
});
//Message Endpoint(SenderID=ot person tablicata i da e podobno)
//var person = db.People.FirstOrDefault(p => p.FirstName == firstName && p.LastName == lastName);
//idto na lognat person e senderId-to
//RecieverId-to spisyk ot pr teacher teacher Id-to
app.MapPost("/message/send", (JsonElement req) =>
{
    try
    {
        string senderFirstName = req.GetProperty("senderFirstName").GetString() ?? "";
        string senderLastName = req.GetProperty("senderLastName").GetString() ?? "";
        string receiverIdText = req.GetProperty("receiverId").GetString() ?? "";
        string text = req.GetProperty("text").GetString() ?? "";

        if (!Guid.TryParse(receiverIdText, out Guid receiverId))
        {
            return Results.BadRequest(new
            {
                IsSuccessful = false,
                Message = "Invalid receiver id"
            });
        }

        var organizer = new MessageOrganizer();

        var result = organizer.SendMessage(
            senderFirstName,
            senderLastName,
            receiverId,
            text
        );

        return Results.Ok(new
        {
            IsSuccessful = result,
            Message = result ? "Message sent successfully" : "Message could not be sent"
        });
    }
    catch (Exception ex)
    {
        return Results.Problem(
            title: "Message send error",
            detail: ex.Message
        );
    }
});
app.Run();