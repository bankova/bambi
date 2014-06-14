var theCanvas;
var canvasCtx;
var newGameButton = document.querySelector('#newgame');
newGameButton.addEventListener('click', restart, false);
var bricksGame = game("the-canvas");

window.onload = function () {
    bricksGame.startGame();
    bricksGame.updateLevel();
}    

    function game(canvasContainerId) {
        var self = {};

        theCanvas = document.getElementById(canvasContainerId);
        canvasCtx = theCanvas.getContext("2d");
        canvasCtx.font = 'italic 40pt Calibri';

        var theball = ball(),
            bricks = [],
            gamePad = pad();

        self.level = 0;

        function drawBricks() {
                for (var i = 0; i < bricks.length ; i++) {
                    var currentBrick = bricks[i].draw();
                }
            }

        function drawGameField() {
            canvasCtx.clearRect(0, 0, theCanvas.width, theCanvas.height);

            if (!theball.isStopped) {
                theball.draw();
            };

            if (theball.HasHitBottom) {
                canvasCtx.fillStyle = 'red';
                canvasCtx.fillText('Game over!', 150, 100);
                canvasCtx.fillText('You lose!', 170, 200);
                return;
            };

            drawBricks();

            if (bricks.length === 0) {
                canvasCtx.fillStyle = 'green';
                canvasCtx.fillText('You win!', 170, 200);

                var nextLevelButton = document.querySelector('#nextlevel');
                nextLevelButton.style.visibility = 'visible';
                nextLevelButton.addEventListener('click', bricksGame.updateLevel, false);
                theball.isStopped = true;                            
            }

            checkForColision();
            gamePad.draw();
            requestAnimationFrame(drawGameField);
        }

       
        //Brick and ball
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

            if (theball.y + theball.radius >= gamePad.padStartY &&
                gamePad.padStartX <= theball.x - theball.radius &&
                    theball.x + theball.radius <= gamePad.padStartX + gamePad.padWidth) {
                theball.down *= -1;
            }
        }

        self.startGame = function () {
            requestAnimationFrame(drawGameField);
        }

        self.updateLevel=function() {
            if (self.level < 5) {
                self.level++;
            }

            theball.x = 15;
            theball.y = Math.floor(theCanvas.height / 2);

            var nextLevelButton = document.querySelector('#nextlevel');
            nextLevelButton.style.visibility = 'hidden';
            theball.isStopped = false;

            var startpointX = 20,
               startpointY = 30,
               brickHeight = 20,
               brickWidth = 50;

            bricks = [];
            for (var i = 0; i < self.level; i++) {
                while (startpointX + brickWidth < theCanvas.width) {
                    var newBrick = brick(startpointX, startpointY, brickWidth, brickHeight);
                    bricks.push(newBrick);
                    //update position
                    startpointX += 6 + brickWidth;
                }
                startpointX = 20;
                startpointY += brickHeight + 5;
            }
        };

        return self;
    }

    function ball() {
        var self = {},
            speed = 3;

        self.radius = 10;
        self.right = +1;
        self.down = +1;
        self.HasHitBottom = false;
        self.isStopped = false;

        self.x = 15;//Math.floor(theCanvas.width / 2);
        self.y = Math.floor(theCanvas.height / 2);

        self.draw = function () {
            self.x += speed * self.right;
            self.y += speed * self.down;

            // right
            if (self.right == +1 && self.x >= theCanvas.width - self.radius) {
                self.right = -1;
                self.x += speed * self.right;
            } else

                // down
                if (self.down == +1 && self.y >= theCanvas.height - self.radius) {
                    //self.down = -1;
                    //self.y += speed * self.down;
                    self.HasHitBottom = true;
                } else

                    // left
                    if (self.right == -1 && self.x <= self.radius) {
                        self.right = +1;
                        self.x += speed * self.right;
                    } else

                        // up
                        if (self.down == -1 && self.y <= self.radius) {
                            self.down = +1;
                            self.y += speed * self.down;
                        }

            if (!self.HasHitBottom) {
                canvasCtx.fillStyle = '#FF0000';
                canvasCtx.beginPath();
                canvasCtx.arc(self.x, self.y, self.radius, 0, 2 * Math.PI);
                canvasCtx.fill();
            }
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
            canvasCtx.fillStyle = 'darkgreen';
            //canvasCtx.lineWidth = self.width;
            canvasCtx.fill();
            canvasCtx.stroke();
        }
        return self;
    }

    function pad() {
        var self = {},
            moveDistance = 50;

        self.padWidth = 300;
        self.padHeight = 10;
        self.padStartX = theCanvas.width / 2 - self.padWidth / 2;
        self.padStartY = theCanvas.height - self.padHeight * 2;

        self.draw = function () {
            document.body.addEventListener("keydown", function (e) {
                if (!e) {
                    e = window.event;
                }

                switch (e.keyCode) {
                    case 37:
                        moveLeft();
                        break;
                    case 39:
                        moveRight();
                        break;
                }
            });
            self.draw = function () {
                canvasCtx.beginPath();
                canvasCtx.rect(self.padStartX, self.padStartY, self.padWidth, self.padHeight);
                canvasCtx.fill();
                canvasCtx.stroke();
            }
        }

        function moveLeft() {
            if (self.padStartX - moveDistance / 4 > 0) self.padStartX -= moveDistance;
        }

        function moveRight() {
            if (self.padStartX + self.padWidth + moveDistance / 4 < theCanvas.width) self.padStartX += moveDistance;
        }

        return self;
    }

    function restart() {
        document.location.href = "";
    }
