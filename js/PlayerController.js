function Paddle(width, height, color) {
    Shape.call(this);
    this.width = width;
    this.height = height;
    this.color = color;
}

Paddle.prototype = new Shape();

Paddle.prototype.constructor = Paddle;

Paddle.prototype.draw = function(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.closePath();     
    context.fill();
};

Paddle.prototype.keyDown = function(event) {
    switch (event.keyCode) {
        case 37:  /* Left arrow was pressed */
            console.log("left");
            this.rateX = function() {
                return -this.speed;
            }
            break;
        case 39:  /* Right arrow was pressed */
            console.log("right");
            this.rateX = function() {
                return this.speed;
            }
            break;
    }
}

Paddle.prototype.keyUp = function(event) {
    switch (event.keyCode) {
        case 37:  /* Left arrow was pressed */
        case 39:  /* Right arrow was pressed */
            console.log("none");
            this.rateX = function() {
                return 0;
            }
        break;
   }
}