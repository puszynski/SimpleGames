var map = document.getElementById("map");
var character = document.getElementById("character");
var pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
var heldDirections = [];
var KeysDirections;
(function (KeysDirections) {
    KeysDirections[KeysDirections["Up"] = 38] = "Up";
    KeysDirections[KeysDirections["Down"] = 40] = "Down";
    KeysDirections[KeysDirections["Left"] = 37] = "Left";
    KeysDirections[KeysDirections["Right"] = 39] = "Right";
})(KeysDirections || (KeysDirections = {}));
var Player = (function () {
    function Player(startPositionX, startPositionY) {
        this.spriteSheetImage = new Image();
        this.moving = false;
        this.facing = KeysDirections.Down;
        this.x = startPositionX;
        this.y = startPositionY;
        this.spriteSheetImage.src = "/images/DemoRpgCharacter.png";
    }
    Player.prototype.move = function () {
    };
    return Player;
}());
var cameraOffsetX = pixelSize * 66;
var cameraOffsetY = pixelSize * 42;
var x = 90;
var y = 34;
var speed = 1;
function placeCharacter() {
    var heldDirection = heldDirections[0];
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
    map.style.transform = "translate3d( " + (-x * pixelSize + cameraOffsetX) + "px, " + (-y * pixelSize + cameraOffsetY) + "px, 0 )";
    character.style.transform = "translate3d( " + x * pixelSize + "px, " + y * pixelSize + "px, 0 )";
}
function gameLoop() {
    placeCharacter();
    window.requestAnimationFrame(function () {
        gameLoop();
    });
}
window.onload = function () {
    gameLoop();
};
document.addEventListener("keydown", function (e) {
    var dir = e.which;
    if (dir && heldDirections.indexOf(dir) === -1) {
        heldDirections.unshift(dir);
    }
});
document.addEventListener("keyup", function (e) {
    var dir = e.which;
    var index = heldDirections.indexOf(dir);
    if (index > -1) {
        heldDirections.splice(index, 1);
    }
});
//# sourceMappingURL=game.js.map