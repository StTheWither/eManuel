namespace minAPI.Models;

public class TeacherProfile
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Subject { get; set; }
    public double Price { get; set; }
    public string Description { get; set; }
}