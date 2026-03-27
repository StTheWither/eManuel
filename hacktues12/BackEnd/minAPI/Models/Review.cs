namespace minAPI.Models;

public class Review
{
    public int Id { get; set; }
    public int TeacherId { get; set; }
    public int StudentId { get; set; }
    public int Rating { get; set; } // 1-5
    public string Comment { get; set; } = "";
    public string StudentName { get; set; } = "";
}