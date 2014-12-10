function Ball(radius, color) {
    Shape.call(this);
    this.radius = radius;
    this.color = color;
}

Ball.prototype = new Shape();

Ball.prototype.constructor = Ball;

Ball.prototype.draw = function(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    context.closePath();     
    context.fill();    
};

Ball.prototype.rateX = function() {
    return Math.sin(this.angle) * this.speed;
};

Ball.prototype.rateY = function() {
    return -Math.cos(this.angle) * this.speed;
};

Ball.prototype.checkCollision = function() {
    if () {

    }

    if (this.x == (Game.leftWall + this.radius) || 
        this.x == (Game.rightWall - this.radius) ||
        this.y == (Game.topWall + this.radius)) {

        this.onCollision("wall");
    }  
    
    if (this.y >= (Game.player.y - this.radius) &&
        this.y <= (Game.player.y + Game.player.height + this.radius) &&
        this.x >= (Game.player.x - this.radius) && 
        this.x <= (Game.player.x + Game.player.width + this.radius)) {

        this.onCollision("paddle");
    }

    if (this.y < (Game.bottomWall + this.radius)) {
        console.log("gameover");
    } 

Ball.prototype.onCollision = function(collider) {
    switch (collider) {
        case "brick":
            break;  

        case "wall": 
            if (this.y == (Game.topWall + this.radius)) {
                this.rateY() *= -1;
            } else {
                this.rateX() *= -1;
            }
            break;

        case "paddle":
            if (this.x == (Game.player.x - this.radius)) {

            } else {

            }
            break;
    }
}