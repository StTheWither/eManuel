using SQLlibrary.Data;
using SQLlibrary.Entities;

namespace SQLlibrary
{
    public class CallingOrganizer
    {
        public void RegisterUser(int Id, string FirstName, string LastName , string Email, string Password, string Role)
        {
            using var db = new AppDbContext();

            db.Database.EnsureCreated();

            var person = new Person
            {
                Id = Id,
                FirstName = FirstName,
                LastName = LastName,
                Email = Email,
                Password = Password,
                Role = Role

            };

            db.People.Add(person);
            db.SaveChanges();
        }
    }
}