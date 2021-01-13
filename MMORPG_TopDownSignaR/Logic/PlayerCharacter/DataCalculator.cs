using MMORPG_TopDownSignaR.Enums;
using System;

namespace MMORPG_TopDownSignaR.Logic.PlayerCharacter
{
    public class DataCalculator
    {
        public int CalculateAge(DateTime birthDate)
        {
            var now = DateTime.UtcNow;
            var days = (now - birthDate).Days; 
            return days/4;  // 400 days == 100 years in game
        }

        public EPlayerStatus SetPlayerStatus(int age, int ageOfDeath)
        {
            if (ageOfDeath != null && age >= ageOfDeath)
                return EPlayerStatus.NaturalDeath;

            return EPlayerStatus.Active;
        }
    }
}
