var TILE_SIZE = 16;
var pixelSize;
var MAP;
var CAMERA;
var MAIN_PLAYER;
var OTHER_PLAYERS;
var EKeysDirections;
(function (EKeysDirections) {
    EKeysDirections[EKeysDirections["Up"] = 38] = "Up";
    EKeysDirections[EKeysDirections["Down"] = 40] = "Down";
    EKeysDirections[EKeysDirections["Left"] = 37] = "Left";
    EKeysDirections[EKeysDirections["Right"] = 39] = "Right";
})(EKeysDirections || (EKeysDirections = {}));
var EMapTile;
(function (EMapTile) {
    EMapTile[EMapTile["Allowed"] = 0] = "Allowed";
    EMapTile[EMapTile["Blocked"] = 1] = "Blocked";
})(EMapTile || (EMapTile = {}));
var ECharacterClasses;
(function (ECharacterClasses) {
    ECharacterClasses[ECharacterClasses["None"] = 0] = "None";
    ECharacterClasses[ECharacterClasses["Warrior"] = 1] = "Warrior";
    ECharacterClasses[ECharacterClasses["Elf"] = 2] = "Elf";
    ECharacterClasses[ECharacterClasses["Shaman"] = 3] = "Shaman";
})(ECharacterClasses || (ECharacterClasses = {}));
var EPlayerInactiveReason;
(function (EPlayerInactiveReason) {
    EPlayerInactiveReason[EPlayerInactiveReason["NaturalDeath"] = 1] = "NaturalDeath";
    EPlayerInactiveReason[EPlayerInactiveReason["Ban"] = 2] = "Ban";
})(EPlayerInactiveReason || (EPlayerInactiveReason = {}));
var Position = (function () {
    function Position(x, y) {
        this.X = x;
        this.Y = y;
    }
    return Position;
}());
var Map = (function () {
    function Map(mapName, htmlElement, mapTiles, playerStartPositionPx) {
        this.ID = mapName;
        this.HTMLElement = htmlElement;
        this.MapTiles = mapTiles;
        this.PlayerStartPositionPx = playerStartPositionPx;
        this.calculateMapSize();
    }
    Map.prototype.calculateMapSize = function () {
        this.mapTilesSizeY = this.MapTiles.length;
        this.mapTilesSizeX = this.MapTiles[0].length;
    };
    return Map;
}());
var Dynamically_create_element = (function () {
    function Dynamically_create_element() {
    }
    Dynamically_create_element.prototype.Create_Element = function (htmlelent) {
        var element = document.createElement("input");
        element.setAttribute("type", htmlelent);
        element.setAttribute("value", htmlelent);
        element.setAttribute("name", htmlelent);
        element.setAttribute("style", "color:Red");
        document.body.appendChild(element);
    };
    return Dynamically_create_element;
}());
var Player = (function () {
    function Player(firstAndLastname, isMainPlayer, mapID, positionOnMap, speed, birthDate, imageSrc) {
        this.ID = firstAndLastname;
        this.IsMainPlayer = isMainPlayer;
        this.MapID = mapID;
        this.PositionOnMap = positionOnMap;
        this.Speed = speed;
        this.BirthDate = birthDate;
        this.ImageSrc = imageSrc;
        this.HeldDirections = [];
        this.calculateAge();
        this.createPlayerHtmlCss();
    }
    Player.prototype.createPlayerHtmlCss = function () {
        this.HTMLElement = document.createElement("div");
        this.HTMLElement.setAttribute("class", "character " + this.ID);
        this.HTMLElement.setAttribute("id", "character " + this.ID);
        this.HTMLElement.setAttribute("facing", "Down");
        this.HTMLElement.setAttribute("walking", "false");
        var shadowElement = document.createElement("img");
        shadowElement.setAttribute("class", "characterShadow pixelArt");
        shadowElement.setAttribute("src", "/images/DemoRpgCharacterShadow.png");
        shadowElement.setAttribute("alt", "Shadow");
        this.HTMLElement.appendChild(shadowElement);
        var characterElement = document.createElement("img");
        characterElement.setAttribute("class", "characterSpritesheet pixelArt");
        characterElement.setAttribute("src", this.ImageSrc);
        characterElement.setAttribute("alt", "Character");
        this.HTMLElement.appendChild(characterElement);
        MAP.HTMLElement.appendChild(this.HTMLElement);
    };
    Player.prototype.placeCharacterOnMap = function () {
        if (this.IsMainPlayer) {
            var heldDirection = this.HeldDirections[0];
            if (heldDirection) {
                switch (heldDirection) {
                    case EKeysDirections.Up: {
                        if (IsNoColision(this.PositionOnMap.X, this.PositionOnMap.Y - this.Speed)) {
                            this.PositionOnMap.Y -= this.Speed;
                        }
                        break;
                    }
                    case EKeysDirections.Down: {
                        if (IsNoColision(this.PositionOnMap.X, this.PositionOnMap.Y + this.Speed)) {
                            this.PositionOnMap.Y += this.Speed;
                        }
                        break;
                    }
                    case EKeysDirections.Left: {
                        if (IsNoColision(this.PositionOnMap.X - this.Speed, this.PositionOnMap.Y)) {
                            this.PositionOnMap.X -= this.Speed;
                        }
                        break;
                    }
                    case EKeysDirections.Right: {
                        if (IsNoColision(this.PositionOnMap.X + this.Speed, this.PositionOnMap.Y)) {
                            this.PositionOnMap.X += this.Speed;
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }
                this.HTMLElement.setAttribute("facing", EKeysDirections[heldDirection]);
            }
            this.HTMLElement.setAttribute("walking", heldDirection ? "true" : "false");
        }
        this.HTMLElement.style.transform = "translate3d( " + (this.PositionOnMap.X - TILE_SIZE) * pixelSize + "px, " + (this.PositionOnMap.Y - TILE_SIZE) * pixelSize + "px, 0 )";
    };
    Player.prototype.calculateAge = function () {
        if (!this.IsInactive) {
            var now = new Date();
            var durationInMilisecounds = now.valueOf() - this.BirthDate.valueOf();
            var milisecoundsInOneDay = 1000 * 60 * 60 * 24;
            var days = Math.round(durationInMilisecounds / milisecoundsInOneDay);
            var age = Math.floor(days / 4);
            if (this.CharacterClass != ECharacterClasses.Elf && age >= 100) {
                this.IsInactive = EPlayerInactiveReason.NaturalDeath;
            }
            this.Age = age;
        }
    };
    return Player;
}());
var Camera = (function () {
    function Camera(cameraWidthPx, cameraHeightPx) {
        this.WidthPx = cameraWidthPx;
        this.HeightPx = cameraHeightPx;
    }
    Camera.prototype.updateCameraPosition = function () {
        var cameraOffsetX = 160 / 2;
        var cameraOffsetY = 144 / 2;
        MAP.HTMLElement.style.transform = "translate3d( " + (-MAIN_PLAYER.PositionOnMap.X * pixelSize + cameraOffsetX * pixelSize) + "px, " + (-MAIN_PLAYER.PositionOnMap.Y * pixelSize + cameraOffsetY * pixelSize) + "px, 0 )";
    };
    return Camera;
}());
var PlayerItem = (function () {
    function PlayerItem() {
    }
    return PlayerItem;
}());
function IsNoColision(newCharacterPositionX, newCharacterPositionY) {
    var mapTileX = Math.floor(newCharacterPositionX / TILE_SIZE);
    var mapTileY = Math.floor(newCharacterPositionY / TILE_SIZE);
    var mapTile = MAP.MapTiles[mapTileY][mapTileX];
    switch (mapTile) {
        case EMapTile.Allowed: {
            return true;
        }
        default:
            return false;
    }
}
function InitializeGameData() {
    var demoMapTiles = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    MAP = new Map("demo", document.getElementById("map"), demoMapTiles, new Position(6.5 * TILE_SIZE, 3.5 * TILE_SIZE));
    CAMERA = new Camera(160, 144);
    MAIN_PLAYER = new Player("World Creator", true, MAP.ID, MAP.PlayerStartPositionPx, 1, new Date("2020-12-25"), "/images/DemoRpgCharacter.png");
    OTHER_PLAYERS = [new Player("Tester Pierwszy", false, MAP.ID, new Position(3.5 * TILE_SIZE, 3.5 * TILE_SIZE), 1, new Date("2020-12-25"), "/images/DemoRpgCharacter2.png")];
}
function UpdateGameData() {
    pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
}
function gameLoop() {
    UpdateGameData();
    MAIN_PLAYER.placeCharacterOnMap();
    OTHER_PLAYERS.forEach(function (item) {
        item.placeCharacterOnMap();
    });
    CAMERA.updateCameraPosition();
    window.requestAnimationFrame(function () {
        gameLoop();
    });
}
window.onload = function () {
    InitializeGameData();
    gameLoop();
};
document.addEventListener("keydown", function (e) {
    var dir = e.which;
    if (dir && MAIN_PLAYER.HeldDirections.indexOf(dir) === -1) {
        MAIN_PLAYER.HeldDirections.unshift(dir);
    }
});
document.addEventListener("keyup", function (e) {
    var dir = e.which;
    var index = MAIN_PLAYER.HeldDirections.indexOf(dir);
    if (index > -1) {
        MAIN_PLAYER.HeldDirections.splice(index, 1);
    }
});
//# sourceMappingURL=game.js.map