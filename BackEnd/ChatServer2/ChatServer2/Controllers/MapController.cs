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
    public class MapController : ControllerBase
    {
        private readonly AppDbContext _context;
        public MapController(AppDbContext context)
        {
            this._context = context;
        }
        [Authorize]
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreatePlace(MapDTO Place)
        {
            DangerPlace _Place = new DangerPlace();
            _Place.Comment = Place.Comment;
            _Place.UserId = Place.UserId;
            _Place.longitude = Place.longitude;
            _Place.latitude = Place.latitude;
            _Place.CreatAt = DateTime.Now;
            _Place.Status = "waiting";
            _Place.Id = 0;
            _context.DangerPlaces.Add(_Place);
            await _context.SaveChangesAsync();
            return Ok(_Place);
        }
        [HttpGet]
        [Authorize]
        [Route("[action]")]
        public async Task<IActionResult> GetPlaces()
        {
            var Places = await _context.DangerPlaces
                .Where(pl => pl.Status == "accepted")
                .Include(pl => pl.User)
                .Select(pl => new
                {
                    pl.Id,
                    pl.Comment,
                    pl.CreatAt,
                    pl.longitude,
                    pl.latitude,
                    UserName = pl.User.UserName
                })
                .ToListAsync();
            return Ok(Places);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetPlacesForAdmin()
        {
            var _news = await _context.DangerPlaces
                .Where(ne => ne.Status == "waiting")
                .Include (ne => ne.User)
                .Select(ne => new
                {
                    ne.Id,
                    ne.latitude,
                    ne.longitude,
                    ne.Comment,
                    ne.CreatAt,
                    ne.User.UserName
                })
                .ToListAsync();
            return Ok(_news);
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("[action]/{id}")]
        public async Task<IActionResult> RemovePlaces(int id)
        {
            var _Place = await _context.DangerPlaces.FindAsync(id);
            if (_Place != null)
            {
                _context.DangerPlaces.Remove(_Place);
                await _context.SaveChangesAsync();
                return Ok(_Place);
            }
            return NotFound();
        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("[action]/{id}")]
        public async Task<IActionResult> UpdatePlacesStatus(int id)
        {
            var _Place = await _context.DangerPlaces.FindAsync(id);
            if (_Place != null)
            {
                _Place.Status = "accepted";
                await _context.SaveChangesAsync();
                return Ok(_Place);
            }
            return NotFound();
        }
    }
}
