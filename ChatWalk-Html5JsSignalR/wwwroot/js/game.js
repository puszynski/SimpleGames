"use strict";

//CLASSES
class Player {
    x;
    y;
    name;
    radius;
    points = 0;
    stamina = 100; //use for e.g. jumps, extra actions, shots? 

    constructor(name, drawRadius, x, y) {
        this.name = name;
        this.radius = drawRadius;
        this.x = x;
        this.y = y;
    }
}


//FIELDS
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); //tool to draw in canvas
var startPositionX = canvas.width / 2;
var startPositionY = canvas.height - 30;

//create myPlayer
let myPlayerName = document.getElementById("myPlayer").value;
let mainPlayer = new Player(myPlayerName, 10, startPositionX, startPositionY);


//TODO test
let otherPlayers = [];
let testPlayer = new Player('testPlayer', 14, 100, 100);
let testPlayer2 = new Player('#2', 14, 400, 300);
otherPlayers.push(testPlayer);
otherPlayers.push(testPlayer2);

//SignalR
var connection = new signalR.HubConnectionBuilder().withUrl("/gameHub").build();

//get response from singlaR
connection.on("ReceivePlayerData", function (playerName, x, y) {
    var message = playerName + " move to position(x,y): " + x + ", " + y;

    if (playerName === mainPlayer.name) {
        //do nothing, data is up to date 
    }
    else if (otherPlayers.some(function (item) { return item.name === playerName; })) { //TODO
        let objIndex = otherPlayers.findIndex((x => x.name === playerName));
        otherPlayers[objIndex].x = x;
        otherPlayers[objIndex].y = y;

    }
    else {
        let newPlayer = new Player(playerName, 10, x, y); //TODO RADIUS IS HARDCODED!
        otherPlayers.push(newPlayer);
    }    


    //var li = document.createElement("li");
    //li.textContent = message;
    //document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    //when signalR is ready
    //todo - call setInterval here?
}).catch(function (err) {
    return console.error(err.toString());
});



//LISTNERS
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//todo - jumps - https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event







var moveUp = false;
var moveDown = false;
var moveLeft = false;
var moveRight = false;

var globalSpeed = 3;

//RUN
setInterval(draw, 10);//run draw function each 10 miliseconds - in future, wait for response from server

//FUNCTIONS
function drawPlayers() {
    //draw myPlayer
    ctx.beginPath();
    ctx.arc(mainPlayer.x, mainPlayer.y, mainPlayer.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.fillText(mainPlayer.name, mainPlayer.x, mainPlayer.y - 1.5 * mainPlayer.radius);

    //draw other players
    for (var i = 0; i < otherPlayers.length; i++) {
        ctx.beginPath();
        ctx.arc(otherPlayers[i].x, otherPlayers[i].y, otherPlayers[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = "#009500";
        ctx.fill();
        ctx.closePath();

        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.fillText(otherPlayers[i].name, otherPlayers[i].x, otherPlayers[i].y - 1.5 * otherPlayers[i].radius);
    }
}

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        moveRight = true;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        moveLeft = true;
    }
    else if (e.key === "Down" || e.key === "ArrowDown") {
        moveDown = true;
    }
    else if (e.key === "Up" || e.key === "ArrowUp") {
        moveUp = true;
    }

    movePlayer();
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        moveRight = false;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        moveLeft = false;
    }
    else if (e.key === "Down" || e.key === "ArrowDown") {
        moveDown = false;
    }
    else if (e.key === "Up" || e.key === "ArrowUp") {
        moveUp = false;
    }

    movePlayer();
}

function movePlayer() {
    if (moveUp === true && moveDown === false) {
        mainPlayer.y += -globalSpeed;
    }
    else if (moveUp === false && moveDown === true) {
        mainPlayer.y += globalSpeed;
    }

    if (moveLeft === true && moveRight === false) {
        mainPlayer.x += -globalSpeed;
    }
    else if (moveLeft === false && moveRight === true) {
        mainPlayer.x += globalSpeed;
    }
   
    sendPlayerDataToHub();
}

function sendPlayerDataToHub() {
    connection.invoke("SendPlayerData", mainPlayer.name, mainPlayer.x, mainPlayer.y).catch(function (err) {
        return console.error(err.toString());
    });
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayers();    
}