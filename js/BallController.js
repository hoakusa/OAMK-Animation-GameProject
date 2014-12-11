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

    if (this.x <= (game.leftWall + this.radius) || 
        this.x >= (game.rightWall - this.radius) ||
        this.y <= (game.topWall + this.radius)) {

        this.onCollision("wall");
    }  
    
    if (this.y >= (game.player.y - this.radius) &&
        this.y <= (game.player.y + game.player.height + this.radius) &&
        this.x >= (game.player.x - this.radius) && 
        this.x <= (game.player.x + game.player.width + this.radius)) {

        this.onCollision("paddle");
    }

    if (this.y > (game.bottomWall + this.radius)) {
        
    }

} 

Ball.prototype.onCollision = function(collider) {
    switch (collider) {
        // case "brick":
        //     break;  

        case "wall": 
            if (this.y <= (game.topWall + this.radius)) {
                this.angle = Math.PI - this.angle;
            } else {
                this.angle = -this.angle;
            }
            break;

        case "paddle":
            if (this.x == (game.player.x - this.radius) || 
                this.x == (game.player.x + game.player.width + this.radius)) {

                this.angle = -this.angle;
            } else {
                this.angle = Math.PI - this.angle;
            }
            break;
    }
}

Ball.prototype.update = function() {
    this.checkCollision();
    this.x += this.rateX();
    this.y += this.rateY();
};

