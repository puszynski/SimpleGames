//TODO drawing sprites from .ts

//global variables
const TILE_SIZE = 16;
var pixelSize: number;

//global objects
var MAP: Map;
var CAMERA: Camera;
var MAIN_PLAYER: Player;
var OTHER_PLAYERS: Player[];


//value == key value
enum EKeysDirections {
    Up = 38,
    Down = 40,
    Left = 37,
    Right = 39,
}

enum EMapTile {
    Allowed = 0,
    Blocked = 1
}

enum ECharacterClasses {
    None = 0,
    Warrior = 1,
    Elf = 2,
    Shaman = 3
}

enum EPlayerInactiveReason {
    NaturalDeath = 1,
    Ban = 2
}

class Position{
    X: number;
    Y: number;

    constructor(x: number, y: number)
    {
        this.X = x;
        this.Y = y;
    }
}

class Map {
    ID: string;

    HTMLElement: HTMLElement;
    ImageSrc: string;//todo

    mapTilesSizeX: number;
    mapTilesSizeY: number;
    MapTiles: number[][];
    PlayerStartPositionPx: Position;
    //MapItemTiles: [][]; todo
    
    constructor(mapName: string,
        htmlElement: HTMLElement,
        mapTiles: number[][],
        playerStartPositionPx: Position)
    {
        this.ID = mapName;
        this.HTMLElement = htmlElement;
        this.MapTiles = mapTiles; //todo in future - get from server
        this.PlayerStartPositionPx = playerStartPositionPx;

        this.calculateMapSize();
    }

    calculateMapSize() {
        this.mapTilesSizeY = this.MapTiles.length;
        this.mapTilesSizeX = this.MapTiles[0].length;
    }   
}

class Player {
    ID: string; //first name + last name
    IsMainPlayer: boolean;

    HTMLElement: HTMLElement;
    ImageSrc: string; //todo // character tile size 32 x 32px

    MapID: string;
    PositionOnMap: Position;
    HeldDirections: EKeysDirections[];

    CharacterClass: ECharacterClasses;
    BirthDate: Date;
    Age: number;
    Speed: number;

    IsInactive: EPlayerInactiveReason;

    constructor(firstAndLastname: string,
        isMainPlayer: boolean,
        htmlElement: HTMLElement,
        mapID: string,
        positionOnMap: Position,
        speed: number,
        birthDate: Date)
    {
        this.ID = firstAndLastname;
        this.IsMainPlayer = isMainPlayer;
        this.HTMLElement = htmlElement;
        this.MapID = mapID;
        this.PositionOnMap = positionOnMap;
        this.Speed = speed;
        this.BirthDate = birthDate;

        this.HeldDirections = [];
        this.calculateAge();
    }

    createPlayerDiv() {
        //TODO
    }

    placeCharacterOnMap() {
        var heldDirection = MAIN_PLAYER.HeldDirections[0]; //allow player to press multiple keys, we are reading first one e.g. if player will press and hold Left+Right, then relase Left, Right will still work

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

        this.HTMLElement.style.transform = `translate3d( ${(MAIN_PLAYER.PositionOnMap.X - TILE_SIZE) * pixelSize}px, ${(MAIN_PLAYER.PositionOnMap.Y - TILE_SIZE) * pixelSize}px, 0 )`; //"- TILE_SIZE" becouse of character 32*32 sprite
        
    }

    calculateAge(): number {
        if (!this.IsInactive) { //TODO SPR - powinno wejść jak nie jest puste/null
            var now = new Date();
            var durationInMilisecounds = now.valueOf() - this.BirthDate.valueOf();

            var milisecoundsInOneDay = 1000 * 60 * 60 * 24;
            var days = Math.round( durationInMilisecounds / milisecoundsInOneDay);

            var age = days / 4;  // 400 days == 100 years in game

            if (this.CharacterClass != ECharacterClasses.Shaman && age >= 100) {
                this.IsInactive = EPlayerInactiveReason.NaturalDeath;
            }

            return age;
        }

        return null;
    }
}

class Camera {
    WidthPx: number;
    HeightPx: number;

    constructor(cameraWidthPx: number, cameraHeightPx: number) {
        this.WidthPx = cameraWidthPx;
        this.HeightPx = cameraHeightPx;
    }

    updateCameraPosition() {
        //CAMERA SECTON(camera size: 160 * 144)
        var cameraOffsetX = 160 / 2;
        var cameraOffsetY = 144 / 2;

        MAP.HTMLElement.style.transform = `translate3d( ${-MAIN_PLAYER.PositionOnMap.X * pixelSize + cameraOffsetX * pixelSize}px, ${-MAIN_PLAYER.PositionOnMap.Y * pixelSize + cameraOffsetY * pixelSize}px, 0 )`;
    }    
}

class PlayerItem {
    //zurzycie
}

function IsNoColision(newCharacterPositionX: number, newCharacterPositionY: number): boolean {    
    var mapTileX = Math.floor(newCharacterPositionX / TILE_SIZE);
    var mapTileY = Math.floor(newCharacterPositionY / TILE_SIZE);

    var mapTile: EMapTile = MAP.MapTiles[mapTileY][mapTileX];

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

    MAP = new Map("demo",
                  document.getElementById("map"),
                  demoMapTiles,
        new Position(6.5 * TILE_SIZE, 3.5 * TILE_SIZE));

    CAMERA = new Camera(160, 144);

    MAIN_PLAYER = new Player("World Creator",
                             true,
                             document.getElementById("character"),
                             MAP.ID,
                             MAP.PlayerStartPositionPx,
                             1,
                             new Date(2020, 12, 25));
}

function UpdateGameData() {
    pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
}

function gameLoop() {
    UpdateGameData();
    MAIN_PLAYER.placeCharacterOnMap();
    CAMERA.updateCameraPosition();

    window.requestAnimationFrame(() => {
        gameLoop();
    })
}

//GAME START HERE
window.onload = () => {
    InitializeGameData();
    gameLoop();
}



//GAME LISTENER
document.addEventListener("keydown", (e) => {
    var dir: EKeysDirections = e.which;

    if (dir && MAIN_PLAYER.HeldDirections.indexOf(dir) === -1) {
        MAIN_PLAYER.HeldDirections.unshift(dir)
    }
})

document.addEventListener("keyup", (e) => {
    var dir: EKeysDirections = e.which;
    var index = MAIN_PLAYER.HeldDirections.indexOf(dir);

    if (index > -1) {
        MAIN_PLAYER.HeldDirections.splice(index, 1)
    }
})