using ChatServer2.DTOs;
using ChatServer2.Model;
using Confluent.Kafka;
using Newtonsoft.Json;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace ChatServer2
{
    public class KafkaConsumer : IHostedService
    {
        private readonly IConsumer<Null, string> _consumer;
        private readonly string _topic;
        private CancellationTokenSource _cancellationTokenSource;
        private readonly ILogger<KafkaConsumer> _logger;
        private readonly IServiceScopeFactory _scopeFactory; // Inject IServiceScopeFactory

        public KafkaConsumer(ILogger<KafkaConsumer> logger, IServiceScopeFactory scopeFactory)
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
            _scopeFactory = scopeFactory; // Assign the scope factory
        }

        // Called automatically by the runtime at service startup
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
                        await ProcessMessage(consumeResult.Message.Value); // Await the async method
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

        private async Task ProcessMessage(string messageJson) // Make this method async
        {
            try
            {
                var messageDTO = JsonConvert.DeserializeObject<MessageDTO>(messageJson);
                using (var scope = _scopeFactory.CreateScope()) // Create a new scope
                {
                    var _context = scope.ServiceProvider.GetRequiredService<AppDbContext>(); // Resolve AppDbContext
                    Message _Message = new Message
                    {
                        Id = 0,
                        Content = messageDTO.Content,
                        SentAt = DateTime.Now,
                        SenderId = messageDTO.SenderId,
                        ChatRoomId = messageDTO.ChatRoomId
                    };
                    _context.Messages.Add(_Message);
                    await _context.SaveChangesAsync();
                    _logger.LogInformation("Processed message: {Message}", messageDTO);
                }
            }
            catch (JsonException ex)
            {
                _logger.LogError("Error deserializing message: {Error}", ex.Message);
            }
        }
    }
}
