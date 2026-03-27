using System;

namespace minAPI.Models
{
    public class SendMessageRequest
    {
        public string SenderFirstName { get; set; } = "";
        public string SenderLastName { get; set; } = "";
        public Guid ReceiverId { get; set; }
        public string Text { get; set; } = "";
    }

    public class SendMessageResponse
    {
        public bool IsSuccessful { get; set; }
        public string Message { get; set; } = "";
    }
}