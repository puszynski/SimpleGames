using GameRoom.ViewModels;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace GameRoom.Hubs
{
    // about configuraion MVC with SIgnalR 
    // https://www.c-sharpcorner.com/article/implementation-of-signalr-with-net-core/
    // or => https://sandervandevelde.wordpress.com/2018/01/05/getting-signalr-running-on-asp-net-mvc-core/
    public class PlayerHubs : Hub
    {
        public Task Send(Player player)
        {
            return Clients.All.SendAsync("Send", player);
        }
    }
}
