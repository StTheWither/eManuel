using SQLlibrary.Data;
using SQLlibrary.Entities;

namespace SQLlibrary
{
    public class TeacherProfileOrganizer
    {
        public TeacherProfileOrganizer()
        {
        }

        public bool RegisterTeacherProfile(string subject, string city, string teachingMode, string description, decimal pricePerHour, string grades, string firstName, string lastName)
        {
            try
            {
                using var db = new AppDbContext();
                db.Database.EnsureCreated();

                var person = db.People.FirstOrDefault(p => p.FirstName == firstName && p.LastName == lastName);

                if (person != null)
                {
                    var currTeacher = db.TeacherProfiles.FirstOrDefault(tp => tp.TeacherId == person.Id);

                    if (currTeacher == null)
                    {
                        var teacherProfile = new TeacherProfiles
                        {
                            Id = Guid.NewGuid(),
                            TeacherId = person.Id,
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
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}