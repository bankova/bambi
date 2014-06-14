function Brick(startpointX, startpointY, width, height) {
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