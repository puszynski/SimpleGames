var gameBoard;

const player = 'X';
const ai = 'O';

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
startGame();


function startGame() {
    console.log('Game started.');
    document.querySelector('.endgame-info').style.display = 'none';
    
    // create array with 9 elements, with keys range from 0 to 8
    gameBoard = Array.from(Array(9).keys());
    console.log(gameBoard);

    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnPlayerClick, false);
    }
}

function turnPlayerClick(square) {
    console.log(square.target.id);
    turn(square.target.id, player);
}

function turn(squareId, player) {
    // assign to board
    gameBoard[squareId] = player; 
    // display
    document.getElementById(squareId).innerText = player;

    var url = '@Url.Action("ActionMethod", "Home")';
    var isGameWon = $.get('Index/IsRoundWon', [data], [callback]); //checkWin(gameBoard, player);
}

function checkWin(boardToCheck, playerToCheck) {

}