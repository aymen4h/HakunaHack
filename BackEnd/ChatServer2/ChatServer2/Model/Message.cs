using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatServer2.Model
{
    public class Message
    {
        public int Id { get; set; }
        [Required]
        public string Content { get; set; } = string.Empty;
        [Required]
        public DateTime SentAt { get; set; }
        [Required]
        public string SenderId { get; set; } = string.Empty;
        [Required]
        public int ChatRoomId { get; set; }
        [ForeignKey("SenderId")]
        public AppUser? User { get; set; }
        [ForeignKey("ChatRoomId")]
        public ChatRoom? ChatRoom { get; set; }
    }
}
