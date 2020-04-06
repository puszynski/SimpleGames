using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Chat
{
    public class Hubs
    {
        // https://docs.microsoft.com/en-gb/aspnet/core/tutorials/signalr?view=aspnetcore-3.1&tabs=visual-studio
        public class ChatHub : Hub
        {
            public async Task SendMessage(string user, string message)
            {
                await Clients.All.SendAsync("ReceiveMessage", user, message);
            }
        }
    }
}
