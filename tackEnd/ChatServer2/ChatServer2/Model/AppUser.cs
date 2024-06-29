using Microsoft.AspNetCore.Identity;

namespace ChatServer2.Model
{
    public class AppUser : IdentityUser
    {
        public virtual ICollection<ChatRoom>? Rooms { get; set; }
        public virtual ICollection<Message>? Messages { get; set; }
        public virtual ICollection<DangerPlace>? DangerPlaces { get; set;}
        public virtual ICollection<News>? News { get; set; }
    }
}
