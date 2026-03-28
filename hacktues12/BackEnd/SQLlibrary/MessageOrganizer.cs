using SQLlibrary.Data;
using SQLlibrary.Entities;

namespace SQLlibrary
{
    public class MessageOrganizer
    {

         public List<Message> GetMessagesForReceiver(Guid receiverId)
        {
            using var context = new AppDbContext();
            return context.Set<Message>()
                .Where(m => m.ReceiverId == receiverId)
                .ToList();
        }

        public MessageOrganizer()
        {
        }

        public bool SendMessage(
            string senderFirstName,
            string senderLastName,
            Guid receiverId,
            string text)
        {
            try
            {
                using var db = new AppDbContext();
                db.Database.EnsureCreated();

                var sender = db.People.FirstOrDefault(p =>
                    p.FirstName == senderFirstName &&
                    p.LastName == senderLastName);

                if (sender == null)
                    return false;

                var receiver = db.People.FirstOrDefault(p => p.Id == receiverId);

                if (receiver == null)
                    return false;

                if (string.IsNullOrWhiteSpace(text))
                    return false;

                var message = new Message
                {
                    Id = Guid.NewGuid(),
                    SenderId = sender.Id,
                    ReceiverId = receiverId,
                    Text = text.Trim(),
                    SentAt = DateTime.UtcNow
                };

                db.Messages.Add(message);
                db.SaveChanges();

                return true;
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}