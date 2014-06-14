function Pad() {
    var self = {},
        moveDistance = 50;

    self.padWidth = 200;
    self.padHeight = 20;
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
};
