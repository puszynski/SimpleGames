using ChessRTS.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Globalization;
using System.Reflection;

namespace ChessRTS.Pages
{
    public class GameModel : PageModel
    {
        public Player Player { get; set; }
        public string VersionInfo { get; set; }

        public void OnGet()
        {
            //get app version
            Version v = Assembly.GetExecutingAssembly().GetName().Version;
            VersionInfo = string.Format(CultureInfo.InvariantCulture, @"YourApp Version {0}.{1}.{2} (r{3})", v.Major, v.Minor, v.Build, v.Revision);
        }

        public void OnGetSingleOrder(string playerName)
        {
            var player = new Player();
            player.Nick = playerName;
            Player = player;
        }
    }
}