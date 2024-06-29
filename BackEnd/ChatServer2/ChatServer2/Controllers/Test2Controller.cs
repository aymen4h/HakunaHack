using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatServer2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Test2Controller(KafkaConsumer _kafkaConsumer) : ControllerBase
    {
        [HttpPost]
        [Route("[action]")]
        public IActionResult Get(string msh)
        {
            return Ok(msh);
        }
    }
}
