using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessRTS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace ChessRTS.Pages
{
    public class IndexModel : PageModel
    {
        [BindProperty]
        public Player Player { get; set; }

        public IActionResult OnGet()
        {
            Player = new Player();
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            return RedirectToPage("Game", "SingleOrder", new { playerName = Player.Nick });
        }
    }
}
