using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace ChatServer1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController(KafkaProducer _producer) : ControllerBase
    {
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> KafkaTry(string ch)
        {
            Message msg = new Message();
            msg.Content = ch;
            await _producer.ProduceMessageAsync("kaf", msg);
            return Ok("hello");
        }
    }
}
