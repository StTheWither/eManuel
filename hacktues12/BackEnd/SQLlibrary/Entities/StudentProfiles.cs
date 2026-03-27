namespace SQLlibrary.Entities
{
    public class StudentProfiles
    {
        public Guid Id { get; set; }

        public Guid StudentId { get; set; }

        public string Subjects { get; set; } = "";
        public string City { get; set; } = "";
        public string PreferredMode { get; set; } = "";
        public string Description { get; set; } = "";
        public string FreeTime { get; set; } = "";
        public string Grades { get; set; } = "";
    }
}