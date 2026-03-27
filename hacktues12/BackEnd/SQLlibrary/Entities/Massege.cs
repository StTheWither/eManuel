namespace SQLlibrary.Entities
{
    public class Message
    {
        public Guid Id { get; set; }

        public Guid  SenderId { get; set; }

        public Guid ReceiverId { get; set; }

        public string Text { get; set; } = "";

        public DateTime SentAt { get; set; } = DateTime.UtcNow;
    }
}