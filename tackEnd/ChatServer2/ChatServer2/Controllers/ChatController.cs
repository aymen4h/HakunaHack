using ChatServer2.DTOs;
using ChatServer2.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatServer2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ChatController> _logger;
        public ChatController(AppDbContext context, ILogger<ChatController> logger)
        {
            this._context = context;
            _logger = logger;
        }
        [HttpGet]
        [Route("[action]/{roomName}/{userId}")]
        public async Task<IActionResult> GetRoomByName(string roomName, string userId)
        {
            var _Room = await _context.UserRooms
                .Where(s => s.ChatRoom.Name == roomName && s.UserId == userId)
                .Include(s => s.ChatRoom)
                .Select(s => new
                {
                    ChatRoomId = s.ChatRoomId,
                    ChatRoomName = roomName
                })
                .ToListAsync();
            if (_Room == null)
            {
                return NotFound();
            }
            return Ok(_Room);
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateNewChatRoom(ChatDTO _Room)
        {
            if(_Room == null)
            {
                return BadRequest("very bad");
            }
            ChatRoom chatRoom = new();
            chatRoom.Id = 0;
            chatRoom.Name = _Room.Name;
            chatRoom.IsGroup = true;
            
            _context.ChatRooms.Add(chatRoom);
            await _context.SaveChangesAsync();
            UserRoom userRoom = new UserRoom();
            userRoom.ChatRoomId = chatRoom.Id;
            userRoom.UserId = _Room.userId;
            _context.UserRooms.Add(userRoom);
            await _context.SaveChangesAsync();
            
            return Ok(_Room);
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Join(ChatDTO _Room)
        {
            UserRoom userRoom = new UserRoom();
            userRoom.ChatRoomId = _context.ChatRooms.Where(nn => nn.Name == _Room.Name).ToList()[0].Id;
            userRoom.UserId = _Room.userId;
            _context.UserRooms.Add(userRoom);
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpGet]
        [Route("[action]/{roomId}")]
        public async Task<IActionResult> GetMessages(int roomId)
        {
            var _messages = await _context.Messages
                .Where(me => me.ChatRoomId == roomId)
                .OrderByDescending(me => me.SentAt)
                .Take(10)
                .Include(me => me.User)
                .Select(me => new
                {
                    me.Id,
                    me.Content,
                    me.SenderId,
                    me.SentAt,
                    userName = me.User.UserName
                })
                .ToListAsync();
            return Ok(_messages);
        }
        [HttpGet]
        [Route("[action]/{roomId}/{lastTime}")]
        public async Task<IActionResult> GetMoreMessages(int roomId, DateTime lastTime)
        {
            var _messages = await _context.Messages
                .Where(me => me.ChatRoomId == roomId && me.SentAt < lastTime)
                .OrderByDescending(me => me.SentAt)
                .Take(10)
                .Include(me => me.User)
                .Select(me => new
                {
                    me.Id,
                    me.Content,
                    me.SenderId,
                    me.SentAt,
                    userName = me.User.UserName
                })
                .ToListAsync();
            return Ok(_messages);
        }
        [HttpGet]
        [Route("[action]/{userId}")]
        public async Task<IActionResult> GetRoomsForUser(string userId)
        {
            var _Room = await _context.UserRooms
                .Where(ur => ur.UserId == userId)
                .Include(ur => ur.ChatRoom)
                .Select(ur => new
                {
                    ur.ChatRoomId,
                    chatRoomName = ur.ChatRoom.Name
                })
                .ToListAsync();
            if (_Room == null)
            {
                return NotFound();
            }
            return Ok(_Room);
        }
    }
}
