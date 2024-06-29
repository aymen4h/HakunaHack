using Microsoft.AspNetCore.SignalR;

namespace ChatServer1.Hubs
{
    public class ChatHub(KafkaProducer _producer) : Hub
    {
        public async Task SendMessage(string chatRoomId, string userId, string message ,string userName)
        {
            // Diffuser le message en temps réel aux utilisateurs de la chatroom
            await Clients.Group(chatRoomId).SendAsync("ReceiveMessage", userId, message, userName);
            Message msg = new();
            msg.SenderId = userId;
            msg.ChatRoomId = Int32.Parse(chatRoomId);
            msg.Content = message;
            await _producer.ProduceMessageAsync("kaf", msg);

        }
        public async Task JoinChatRoom(string chatRoomId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, chatRoomId);
        }

        public async Task LeaveChatRoom(string chatRoomId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, chatRoomId);
        }
    }
}
