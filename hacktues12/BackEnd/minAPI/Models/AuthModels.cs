namespace minAPI.Models;

public class RegisterRequest
{
    public string Firstname { get; set; } = "";
    public string Lastname { get; set; } = "";
    public string Email { get; set; } = "";
    public string Pass { get; set; } = "";
    public string Role { get; set; } = "student";
    public string PhoneNumber{ get; set; } = "";
}

public class LoginRequest
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}

public class RegisterResponse
{
    public bool IsSuccessfulRegistration { get; set; } = false;

}