//todo all in one file - in future - try use project refrences https://www.typescriptlang.org/docs/handbook/project-references.html or import/export to split scripts

//CONSTANS GLOBAL SETTINGS
const STARTING_BUILD_POINTS = 30;
const TILE_SIZE = 50;
const TILE_PADDING = 5;

let CANVAS: HTMLCanvasElement;
let CTX: CanvasRenderingContext2D

let players: Player[] = [];

//CLASSES ENUMS INTERFACES
enum EChessPiece {
    King = 1,
    Queen = 2,
    Bishop = 3,
    Knight = 4,
    Rook = 5,
    Pawn = 6
}

class ChessPiece {
    public Type: EChessPiece;
    public TileX: number; 
    public TileY: number;

    //DRAGING LIVE
    public dragX: number;
    public dragY: number;

    constructor(type: EChessPiece, tileX: number, tileY: number) {
        this.Type = type;
        this.TileX = tileX;
        this.TileY = tileY;
    }

    public move(newTileX: number, newTileY: number): void {
        if (this.validateMove(newTileX, newTileY)) {
            this.TileX = newTileX;
            this.TileY = newTileY;
        }
    }

    public draw(): void {
        CTX.beginPath();
        CTX.fillStyle = "red";
        CTX.fillRect(
            this.TileX * TILE_SIZE + TILE_PADDING,
            this.TileY * TILE_SIZE + TILE_PADDING,
            TILE_SIZE - 2 * TILE_PADDING,
            TILE_SIZE - 2 * TILE_PADDING
        );
    }

    private validateMove(newTileX: number, newTileY: number): boolean {
        switch (this.Type) {
            case EChessPiece.King:
                // todo validate
                if (false) {
                    return false;
                    console.warn("Wrong move!");
                }
                break;
            case EChessPiece.Pawn:
                //todo
                return true;
                break;
            //todo
            default:
                return false;
                console.log("Error! ChessPiece type out of enum range!");
                break;
        }
    }
}

class Player {
    public nick: string;
    public chessPieces: ChessPiece[] = [];
    public buildPoints: number;

    constructor(nick: string, startTileX: number, startTileY: number) {
        this.nick = nick;
        this.buildPoints = STARTING_BUILD_POINTS;

        const king = new ChessPiece(EChessPiece.King, startTileX, startTileY);
        this.chessPieces.push(king);
    }
}


class MapModel {
    public Name: string;
    public Map: number[][];
    public MaxPlayers: number;
    public StartPositions: number[][];

    constructor(name: string, map: number[][], maxPlayers, startPositions) {
        this.Name = name;
        this.Map = map;
        this.MaxPlayers = maxPlayers;
        this.StartPositions = startPositions;
    }

    draw(): void {
        const mapTileCountRows = this.Map.length;
        const mapTileCountCoulmns = this.Map[0].length;

        for (let y = 0; y < mapTileCountRows; y++) {            
            for (let x = 0; x < mapTileCountCoulmns; x++) {
                switch (this.Map[y][x]) {                   
                    case 0:
                        if (x % 2 === 0 && y % 2 !== 0 ||
                            x % 2 !== 0 && y % 2 === 0 ) 
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
    }

    private drowTile(x: number, y: number, colour: string): void {
        CTX.beginPath();
        CTX.fillStyle = colour;
        CTX.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    }
}
const Map1 = [
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
]
const Map1StartPositions = [[2, 2], [7, 7]];
const TestMap01 = new MapModel('TestMap', Map1, 2, Map1StartPositions)




//GAME FUNCTIONS ETC
function drawChessPieces() {

    players.forEach(function (player) {
        player.chessPieces.forEach(function (chessPiece) {
            chessPiece.draw();
        });
    });     
}

function gameLoop() {
    requestAnimationFrame(gameLoop);//loop the game -- todo you must loop after round ends? it will be nice if players see all drag/drop of others players

    //clear all by set black background
    CTX.fillStyle = "black";
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height)

    //draw map
    TestMap01.draw();    

    //draw chess pieces
    drawChessPieces();

    //drag
}

//GAME START HERE
window.onload = () => {
    CANVAS = document.getElementById('gameCanvas') as HTMLCanvasElement;
    CTX = CANVAS.getContext("2d");

    //add test player
    const testPlayer = new Player('jpu', TestMap01.StartPositions[0][0], TestMap01.StartPositions[0][1]);
    players.push(testPlayer);

    gameLoop();
}

function isInChessPiece() {

}

function dragAndDrop(event) {
    const chessPieceSize = TILE_SIZE - 2 * TILE_PADDING;
    let bRect = CANVAS.getBoundingClientRect();
    let mouseX = (event.clientX - bRect.left);
    let mouseY = (event.clientY - bRect.top);

    //for each chessPieces
    for (let i = 0; i < chessPieceSize; i++) {
        if (inChessPiece(circles[i], mouseX, mouseY)) {
            drag = true;
            dragHoldX = mouseX - circles[i].x;
            dragHoldY = mouseY - circles[i].y;
            dragIndex = i;
        }
    }
    if (drag) {
        window.addEventListener("mousemove", mouseMove, false);
    }
    CANVAS.removeEventListener("mousedown", mouseDown, false);
    window.addEventListener("mouseup", mouseUp, false);
    return false;
}


CANVAS.addEventListener("mousedown", dragAndDrop, false);