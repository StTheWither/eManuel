using System.Linq;
using SQLlibrary.Data;

namespace SQLlibrary
{
    public class UserChecker
    {
        public bool IsUserRegistered(string email)
        {
            using var db = new AppDbContext();

            db.Database.EnsureCreated();

            string normalizedEmail = email.Trim().ToLower();

            return db.People.Any(p => p.Email.ToLower() == normalizedEmail);
        }
    }
}