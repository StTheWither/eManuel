namespace SQLlibrary.Entities
{
    public class Person
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = "";

        public string LastName { get; set; } = "";

         public string Username => FirstName.Trim() + LastName.Trim();

        public string Email { get; set; } = "";

        public string Password{ get; set; } = "";

        public string PhoneNumber{ get; set; } = "";

        public string Role { get; set; } = "";
    }
}