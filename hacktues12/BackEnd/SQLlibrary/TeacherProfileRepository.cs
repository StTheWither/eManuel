 using System.Linq;
using SQLlibrary.Data;
using SQLlibrary.Entities;

namespace SQLlibrary
{
    public class TeacherProfilesRepository
    {
        public void AddTeacherProfile(TeacherProfiles profile)
        {
            using var db = new AppDbContext();
            db.Database.EnsureCreated();
            db.TeacherProfiles.Add(profile);
            db.SaveChanges();
        }

        public List<TeacherProfiles> GetAllTeacherProfiles()
        {
            using var db = new AppDbContext();
            db.Database.EnsureCreated();
            return db.TeacherProfiles.ToList();
        }

        public TeacherProfiles? GetTeacherProfileByTeacherId(Guid teacherId)
        {
            using var db = new AppDbContext();
            db.Database.EnsureCreated();
            return db.TeacherProfiles
                .FirstOrDefault(t => t.TeacherId == teacherId);
        }

        public List<TeacherProfiles> GetTeacherProfilesBySubject(string subject)
        {
            using var db = new AppDbContext();
            db.Database.EnsureCreated();
            return db.TeacherProfiles
                .Where(t => t.Subject.ToLower() ==
                            subject.Trim().ToLower())
                .ToList();
        }
    }
}