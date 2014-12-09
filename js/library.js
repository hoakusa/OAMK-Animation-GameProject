function Shape() { 
    this.x = 0;
    this.y = 0;
    this.speed = 0;
}

Shape.prototype.rateX = function() { 
    return 0; 
};

Shape.prototype.rateY = function() { 
    return 0; 
};

Shape.prototype.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
};

Shape.prototype.setStatus = function(angle, speed) {
    this.angle = angle * Math.PI/ 180;
    this.speed = speed;
}

Shape.prototype.update = function() {
    this.x += this.rateX();
    this.y += this.rateY();
};

function Ball(radius, color) {
    Shape.call(this);
    this.radius = radius;
    this.color = color;
}

Ball.prototype = new Shape();

Ball.prototype.constructor = Ball;

Ball.prototype.draw = function() {
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
    return Math.cos(this.angle) * this.speed;
};

function Paddle(width, height, color) {
    Shape.call(this);
    this.width = width;
    this.height = height;
    this.color = color;
}

Paddle.prototype = new Shape();

Paddle.prototype.constructor = Paddle;

Paddle.prototype.draw = function() {
    context.fillStyle = this.color;
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.closePath();     
    context.fill();
};

Paddle.prototype.rateX = function() {
    return this.speed;
};

Paddle.prototype.rateY = function() {
    return 0;
};

