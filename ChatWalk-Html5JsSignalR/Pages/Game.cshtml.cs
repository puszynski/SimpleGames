using ChatWalk_Html5JsSignalR.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ChatWalk_Html5JsSignalR.Pages
{
    public class GameModel : PageModel
    {
        public Player Player { get; set; }
        public void OnGet()
        {
        }

        public void OnGetSingleOrder(string playerName)
        {
            var player = new Player();
            player.Name = playerName;
            Player = player;
        }
    }
}