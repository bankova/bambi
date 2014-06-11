window.onload = function () {    
    var bricksGame = game("the-canvas");    
    bricksGame.startGame();    
}

var theCanvas;
var canvasCtx;

function game(canvasContainerId) {
    var self = {};        

    theCanvas = document.getElementById(canvasContainerId);
    canvasCtx = theCanvas.getContext("2d");    

    var theball = ball(),
        bricks = [];

    function drawGameField() {
        canvasCtx.clearRect(0, 0, theCanvas.width, theCanvas.height);
        theball.draw();
        drawBricks(30, 50, 40, 20, 1); // Move me when drawBricks() is moved
        requestAnimationFrame(drawGameField);
    }

    self.startGame = function () {        
        requestAnimationFrame(drawGameField);
    }

    return self;
}

function ball() {
    var self = {},
        radius = 10,
        speed = 5,
        right = +1,
        down = +1;

    self.x = Math.floor(theCanvas.width / 2);
    self.y = Math.floor(theCanvas.height / 2);

    self.draw = function () {
        self.x += speed * right;
        self.y += speed * down;

        if (right == +1 && self.x == theCanvas.width - radius) {
            right = -1;
            self.x += speed * right;
        }

        if (down == +1 && self.y == theCanvas.height - radius) {
            down = -1;
            self.y += speed * down;
        }

        if (right == -1 && self.x == radius) {
            right = +1;
            self.x += speed * right;
        }

        if (down == -1 && self.y == radius) {
            down = +1;
            self.y += speed * down;
        }

        canvasCtx.fillStyle = '#FF0000';
        canvasCtx.beginPath();
        canvasCtx.arc(self.x, self.y, radius, 0, 2 * Math.PI);
        canvasCtx.fill();
    }

    return self;
}

// Everything below Needs to be somewhere else
function drawBricks(startpointX, startpointY, widthBrick, heightBrick, linewidth) {
    while (startpointX + widthBrick < theCanvas.width) {
        canvasCtx.beginPath();
        canvasCtx.rect(startpointX, startpointY, widthBrick, heightBrick);
        canvasCtx.fillStyle = 'green';
        canvasCtx.fill();
        canvasCtx.lineWidth = linewidth;
        canvasCtx.strokeStyle = 'black';
        canvasCtx.stroke();

        //update position
        startpointX += widthBrick + 10;
    }
}