using ChatServer2.DTOs;
using ChatServer2.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatServer2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public NewsController(AppDbContext context)
        {
            this._context = context;
        }
        [Authorize]
        [HttpGet]
        [Route("[action]/{nb}")]
        public async Task<IActionResult> GetNews(int nb)
        {
            var _News = await _context.News
                .Where(ne => ne.Status == "accepted")
                .OrderByDescending(ne => ne.CreateAt)
                .Take(nb)
                .Include(ne => ne.User)
                .Select(ne => new
                {
                    ne.Id,
                    ne.Title,
                    ne.Description,
                    ne.CreateAt,
                    UserName = ne.User.UserName
                })
                .ToListAsync();
            if(_News.Count > 0)
            {
                return Ok(_News);
            }
            return NoContent();
        }
        [Authorize]
        [HttpGet]
        [Route("[action]/{nb}/{_Time}")]
        public async Task<IActionResult> GetMoreNews(int nb, DateTime _Time)
        {
            var _News = await _context.News
                .Where(ne => ne.Status == "accepted" && ne.CreateAt < _Time)
                .OrderByDescending (ne => ne.CreateAt)
                .Take(nb)
                .Include (ne => ne.User)
                .Select(ne => new
                {
                    ne.Id,
                    ne.Title,
                    ne.Description,
                    ne.CreateAt,
                    UserName = ne.User.UserName
                })
                .ToListAsync();
            if(_News.Count >0)
            {
                return Ok(_News);
            }
            return NoContent() ;
        }
        [Authorize]
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateNew(NewsDTO news)
        {
            News _news = new News();
            _news.Id = 0;
            _news.Title = news.Title;
            _news.Description = news.Description;
            _news.UserId = news.UserId;
            _news.CreateAt = DateTime.Now;
            _news.Status = "waiting";
            _context.News.Add(_news);
            await _context.SaveChangesAsync();
            return Ok(_news);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetForAdmin()
        {
            var _news = await _context.News
                .Where(ne => ne.Status == "waiting")
                .Include(ne => ne.User)
                .Select(ne => new
                {
                    ne.Id,
                    ne.Title,
                    ne.Description,
                    ne.CreateAt,
                    UserName = ne.User.UserName
                })
                .ToListAsync();
            return Ok(_news);
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("[action]/{id}")]
        public async Task<IActionResult> RemoveNews(int id)
        {
            var _new = await _context.News.FindAsync(id);
            if (_new != null)
            {
                _context.News.Remove(_new);
                await _context.SaveChangesAsync();
                return Ok(_new);
            }
            return BadRequest();
        }
        [Authorize(Roles="Admin")]
        [HttpPut]
        [Route("[action]/{id}")]
        public async Task<IActionResult> UpdateNewsStatus(int id)
        {
            var _News = await _context.News.FindAsync(id);
            if (_News != null)
            {
                _News.Status = "accepted";
                await _context.SaveChangesAsync();
                return Ok(_News);
            }
            return NotFound();
        }
    }
}
