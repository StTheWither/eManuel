using System.Linq;
using SQLlibrary.Data;
using SQLlibrary.Entities;

namespace SQLlibrary
{
    public class StudentProfilesRepository
    {
        public void AddStudentProfile(StudentProfiles profile)
        {
            using var db = new AppDbContext();

            db.Database.EnsureCreated();

            db.StudentProfiles.Add(profile);
            db.SaveChanges();
        }

        public List<StudentProfiles> GetAllStudentProfiles()
        {
            using var db = new AppDbContext();

            db.Database.EnsureCreated();

            return db.StudentProfiles.ToList();
        }

        public StudentProfiles? GetStudentProfileByStudentId(Guid studentId)
        {
            using var db = new AppDbContext();

            db.Database.EnsureCreated();

            return db.StudentProfiles
                .FirstOrDefault(s => s.StudentId == studentId);
        }

        public List<StudentProfiles> GetStudentProfilesBySubject(string subject)
        {
            using var db = new AppDbContext();

            db.Database.EnsureCreated();

            return db.StudentProfiles
                .Where(s =>
                    s.Subjects.ToLower() ==
                    subject.Trim().ToLower())
                .ToList();
        }
    }
}