using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatServer2.Model
{
    public class DangerPlace
    {
        public int Id { get; set; }
        [Required]
        public string Comment { get; set; } = string.Empty;
        [Required]
        public string Status { get; set; } = string.Empty;
        [Required]

        public int longitude { get; set; }
        [Required]
        public int latitude { get; set; }
        [Required]
        public DateTime CreatAt { get; set; }
        public string UserId { get; set; } = string.Empty;
        [ForeignKey("UserId")]
        public AppUser? User { get; set; }
    }
}
