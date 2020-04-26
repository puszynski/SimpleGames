var STARTING_BUILD_POINTS = 30;
var TILE_SIZE = 50;
var TILE_PADDING = 5;
var CANVAS;
var CTX;
var MYPLAYER;
var activeDragChessPiece;
var ENEMYPLAYERS = [];
var ACTUALMAP;
var EChessPiece;
(function (EChessPiece) {
    EChessPiece[EChessPiece["King"] = 1] = "King";
    EChessPiece[EChessPiece["Queen"] = 2] = "Queen";
    EChessPiece[EChessPiece["Bishop"] = 3] = "Bishop";
    EChessPiece[EChessPiece["Knight"] = 4] = "Knight";
    EChessPiece[EChessPiece["Rook"] = 5] = "Rook";
    EChessPiece[EChessPiece["Pawn"] = 6] = "Pawn";
})(EChessPiece || (EChessPiece = {}));
var ChessPiece = (function () {
    function ChessPiece(type, tileX, tileY) {
        this.drag = false;
        this.Type = type;
        this.TileX = tileX;
        this.TileY = tileY;
    }
    ChessPiece.prototype.move = function (newTileX, newTileY) {
        if (this.validateMove(newTileX, newTileY)) {
            this.TileX = newTileX;
            this.TileY = newTileY;
        }
    };
    ChessPiece.prototype.draw = function () {
        CTX.beginPath();
        CTX.fillStyle = "red";
        if (this.drag === false) {
            CTX.fillRect(this.TileX * TILE_SIZE + TILE_PADDING, this.TileY * TILE_SIZE + TILE_PADDING, TILE_SIZE - 2 * TILE_PADDING, TILE_SIZE - 2 * TILE_PADDING);
        }
        else if (this.drag === true) {
            CTX.fillRect(this.dragHoldX - TILE_SIZE / 2, this.dragHoldY - TILE_SIZE / 2, TILE_SIZE - 2 * TILE_PADDING, TILE_SIZE - 2 * TILE_PADDING);
        }
    };
    ChessPiece.prototype.validateMove = function (newTileX, newTileY) {
        if (ACTUALMAP.Map[newTileX][newTileY] === 1) {
            return false;
        }
        switch (this.Type) {
            case EChessPiece.King:
                if (Math.abs(this.TileX - newTileX) > 1 || Math.abs(this.TileY - newTileY) > 1) {
                    return false;
                    console.warn("King - wrong move!");
                }
                return true;
                break;
            case EChessPiece.Pawn:
                return true;
                break;
            default:
                return false;
                console.log("Error! ChessPiece type out of enum range!");
                break;
        }
    };
    return ChessPiece;
}());
var Player = (function () {
    function Player(nick, startTileX, startTileY) {
        this.chessPieces = [];
        this.nick = nick;
        this.buildPoints = STARTING_BUILD_POINTS;
        var king = new ChessPiece(EChessPiece.King, startTileX, startTileY);
        this.chessPieces.push(king);
    }
    return Player;
}());
var MapModel = (function () {
    function MapModel(name, map, maxPlayers, startPositions) {
        this.Name = name;
        this.Map = map;
        this.MaxPlayers = maxPlayers;
        this.StartPositions = startPositions;
    }
    MapModel.prototype.draw = function () {
        var mapTileCountRows = this.Map.length;
        var mapTileCountCoulmns = this.Map[0].length;
        for (var y = 0; y < mapTileCountRows; y++) {
            for (var x = 0; x < mapTileCountCoulmns; x++) {
                switch (this.Map[y][x]) {
                    case 0:
                        if (x % 2 === 0 && y % 2 !== 0 ||
                            x % 2 !== 0 && y % 2 === 0)
                            this.drowTile(TILE_SIZE * x, TILE_SIZE * y, "black");
                        else
                            this.drowTile(TILE_SIZE * x, TILE_SIZE * y, "white");
                        break;
                    default:
                        this.drowTile(TILE_SIZE * x, TILE_SIZE * y, "dimgray");
                        break;
                }
            }
        }
    };
    MapModel.prototype.drowTile = function (x, y, colour) {
        CTX.beginPath();
        CTX.fillStyle = colour;
        CTX.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    };
    return MapModel;
}());
var Map1 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
var Map1StartPositions = [[2, 2], [7, 7]];
ACTUALMAP = new MapModel('TestMap', Map1, 2, Map1StartPositions);
function drawChessPieces() {
    MYPLAYER.chessPieces.forEach(function (x) {
        x.draw();
    });
    ENEMYPLAYERS.forEach(function (player) {
        player.chessPieces.forEach(function (chessPiece) {
            chessPiece.draw();
        });
    });
}
function isInChessPiece(chessPiece, mouseX, mouseY) {
    var isInXAxis = (chessPiece.TileX * TILE_SIZE) < mouseX && (chessPiece.TileX * TILE_SIZE + TILE_SIZE) > mouseX;
    var isInYAxis = (chessPiece.TileY * TILE_SIZE) < mouseY && (chessPiece.TileY * TILE_SIZE + TILE_SIZE) > mouseY;
    return isInXAxis && isInYAxis;
}
function dragAndDropMouseDown(event) {
    var myPlayerChessPieces = MYPLAYER.chessPieces;
    var bRect = CANVAS.getBoundingClientRect();
    var mouseX = (event.clientX - bRect.left);
    var mouseY = (event.clientY - bRect.top);
    for (var i = 0; i < myPlayerChessPieces.length; i++) {
        if (isInChessPiece(myPlayerChessPieces[i], mouseX, mouseY)) {
            myPlayerChessPieces[i].drag = true;
            activeDragChessPiece = myPlayerChessPieces[i];
        }
    }
}
function dragAndDropMouseUp(event) {
    if (activeDragChessPiece === null || activeDragChessPiece === undefined) {
        return;
    }
    var bRect = CANVAS.getBoundingClientRect();
    var mouseX = (event.clientX - bRect.left);
    var mouseY = (event.clientY - bRect.top);
    activeDragChessPiece.move(Math.ceil(mouseX / TILE_SIZE) - 1, Math.ceil(mouseY / TILE_SIZE) - 1);
    activeDragChessPiece.drag = false;
    activeDragChessPiece = null;
}
function dragAndDropMouseMove(event) {
    if (activeDragChessPiece === null || activeDragChessPiece === undefined) {
        return;
    }
    var bRect = CANVAS.getBoundingClientRect();
    var mouseX = (event.clientX - bRect.left);
    var mouseY = (event.clientY - bRect.top);
    activeDragChessPiece.dragHoldX = mouseX;
    activeDragChessPiece.dragHoldY = mouseY;
}
function gameLoop() {
    requestAnimationFrame(gameLoop);
    CTX.fillStyle = "black";
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    ACTUALMAP.draw();
    drawChessPieces();
}
window.onload = function () {
    CANVAS = document.getElementById('gameCanvas');
    CTX = CANVAS.getContext("2d");
    MYPLAYER = new Player('jpu', ACTUALMAP.StartPositions[0][0], ACTUALMAP.StartPositions[0][1]);
    gameLoop();
    CANVAS.addEventListener("mousedown", dragAndDropMouseDown, false);
    CANVAS.addEventListener("mousemove", dragAndDropMouseMove, false);
    CANVAS.addEventListener("mouseup", dragAndDropMouseUp, false);
};
//# sourceMappingURL=game.js.map