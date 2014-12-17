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

Ball.prototype.findIntersection = function(a1, b1, c1, a2, b2, c2) {
    //Write the determinant
    var D = (a1 * b2) - (a2 * b1);
    var Dx = (b1 * c2) - (b2 * c1);
    var Dy = (c1 * a2) - (c2 * a1);

    if (D !== 0) { //the intersection is a point
        var intersect = {x: Dx / D, y: Dy / D, block: this.block,
                         distance: Math.sqrt(Math.pow(this.x - (Dx / D), 2) 
                                           + Math.pow(this.y - (Dy / D), 2))
                        };
        return intersect;
    }

    return false;
};

Ball.prototype.checkCollision = function() {
    //Create ball's status in next frame
    this.nextPositionX = this.x + this.rateX();
    this.nextPositionY = this.y + this.rateY();
    //Collect intersection points
    this.intersectArray = [];

    //Check if the Ball collides Block
    for (var i = 0; i < game.map.blocks.length; i++) {
        this.block = game.map.blocks[i];
        this.block.index = i;     

        if (this.block.status > 0 &&
            this.y >= (this.block.y - this.radius) &&
            this.y <= (this.block.y + this.block.height + this.radius) &&
            this.x >= (this.block.x - this.radius) && 
            this.x <= (this.block.x + this.block.width + this.radius)) {
            
            //Check Ball hit top side
            var hitTop = this.findIntersection(
                this.nextPositionY - this.y, this.x - this.nextPositionX, (this.nextPositionX * this.y) - (this.x * this.nextPositionY),
                0, 1, -this.block.y + this.radius);
            if (hitTop && 
                hitTop.x >= this.block.x - this.radius && //the intersection point is line on the side of brick
                hitTop.x <= this.block.x + this.block.width + this.radius) {

                hitTop.angle = Math.PI - this.angle;
                this.intersectArray.push(hitTop);                
            }
            //Check Ball hit bottom side
            var hitBottom = this.findIntersection(
                this.nextPositionY - this.y, this.x - this.nextPositionX, (this.nextPositionX * this.y) - (this.x * this.nextPositionY),
                0, 1, -this.block.y - this.block.height - this.radius);
            if (hitBottom &&
                hitBottom.x >= this.block.x - this.radius && 
                hitBottom.x <= this.block.x + this.block.width + this.radius) { 

                hitBottom.angle = Math.PI - this.angle;
                this.intersectArray.push(hitBottom);             
            }
            //Check Ball hit left side
            var hitLeft = this.findIntersection(
                this.nextPositionY - this.y, this.x - this.nextPositionX, (this.nextPositionX * this.y) - (this.x * this.nextPositionY),
                1, 0, -this.block.x + this.radius);
            if (hitLeft &&
                hitLeft.y >= this.block.y - this.radius && 
                hitLeft.y <= this.block.y + this.block.height + this.radius) {

                hitLeft.angle = -this.angle;
                this.intersectArray.push(hitLeft);                
            }
            //Check Ballhit right side
            var hitRight = this.findIntersection(
                this.nextPositionY - this.y, this.x - this.nextPositionX, (this.nextPositionX * this.y) - (this.x * this.nextPositionY),
                1, 0, -this.block.x - this.block.width - this.radius);
            if (hitRight &&
                hitRight.y >= this.block.y - this.radius && 
                hitRight.y <= this.block.y + this.block.height + this.radius) {

                hitRight.angle = -this.angle;
                this.intersectArray.push(hitRight);
            } //Close if hit side
        }//Close if-Collision
    }//Close for-loop
     
    //Ball bounces brick
    if (this.intersectArray.length > 0) { 
        //Filter first collision   
        if (this.intersectArray.length == 1) this.intersect = this.intersectArray[0];
        else { 
            for (var i = 0; i < this.intersectArray.length - 1; i++) { 
                this.intersectArray[i].distance < this.intersectArray[i + 1].distance 
                ? this.intersect = this.intersectArray[i] 
                : this.intersect = this.intersectArray[i + 1];
            }//Close for-loop
        }

        this.block = this.intersect.block;
        this.angle = this.intersect.angle;
        this.onCollision("brick");
    }//Close the condition    

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
                y: ((Apoint.x - this.x) * (Ppoint.y - this.y) / (Ppoint.x - this.x)) + this.y
            };

            if (Mpoint.y >= Apoint.y && Mpoint.y <= Bpoint.y) { //hit side 
                // push the ball out of the paddle
                if (this.x < Ppoint.x && this.x > Apoint.x) { //left
                    this.x = Apoint.x;

                } else if (
                    this.x > Ppoint.x &&
                    (this.x < game.player.x + game.player.width + this.radius)
                ) { //right
                    this.x = game.player.x + game.player.width + this.radius;
                }   
                // reflection
                this.angle = this.angle + Math.PI;

            } else { //hit top
                // push the ball out of the paddle
                if (this.y < Ppoint.y && this.y > Apoint.y) {
                    this.y = Apoint.y;
 
                    //Set max angle of when ball bounce the paddle
                    this.angle = Math.asin(Math.sin(this.angle)); 
                    var maxAngle = 7 * Math.PI / 18 - Math.abs(this.angle);                                    

                    //Reflect angle changes base on the collision point
                    //The further collision point is from center, the bigger the angle changes
                    this.angle += maxAngle * ((this.x - Ppoint.x) / (0.5 * game.player.width));
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