//****************************************
//  Ball Object  - manage Ball's state
//****************************************  
function Ball(radius, color) {
    Shape.call(this); //call from Shap object
    this.radius = radius; //default value
    this.color = color;
}

Ball.prototype = new Shape();

Ball.prototype.constructor = Ball;

Ball.prototype.draw = function(context) {//draw ball
    context.fillStyle = this.color;
    context.strokeStyle = "#aaaaaa";
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    context.closePath();     
    context.fill();  
    context.stroke();  
};

Ball.prototype.rateX = function() { //update delta X
    return Math.sin(this.angle) * this.speed;
};

Ball.prototype.rateY = function() { //update delta Y
    return -Math.cos(this.angle) * this.speed;
};

Ball.prototype.checkCollision = function() {

    //Check if the Ball collides Block
    for (var i = 0; i < game.map.blocks.length; i++) {
        this.block = game.map.blocks[i];
        this.block.index = i;     

        if (this.y >= (this.block.y - this.radius) &&
            this.y <= (this.block.y + this.block.height + this.radius) &&
            this.x >= (this.block.x - this.radius) && 
            this.x <= (this.block.x + this.block.width + this.radius)) {

            // only check the block that did not be destroyed.
            if (this.block.status > 0) this.onCollision("brick");
        }
    }

    //Check if the Ball collides wall
    if (this.x <= (game.leftWall + this.radius) || 
        this.x >= (game.rightWall - this.radius) ||
        this.y <= (game.topWall + this.radius)) {

        this.onCollision("wall");
    }  
    
    //Check if the Ball collides Paddle
    if (this.y >= (game.player.y - this.radius) &&
        this.y <= (game.player.y + game.player.height + this.radius) &&
        this.x >= (game.player.x - this.radius) && 
        this.x <= (game.player.x + game.player.width + this.radius)) {

        this.onCollision("paddle");
    }

    //check Game is over when the Ball hit the bottom wall
    if (this.y > (game.bottomWall + this.radius)) { 
        game.status = 2; // gameover
        game.result = 0; // Player loses
    }

} 

Ball.prototype.onCollision = function(collider) {
    switch (collider) {
        case "brick":

            /*  define whether the ball hit side of brick or hit top/bottom 
                of brick 
                1. find the intersection point M (x,y) of 2 lines IP and 
                the line is the left side of big rectangle that contains 
                the brick and d = r.
                with I is center of the Ball and P is center of the brick
                2. AB is the left side of the big rectangle (yA < yB).

                Hit side: If M is between A and B 
                Hit top/bottom: If M is not between A and B 
            */

            var Apoint = {x: (this.block.x - this.radius), y: (this.block.y - this.radius)};
            var Bpoint = {x: (this.block.x - this.radius), y: (this.block.y + this.block.height + this.radius)};
            var Ppoint = {
                x: (this.block.x + this.block.width / 2), 
                y: (this.block.y + this.block.height / 2)
            };
            // find the intersection point M 
            var Mpoint = {
                x: Apoint.x, 
                y: (Apoint.x * (Ppoint.y - this.y) / (Ppoint.x - this.x))
            };

            if (Mpoint.y >= Apoint.y && Mpoint.y <= Bpoint.y) { //hit side 
                this.angle = -this.angle;

            } else { //hit top/bottom 
                this.angle = Math.PI - this.angle;
            }
            // destroy the block
            this.block.status = this.block.status - 1; 
            game.map.numberOfBlocks--;

            //Game is over when out of blocks.
            if (game.map.numberOfBlocks == 0) game.status = 2;

            break;  

        case "wall": 
            if (this.y <= (game.topWall + this.radius)) {
                this.angle = Math.PI - this.angle;
            } else {
                this.angle = -this.angle;
            }
            break;

        case "paddle":
            // Define where the collision is as the same as the ball hit brick.
            var Apoint = {x: (game.player.x - this.radius), // top-left point of big rectangle
                          y: (game.player.y - this.radius)};
            var Bpoint = {x: (game.player.x - this.radius), // bot-left point of big rectangle
                          y: (game.player.y + game.player.height + this.radius)};
            var Ppoint = { //center of the paddle
                x: (game.player.x + game.player.width / 2), 
                y: (game.player.y + game.player.height / 2)
            };
            // find the intersection point M 
            var Mpoint = {
                x: Apoint.x, 
                y: (Apoint.x * (Ppoint.y - this.y) / (Ppoint.x - this.x))
            };

            if (Mpoint.y >= Apoint.y && Mpoint.y <= Bpoint.y) { //hit side 
                // push the ball out of the paddle
                if (this.x < Ppoint.x && this.x > Apoint.x) {
                    this.x = Apoint.x;

                } else if (
                    this.x > Ppoint.x &&
                    (this.x < game.player.x + game.player.width + this.radius)
                ) {
                    this.x = game.player.x + game.player.width + this.radius;
                }   
                // reflection
                this.angle = this.angle + Math.PI;

            } else { //hit top
                // push the ball out of the paddle
                if (this.y < Ppoint.y && this.y > Apoint.y) {
                    this.y = Apoint.y;
                    this.angle = Math.PI - this.angle;
                    // Some cases of reflection
                    if (this.x < Ppoint.x) {
                        this.angle -= 0.3;
                    } else if (this.x >= Ppoint.x) {
                        this.angle += 0.3;
                    }

                // Prevent the ball is bottom of the paddle
                } else if (this.y > Ppoint.y && this.y < Bpoint.y) {
                    
                }                     
            }
            break;
    }
}

Ball.prototype.update = function() {
    this.checkCollision(); 
    this.x += this.rateX();
    this.y += this.rateY();
};