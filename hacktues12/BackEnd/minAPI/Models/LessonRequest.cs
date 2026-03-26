namespace minAPI.Models;

public class LessonRequest
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public int TeacherId { get; set; }
    public string Status { get; set; } // pending / accepted
}