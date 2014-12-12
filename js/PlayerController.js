//****************************************
//  Paddle Object  - manage Paddle's state
//****************************************  
function Paddle(width, height, color) {
    Shape.call(this); //call Shape object
    this.width = width; //default values
    this.height = height;
    this.color = color;
    this.moveDir = "none";
}

Paddle.prototype = new Shape();

Paddle.prototype.constructor = Paddle;

Paddle.prototype.draw = function(context) { //draw paddle
    context.fillStyle = this.color;
    context.fillStroke = "#aaaaaa";
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.closePath();     
    context.fill();
    context.stroke();
};

Paddle.prototype.keyDown = function(event) {
    switch (event.keyCode) {
        case 37:  /* Left arrow was pressed */
            // move left
            this.moveDir = "left";
            break; 
        case 39:  /* Right arrow was pressed */
            // move right
            this.moveDir = "right";
            break;
    }
}

Paddle.prototype.keyUp = function(event) {
    switch (event.keyCode) {
        case 37:  /* Left arrow was pressed */
        case 39:  /* Right arrow was pressed */
            this.moveDir = "none"
        break;
   }
}

Paddle.prototype.update = function() {
    //prevent the paddle go inside wall
    if (this.moveDir == "left") {
        //comparion the distance from the paddle to left wall and paddle's speed
        this.x = Math.max(this.x - this.speed, game.leftWall);
    } else if (this.moveDir == "right") {
        //comparion the distance from the paddle to right wall and paddle's speed
        this.x = Math.min(this.x + this.speed, game.rightWall - this.width);
    }
}