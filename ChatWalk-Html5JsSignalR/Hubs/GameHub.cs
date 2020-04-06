using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ChatWalk_Html5JsSignalR.Hubs
{
    public class GameHub : Hub
    {
        //ps: player name must be unique
        public async Task SendPlayerData(string playerName, int x, int y)
        {
            await Clients.All.SendAsync("ReceivePlayerData", playerName, x, y);
        }
    }
}
