using Confluent.Kafka;
using Newtonsoft.Json;
using System.Diagnostics;
using static Confluent.Kafka.ConfigPropertyNames;

namespace ChatServer1
{
    public class KafkaProducer
    {
        private readonly IProducer<Null, string> _producer;
        private readonly ILogger<KafkaConsumer> _logger;


        public KafkaProducer(ILogger<KafkaConsumer> logger)
        {
            _logger = logger;
            var config = new ProducerConfig { BootstrapServers = "localhost:9092" };
            _producer = new ProducerBuilder<Null, string>(config).Build();
        }

        public async Task ProduceMessageAsync(string topic, Message message)
        {
            var messageJson = JsonConvert.SerializeObject(message);
            
            try
            {
                var deliveryReport = await _producer.ProduceAsync(topic, new Message<Null, string> { Value = messageJson });
                _logger.LogInformation($"Delivered '{deliveryReport.Value}' to '{deliveryReport.TopicPartitionOffset}'");
            }
            catch (ProduceException<Null, string> e)
            {
                _logger.LogInformation($"Delivery failed: {e.Error.Reason}");
            }

        }
    }
}

