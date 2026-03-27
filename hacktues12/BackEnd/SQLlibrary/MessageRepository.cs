using System.Linq;
using SQLlibrary.Data;
using SQLlibrary.Entities;

namespace SQLlibrary
{
    public class MessageRepository
    {
        public void AddMessage(Message message)
        {
            using var db = new AppDbContext();

            db.Database.EnsureCreated();

            db.Messages.Add(message);
            db.SaveChanges();
        }

        public List<Message> GetAllMessages()
        {
            using var db = new AppDbContext();

            db.Database.EnsureCreated();

            return db.Messages.ToList();
        }

        public List<Message> GetMessagesForUser(Guid userId)
        {
            using var db = new AppDbContext();

            db.Database.EnsureCreated();

            return db.Messages
                .Where(m => m.SenderId == userId || m.ReceiverId == userId)
                .OrderBy(m => m.SentAt)
                .ToList();
        }

        public List<Message> GetConversation(Guid firstUserId, Guid secondUserId)
        {
            using var db = new AppDbContext();

            db.Database.EnsureCreated();

            return db.Messages
                .Where(m =>
                    (m.SenderId == firstUserId && m.ReceiverId == secondUserId) ||
                    (m.SenderId == secondUserId && m.ReceiverId == firstUserId))
                .OrderBy(m => m.SentAt)
                .ToList();
        }
    }
}