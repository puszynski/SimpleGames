var map = document.getElementById("map");
var character = document.getElementById("character");
var pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));

var heldDirections: KeysDirections[] = []; //state of witch arrows keys are holding down

//value == key value
enum KeysDirections {
    Up = 38,
    Down = 40,
    Left = 37,
    Right = 39,
}

class Player {
    x: number;
    y: number;

    speed: number;

    moving: boolean;
    facing: KeysDirections;

    spriteSheetImage = new Image();//use const dimenstions for all sprites

    constructor(startPositionX: number, startPositionY: number) {
        this.moving = false;
        this.facing = KeysDirections.Down;

        this.x = startPositionX;
        this.y = startPositionY;

        this.spriteSheetImage.src = "/images/DemoRpgCharacter.png";
    }

    move() {
    }
}

//state of character
//offset camera
var cameraOffsetX = pixelSize * 66;
var cameraOffsetY = pixelSize * 42;
//start position on middle of the map
var x = 90;
var y = 34;
var speed = 1; // pixels per frame



function placeCharacter() {
    var heldDirection = heldDirections[0]; //allow player to press multiple keys, we are reading first one e.g. if player will press and hold Left+Right, then relase Left, Right will still work

    if (heldDirection) {
        switch (heldDirection) {
            case KeysDirections.Up: {
                y -= speed;
                break;
            }
            case KeysDirections.Down: {
                y += speed;
                break;
            }
            case KeysDirections.Left: {
                x -= speed;
                break;
            }
            case KeysDirections.Right: {
                x += speed;                
                break;
            }
            default: {
                break;
            } 
        }   

        character.setAttribute("facing", KeysDirections[heldDirection]);
    }

    character.setAttribute("walking", heldDirection ? "true" : "false");

    map.style.transform = `translate3d( ${-x * pixelSize + cameraOffsetX}px, ${-y * pixelSize + cameraOffsetY}px, 0 )`;
    character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize}px, 0 )`;
}

function gameLoop() {
    placeCharacter();

    window.requestAnimationFrame(() => {
        gameLoop();
    })
}

//GAME START HERE
window.onload = () => {
    gameLoop();
}

//GAME LISTENER
document.addEventListener("keydown", (e) => {
    var dir: KeysDirections = e.which;

    if (dir && heldDirections.indexOf(dir) === -1) {
        heldDirections.unshift(dir)
    }
})

document.addEventListener("keyup", (e) => {
    var dir: KeysDirections = e.which;
    var index = heldDirections.indexOf(dir);

    if (index > -1) {
        heldDirections.splice(index, 1)
    }
})