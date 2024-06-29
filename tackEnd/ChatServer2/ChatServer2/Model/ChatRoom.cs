using System.ComponentModel.DataAnnotations;

namespace ChatServer2.Model
{
    public class ChatRoom
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public bool IsGroup { get; set; }
        public virtual ICollection<AppUser>? Users { get; set; } 
        public virtual ICollection<Message>? Messages { get; set; }
    }
}
