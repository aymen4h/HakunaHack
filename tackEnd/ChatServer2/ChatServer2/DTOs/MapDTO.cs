using System.ComponentModel.DataAnnotations;

namespace ChatServer2.DTOs
{
    public class MapDTO
    {
        public string Comment { get; set; } = string.Empty;
        public int longitude { get; set; }
        public int latitude { get; set; }
        public string UserId { get; set; } = string.Empty;
    }
}
