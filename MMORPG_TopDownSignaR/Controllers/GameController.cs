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

        private const int TILE_SIZE = 16;

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
                FirstName = model.FirstName,
                LastName = model.LastName,
                IsMainPlayer = true,
                ImageSrc = "/images/DemoRpgCharacter.png",
                MapID = "demo",
                PositionOnMapPixelsX = (int)6.5 * TILE_SIZE,
                PositionOnMapPixelsY = (int)3.5 * TILE_SIZE,
                Speed = 1
            };

            mainPlayer.Age = _dataCalculator.CalculateAge(mainPlayer.BirthDate);
            mainPlayer.AgeOfDeath = _dataCalculator.CalculateDeathAge(mainPlayer.CharacterClass, true);
            mainPlayer.PlayerStatus = _dataCalculator.SetPlayerStatus(mainPlayer.Age, mainPlayer.AgeOfDeath);

            playersList.Add(mainPlayer);

            var otherPlayer1 = new PlayerCharacter()
            {
                BirthDate = new System.DateTime(2021, 01, 10),
                CharacterClass = Enums.ECharacterClass.None,
                FirstName = "Test",
                LastName = "Bot",
                IsMainPlayer = false,
                ImageSrc = "/images/DemoRpgCharacter2.png",
                MapID = "demo",
                PositionOnMapPixelsX = (int)3.5 * TILE_SIZE,
                PositionOnMapPixelsY = (int)3.5 * TILE_SIZE,
                Speed = 1
            };

            otherPlayer1.Age = _dataCalculator.CalculateAge(mainPlayer.BirthDate);
            otherPlayer1.AgeOfDeath = _dataCalculator.CalculateDeathAge(mainPlayer.CharacterClass, true);
            otherPlayer1.PlayerStatus = _dataCalculator.SetPlayerStatus(mainPlayer.Age, mainPlayer.AgeOfDeath);

            playersList.Add(mainPlayer);


            return View();
        }
    }
}
