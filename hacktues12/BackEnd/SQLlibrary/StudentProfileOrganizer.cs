using SQLlibrary.Data;
using SQLlibrary.Entities;

namespace SQLlibrary
{
    public class StudentProfileOrganizer
    {

        public List<StudentProfiles> GetAllStudentProfiles()
        {
            var repository = new StudentProfilesRepository();
            return repository.GetAllStudentProfiles();
        }

        public StudentProfiles? GetStudentProfileById(Guid id)
        {
            var repository = new StudentProfilesRepository();
            return repository.GetStudentProfileByStudentId(id);
        }   
        
        public StudentProfileOrganizer()
        {
        }

        public bool RegisterStudentProfile(
            string subjects,
            string city,
            string preferredMode,
            string description,
            string freeTime,
            string grades,
            string firstName,
            string lastName)
        {
            try
            {
                using var db = new AppDbContext();
                db.Database.EnsureCreated();

                var person = db.People
                    .FirstOrDefault(p =>
                        p.FirstName == firstName &&
                        p.LastName == lastName);

                if (person != null)
                {
                    if (person.Role.Trim().ToLower() != "student")
                        return false;

                    var currStudent =
                        db.StudentProfiles
                        .FirstOrDefault(sp =>
                            sp.StudentId == person.Id);

                    if (currStudent == null)
                    {
                        var studentProfile =
                            new StudentProfiles
                            {
                                Id = Guid.NewGuid(),
                                StudentId = person.Id,
                                Subjects = subjects,
                                City = city,
                                PreferredMode = preferredMode,
                                Description = description,
                                FreeTime = freeTime,
                                Grades = grades
                            };

                        db.StudentProfiles.Add(studentProfile);
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