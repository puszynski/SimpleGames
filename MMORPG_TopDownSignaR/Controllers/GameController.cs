using Microsoft.AspNetCore.Mvc;
using MMORPG_TopDownSignaR.DomainModels;
using MMORPG_TopDownSignaR.Logic.PlayerCharacter;
using MMORPG_TopDownSignaR.Models.Home;
using System.Collections.Generic;

namespace MMORPG_TopDownSignaR.Controllers
{
    public class GameController : Controller
    {
        readonly DataCalculator _dataCalculator;

        public GameController(DataCalculator dataCalculator)
        {
            _dataCalculator = dataCalculator;
        }


        public IActionResult Index(Login model)
        {
            var playersList = new List<PlayerCharacter>() { };

            var mainPlayer = new PlayerCharacter()
            {
                BirthDate = new System.DateTime(2020, 12, 25),
                CharacterClass = Enums.ECharacterClass.Shaman,
                FirstName = "Game",
                LastName = "Creator",
                IsMainPlayer = true,
                ImageSrc = "tododod",
                MapID = "testMap1",
                PositionOnMapPixelsX = 1234567,
                PositionOnMapPixelsY = 2348,
                Speed = 1
            };

            mainPlayer.Age = _dataCalculator.CalculateAge(mainPlayer.BirthDate);
            mainPlayer.AgeOfDeath = _dataCalculator.CalculateDeathAge();
            mainPlayer.PlayerStatus = _dataCalculator.SetPlayerStatus(mainPlayer.Age, mainPlayer.AgeOfDeath);

            return View();
        }
    }
}
