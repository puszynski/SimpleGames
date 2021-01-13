using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MMORPG_TopDownSignaR.Models;
using MMORPG_TopDownSignaR.Models.Home;
using System.Diagnostics;

namespace MMORPG_TopDownSignaR.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            var model = new Login();
            return View(model);
        }

        [HttpPost]
        public IActionResult Index(Login model)
        {
            if (!ModelState.IsValid)
                return View(model);

            //todo walidacja czy nick się nie powtarza z db/innymi goścmi

            return RedirectToAction("Index", "Game", model); //todo do get`a akcji game; 
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
