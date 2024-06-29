using Confluent.Kafka;
using Newtonsoft.Json;
using System.Diagnostics;

namespace ChatServer1
{
    public class KafkaConsumer : IHostedService
    {
        private readonly IConsumer<Null, string> _consumer;
        private readonly string _topic;
        private CancellationTokenSource _cancellationTokenSource;
        private readonly ILogger<KafkaConsumer> _logger;

        public KafkaConsumer(ILogger<KafkaConsumer> logger)
        {
            _logger = logger;
            var config = new ConsumerConfig
            {
                BootstrapServers = "localhost:9092",
                GroupId = "chat-app-group",
                AutoOffsetReset = AutoOffsetReset.Earliest
            };

            _consumer = new ConsumerBuilder<Null, string>(config).Build();
            _topic = "kaf";
        }

        // Appelé automatiquement par le runtime au démarrage du service
        public Task StartAsync(CancellationToken cancellationToken)
        {
            _cancellationTokenSource = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
            _logger.LogInformation("Starting Kafka consumer.");
            Task.Run(() => ConsumeMessages(_cancellationTokenSource.Token), _cancellationTokenSource.Token);
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Stopping Kafka consumer.");
            _cancellationTokenSource.Cancel();
            _consumer.Close();
            return Task.CompletedTask;
        }

        private async Task ConsumeMessages(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Subscribing to topic: {Topic}", _topic);
            _consumer.Subscribe(_topic);

            try
            {
                while (!cancellationToken.IsCancellationRequested)
                {
                    try
                    {
                        var consumeResult = _consumer.Consume(cancellationToken);
                        _logger.LogInformation("Consumed message '{Message}' at: '{TopicPartitionOffset}'.", consumeResult.Message.Value, consumeResult.TopicPartitionOffset);
                        ProcessMessage(consumeResult.Message.Value);
                    }
                    catch (ConsumeException ex)
                    {
                        _logger.LogError("Consume error: {Error}", ex.Error.Reason);
                    }
                }
            }
            catch (OperationCanceledException)
            {
                _logger.LogInformation("Consumer loop cancelled.");
                _consumer.Close();
            }
        }

        private void ProcessMessage(string messageJson)
        {
            try
            {
                var message = JsonConvert.DeserializeObject<Message>(messageJson);
                _logger.LogInformation("Processed message: {Message}", message);
            }
            catch (JsonException ex)
            {
                _logger.LogError("Error deserializing message: {Error}", ex.Message);
            }
        }
    }
}
