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

    function drawBricks() {
        // some setup
        var startpointX = 20,
            startpointY = 20,
            brickHeight = 2,
            brickWidth = 20;

        while (startpointX + brickWidth < theCanvas.width) {
            var newBrick = brick(startpointX, startpointY, brickWidth, brickHeight);            
            bricks.push(newBrick)
            //update position
            startpointX += 3 * brickWidth;
        }

        // replacing the function after 1st drawing of all the bricks
        drawBricks = function () { 
            for (var i = 0; i< bricks.length ; i++)
            {
                var currentBrick = bricks[i].draw();
            }
        }
    }

    function drawGameField() {
        canvasCtx.clearRect(0, 0, theCanvas.width, theCanvas.height);
        theball.draw();
        checkForColision();        
        drawBricks();
        if (bricks.length === 0) {
            alert("Game over!");
            return;
        }
        requestAnimationFrame(drawGameField);
    }

    function checkForColision() {
        for (var i = 0; i < bricks.length; i++) {
            var aBrick = bricks[i];
            if (aBrick.startpointY + aBrick.height >= theball.y - theball.radius &&
                aBrick.startpointX <= theball.x + theball.radius &&
                theball.x - theball.radius <= aBrick.startpointX + aBrick.width) {
                bricks.splice(i, 1);
                theball.down *= -1;                
                break;
            }
        }        
    }

    self.startGame = function () {        
        requestAnimationFrame(drawGameField);
    }

    return self;
}

function ball() {
    var self = {},        
        speed = 5;

    self.radius = 10;
    self.right = +1;
    self.down = +1;

    self.x = Math.floor(theCanvas.width / 2);
    self.y = Math.floor(theCanvas.height / 2);

    self.draw = function () {
        self.x += speed * self.right;
        self.y += speed * self.down;

        if (self.right == +1 && self.x == theCanvas.width - self.radius) {
            self.right = -1;
            self.x += speed * self.right;
        }

        if (self.down == +1 && self.y == theCanvas.height - self.radius) {
            self.down = -1;
            self.y += speed * self.down;
        }

        if (self.right == -1 && self.x == self.radius) {
            self.right = +1;
            self.x += speed * self.right;
        }

        if (self.down == -1 && self.y == self.radius) {
            self.down = +1;
            self.y += speed * self.down;
        }

        canvasCtx.fillStyle = '#FF0000';
        canvasCtx.beginPath();
        canvasCtx.arc(self.x, self.y, self.radius, 0, 2 * Math.PI);
        canvasCtx.fill();
    }

    return self;
}

function brick(startpointX, startpointY, width, height) {
    var self = {};

    self.startpointX = startpointX;
    self.startpointY = startpointY;
    self.width = width;
    self.height = height;

    self.draw = function () {
        canvasCtx.beginPath();
        canvasCtx.rect(self.startpointX, self.startpointY, self.width, self.height);
        canvasCtx.fillStyle = 'white';
        canvasCtx.fill();
        canvasCtx.lineWidth = self.width;
        canvasCtx.strokeStyle = 'blue';
        canvasCtx.stroke();
    }
    return self;
}