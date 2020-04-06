using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace TicTacToe.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="gameBoard">array[9] of int fill with null or playerSymbols</param>
        /// <param name="playerSymbol">char/string => x or o</param>
        /// <returns></returns>
        public bool IsRoundWon(List<string> gameBoard, string playerSymbol)
        {
            var correctCombinations = new List<List<int>>
            {
                new List<int>{ 0, 1, 2 },
                new List<int>{ 3, 4, 5 },
                new List<int>{ 6, 7, 8 },
                new List<int>{ 0, 3, 6 },
                new List<int>{ 1, 4, 7 },
                new List<int>{ 2, 5, 8 },
                new List<int>{ 0, 4, 8 },
                new List<int>{ 2, 4, 6 }
            };

            foreach (var combination in correctCombinations)
            {
                if (gameBoard[combination[0]] == playerSymbol && gameBoard[combination[1]] == playerSymbol && gameBoard[combination[2]] == playerSymbol)
                    return true;
            }
            return false;
        }

        /// <summary>
        /// https://www.codewars.com/kata/525caa5c1bf619d28c000335/train/csharp        /// 
        /// </summary>
        /// <param name="board">board cames in form of 3x3 array of int [3,3]
        /// => [[2,1,0],[2,1,0],[0,1,0]] 
        /// 0 - empty, 1 - player1, 2 player2
        /// </param>
        /// <returns> -1 not finished, 0 draw, 1 - player1 won, 2 - player2 won</returns>
        public int RoundResultPro(int[,] gameBoard)
        {
            //example
            gameBoard = new int[3, 3] { { 0, 0, 0 }, { 0, 0, 0 }, { 0, 0, 0 } };

            var oneDimentionResult = new List<int>();

            foreach (var item in gameBoard)
            {
                oneDimentionResult.Add(item);
            }

            var correctCombinations = new List<List<int>>
            {
                new List<int>{ 0, 1, 2 },
                new List<int>{ 3, 4, 5 },
                new List<int>{ 6, 7, 8 },
                new List<int>{ 0, 3, 6 },
                new List<int>{ 1, 4, 7 },
                new List<int>{ 2, 5, 8 },
                new List<int>{ 0, 4, 8 },
                new List<int>{ 2, 4, 6 }
            };

            foreach (var combination in correctCombinations)
            {
                var playerSymbol = 1;

                if (oneDimentionResult[combination[0]] == playerSymbol && oneDimentionResult[combination[1]] == playerSymbol && oneDimentionResult[combination[2]] == playerSymbol)
                    return 1;

                playerSymbol = 2;
                if (oneDimentionResult[combination[0]] == playerSymbol && oneDimentionResult[combination[1]] == playerSymbol && oneDimentionResult[combination[2]] == playerSymbol)
                    return 2;
            }

            if (!oneDimentionResult.Any(x => x == 0))
                return 0;

            return -1;
        }
    }
}
