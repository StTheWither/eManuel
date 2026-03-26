using System.Linq;
using SQLlibrary.Data;

namespace SQLlibrary
{
    public class LoginChecker
    {
        public LoginResult LoginUser(string email, string password)
        {
            using var db = new AppDbContext();

            db.Database.EnsureCreated();

            string normalizedEmail = email.Trim().ToLower();

            var user = db.People.FirstOrDefault(p => p.Email.ToLower() == normalizedEmail);

            if (user == null)
            {
                return LoginResult.UserNotFound;
            }

            if (user.Password != password)
            {
                return LoginResult.WrongPassword;
            }

            return LoginResult.Success;
        }
    }
}