using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ChatServer2.Model
{
    public class AppDbContext(DbContextOptions options) : IdentityDbContext<AppUser, Roles, string>(options)
    {
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<ChatRoom> ChatRooms { get; set; }
        public DbSet<DangerPlace> DangerPlaces { get; set;}
        public DbSet<Message> Messages { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<UserRoom> UserRooms { get; set; }
    }
}
