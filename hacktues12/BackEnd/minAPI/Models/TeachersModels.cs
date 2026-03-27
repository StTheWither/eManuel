using System;

namespace minAPI.Models
{
    public class CreateTeacherProfileRequest
    {
        public Guid TeacherId { get; set; }
        public string Subject { get; set; } = "";
        public string City { get; set; } = "";
        public string TeachingMode { get; set; } = "";
        public string Description { get; set; } = "";
        public decimal PricePerHour { get; set; }
        public string Grades { get; set; } = "";
    }

    public class CreateTeacherProfileResponse
    {
        public bool IsSuccessful { get; set; }
        public string Message { get; set; } = "";
    }
}