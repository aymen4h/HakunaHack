using System.ComponentModel.DataAnnotations;

namespace ChatServer1
{
    public class Message
    {
        public string Content { get; set; } = string.Empty;
        public string SenderId { get; set; } = string.Empty;
        public int ChatRoomId { get; set; }
    }
}
