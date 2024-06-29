using ChatServer2.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ChatServer2.AuthRepo;

namespace ChatServer2.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController (Authenti auth) : ControllerBase
    {
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Register(RegisterDTO user)
        {
            var response = await auth.CreateAccount(user);
            return Ok(response);
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            var response = await auth.LoginAccount(loginDTO);
            return Ok(response);
        }
        [HttpGet, Authorize]
        [Route("[action]")]
        public  ActionResult CheckToken()
        {
            var name = User?.Identity?.Name;
            return Ok(name);
        }
    }
}
