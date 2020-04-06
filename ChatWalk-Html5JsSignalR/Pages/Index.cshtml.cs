using ChatWalk_Html5JsSignalR.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace ChatWalk_Html5JsSignalR.Pages
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

            return RedirectToPage("Game", "SingleOrder", new { playerName = Player.Name });
        }
    }
}
