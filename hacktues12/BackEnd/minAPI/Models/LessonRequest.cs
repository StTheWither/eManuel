namespace minAPI.Models;

public class LessonRequest
{
    public int Id { get; set; }
    public Guid StudentId { get; set; }
    public Guid TeacherId { get; set; }
    public string Status { get; set; } = "pending"; // pending, accepted, rejected
    public string Message { get; set; } = "";
}