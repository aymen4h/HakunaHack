using System.ComponentModel.DataAnnotations;

namespace ChatServer2.DTOs
{
    public class NewsDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
    }
}
