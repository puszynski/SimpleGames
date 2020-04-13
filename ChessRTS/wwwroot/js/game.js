var STARTING_BUILD_POINTS = 30;
var TILE_SIZE = 50;
var TILE_PADDING = 5;
var CANVAS;
var CTX;
var players = [];
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
        CTX.fillRect(this.TileX * TILE_SIZE + TILE_PADDING, this.TileY * TILE_SIZE + TILE_PADDING, TILE_SIZE - 2 * TILE_PADDING, TILE_SIZE - 2 * TILE_PADDING);
    };
    ChessPiece.prototype.validateMove = function (newTileX, newTileY) {
        switch (this.Type) {
            case EChessPiece.King:
                if (false) {
                    return false;
                    console.warn("Wrong move!");
                }
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
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
var Map1StartPositions = [[2, 2], [7, 7]];
var TestMap01 = new MapModel('TestMap', Map1, 2, Map1StartPositions);
function drawChessPieces() {
    players.forEach(function (player) {
        player.chessPieces.forEach(function (chessPiece) {
            chessPiece.draw();
        });
    });
}
function gameLoop() {
    requestAnimationFrame(gameLoop);
    CTX.fillStyle = "black";
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    TestMap01.draw();
    drawChessPieces();
}
window.onload = function () {
    CANVAS = document.getElementById('gameCanvas');
    CTX = CANVAS.getContext("2d");
    var testPlayer = new Player('jpu', TestMap01.StartPositions[0][0], TestMap01.StartPositions[0][1]);
    players.push(testPlayer);
    gameLoop();
};
function isInChessPiece() {
}
//# sourceMappingURL=game.js.map