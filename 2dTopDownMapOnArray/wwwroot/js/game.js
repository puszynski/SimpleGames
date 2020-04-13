"use strict";

//fields
var ctx = null;

var tileSize = 40; //height == width
var currentSecond = 0, frameCount = 0, framesLastSecond = 0;

var keysDown = { // dictionary
    37 : false,
    38 : false,
    39 : false,
    40 : false
}

var player = new Character();

// 1d array => 0 - impossble, 1 - possible
var gameMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 0 ],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 0 ],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 0 ],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0 ],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0 ],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0 ],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
];
var mapTileRowsCount = gameMap.length;
var mapTileColumnsCount = gameMap[0].length;

// https://www.youtube.com/watch?v=xsNdwyuuSzo
function CHaracter() {
    this.tileFrom = [1, 1];
    this.tileTo = [1, 1];
    this.timeMoved = 0;
    this.dimensions = [30, 30];
    this.position = [45, 45];
    this.delayMove = 700;
}



window.onload = function () {
    ctx = document.getElementById("game").getContext('2d');
    requestAnimationFrame(renderGame);
    ctx.font = "bold 10pt sans-serif";
};

function renderGame() {
    if (ctx == null) { return; } //if ctx not ready, do nothing
    setFPS();

    renderMap();
    
    //render fps on canvas
    ctx.fillStyle = "red";
    ctx.fillText("FPS: " + framesLastSecond, 10, 20);

    //redner all again
    requestAnimationFrame(renderGame);
}

function setFPS() {
    var sec = Math.floor(Date.now() / 1000);
    if (sec != currentSecond) {
        currentSecond = sec;
        framesLastSecond = frameCount;
        frameCount = 1;
    }
    else {
        frameCount++;
    }
}

function renderMap() {
    for (var y = 0; y < mapTileRowsCount; y++) {
        for (var x = 0; x < mapTileColumnsCount; x++) {
            switch (gameMap[y][x]) {

                case 0:
                    ctx.fillStyle = "gray";
                    break;
                case 1:
                    ctx.fillStyle = "white";
                    break;
            }

            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
        }
    }
}