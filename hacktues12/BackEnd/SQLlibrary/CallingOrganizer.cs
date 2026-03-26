using SQLlibrary.Data;
using SQLlibrary.Entities;

namespace SQLlibrary
{
    public class CallingOrganizer
    {
        public CallingOrganizer()
        {
            
        }

        public bool RegisterUser(string FirstName, string LastName , string Email, string Password, string Role)
        {
            try
            {
                using var db = new AppDbContext();

                db.Database.EnsureCreated();

                var person = new Person
                {
                    Id = Guid.NewGuid(),
                    FirstName = FirstName,
                    LastName = LastName,
                    Email = Email,
                    Password = Password,
                    Role = Role
                };

                db.People.Add(person);
                db.SaveChanges();

                return true;
            }
            catch (System.Exception)
            {
                return false;
            }
        }
    }
}