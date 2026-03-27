namespace SQLlibrary.Entities
{
    public class TeacherProfiles
    {
        public int Id { get; set; }

        public Guid TeacherId { get; set; }

        public string Subject { get; set; } = "";
        public string City { get; set; } = "";
        public string TeachingMode { get; set; } = "";
        public string Description { get; set; } = "";
        public decimal PricePerHour { get; set; }
        public string Grades { get; set; } = "";
    }
}