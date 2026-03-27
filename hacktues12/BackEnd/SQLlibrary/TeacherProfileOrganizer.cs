using SQLlibrary.Data;
using SQLlibrary.Entities;

namespace SQLlibrary
{
    public class TeacherProfileOrganizer
    {
        public TeacherProfileOrganizer()
        {
        }

        public bool RegisterTeacherProfile(Guid teacherId, string subject, string city, string teachingMode, string description, decimal pricePerHour, string grades)
        {
            try
            {
                using var db = new AppDbContext();

                db.Database.EnsureCreated();

                var teacherProfile = new TeacherProfiles
                {
                    TeacherId = teacherId,
                    Subject = subject,
                    City = city,
                    TeachingMode = teachingMode,
                    Description = description,
                    PricePerHour = pricePerHour,
                    Grades = grades
                };

                db.TeacherProfiles.Add(teacherProfile);
                db.SaveChanges();

                return true;
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}