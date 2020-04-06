using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe
{
    public class Hubs
    {
        public class GameHub : Hub
        {
            public async Task SendMessage(string user, string data)
            {
                await Clients.All.SendAsync("ReceiveData", user, data);
            }
        }
    }
}
