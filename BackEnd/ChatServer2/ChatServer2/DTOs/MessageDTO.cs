namespace ChatServer2.DTOs
{
    public class MessageDTO
    {
        public string Content { get; set; } = string.Empty;
        public string SenderId { get; set; } = string.Empty;
        public int ChatRoomId { get; set; }
    }
}
