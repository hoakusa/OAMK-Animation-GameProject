function Brick(width, height) {
    Shape.call(this);
    this.width = width;
    this.height = height;
}

Brick.prototype = new Shape();

Brick.prototype.constructor = Brick;

Brick.prototype.draw = function(context) {
    context.fillStyle = this.color;
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.closePath();     
    context.fill();
    context.stroke();
};

Brick.prototype.setType = function(index) {
	var getIndex = index - 1; 
	var typeBrick = [ 
	    {id: 1, color: "red", status: 1}, 
	    {id: 2, color: "yellow", status: 1}, 
	    {id: 3, color: "blue", status: 1} 
	];

	this.color = typeBrick[getIndex].color;
	this.status = typeBrick[getIndex].status;
}

Brick.prototype.update = function() {
	
}

