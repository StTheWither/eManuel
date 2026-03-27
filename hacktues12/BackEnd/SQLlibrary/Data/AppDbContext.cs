using Microsoft.EntityFrameworkCore;
using SQLlibrary.Entities;

namespace SQLlibrary.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Person> People { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=.\\people2.db");
        }
    }
}