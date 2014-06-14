function Ball() {
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