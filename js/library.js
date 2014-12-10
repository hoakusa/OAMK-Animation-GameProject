function Shape() { 
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.angle = 0;
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
