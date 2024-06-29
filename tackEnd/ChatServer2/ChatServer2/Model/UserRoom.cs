using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatServer2.Model
{
    [PrimaryKey(nameof(UserId), nameof(ChatRoomId))]
    public class UserRoom
    {
        public string UserId { get; set; } = string.Empty;
        [ForeignKey("UserId")]
        public AppUser? User { get; set; } 
        public int ChatRoomId { get; set; }
        [ForeignKey("ChatRoomId")]
        public ChatRoom? ChatRoom { get; set; } 
    }
}
