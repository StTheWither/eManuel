using SQLlibrary.Data;
using SQLlibrary.Entities;

namespace SQLlibrary
{
    public class CallingOrganizer
    {
        public CallingOrganizer()
        {
            
        }

        public bool RegisterUser(string FirstName, string LastName, string Email, string Password,string PhoneNumber, string Role)
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
                    Username = FirstName.Trim() + LastName.Trim(),
                    Email = Email,
                    Password = Password,
                    PhoneNumber = PhoneNumber,
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