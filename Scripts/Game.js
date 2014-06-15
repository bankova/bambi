var theCanvas;
var canvasCtx;
var bricksGame = new Game("the-canvas");
var newGameButton = document.querySelector('#newgame');
newGameButton.addEventListener('click', bricksGame.restart, false);


window.onload = function () {
    bricksGame.startGame();
    bricksGame.updateLevel();
};

    function Game(canvasContainerId) {
        var self = {};

        theCanvas = document.getElementById(canvasContainerId);
        canvasCtx = theCanvas.getContext("2d");
        canvasCtx.font = 'italic 40pt Calibri';

        var theball = new Ball(),
            bricks = [],
            gamePad = new Pad();

        self.level = 0;
        self.bonus = 100;
        self.score = 0;

        function drawBricks() {
                for (var i = 0; i < bricks.length ; i++) {
                    var currentBrick = bricks[i].draw();
                }
            }

        function drawGameField() {
            canvasCtx.clearRect(0, 0, theCanvas.width, theCanvas.height);

            if (!theball.isStopped) {
                theball.draw();
            }

            if (theball.HasHitBottom) {
                canvasCtx.fillStyle = 'red';
                canvasCtx.fillText('Game over!', 170, 100);
                canvasCtx.fillText('You lose!', 190, 200);
                return;
            }

            drawBricks();

            if (bricks.length === 0) {
                canvasCtx.fillStyle = 'green';
                canvasCtx.fillText('You win!', 200, 200);

                var nextLevelButton = document.querySelector('#nextlevel');
                nextLevelButton.style.visibility = 'visible';
                nextLevelButton.addEventListener('click', bricksGame.updateLevel, false);
                theball.isStopped = true;                            
            }

            checkForColision();
            gamePad.draw();
			$('#score').text('Score: '+self.score + ' ');
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
                    self.score += self.bonus;
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
        };

        self.restart = function () {
            document.location.href = "";
        };

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
                    var newBrick = new Brick(startpointX, startpointY, brickWidth, brickHeight);
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