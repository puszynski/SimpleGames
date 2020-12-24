using GameRoom.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace GameRoom.Controllers
{
    public class PlayerController : Controller
    {
        [HttpPost]
        public IActionResult Create(Player model)
        {
            return View();
        }

        //todo game room
    }
}
