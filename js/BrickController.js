//****************************************
//  Brick Object  - manage bricks
//****************************************  
function Brick(width, height) {
    Shape.call(this); //default values
    this.width = width;
    this.height = height;
}

Brick.prototype = new Shape();

Brick.prototype.constructor = Brick;

Brick.prototype.draw = function(context) { //draw brick
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
	//list of brick types
	var typeBrick = [ 
	    {id: 1, color: "#ec0000", status: 1}, 
	    {id: 2, color: "#0066cc", status: 1}, 
	    {id: 3, color: "#00e500", status: 1},
	    {id: 4, color: "#eeeb00", status: 1}
	];

	this.color = typeBrick[getIndex].color;
	this.status = typeBrick[getIndex].status;
}

Brick.prototype.update = function() {
	if (this.status == 0) { //only use effect for destroyed block
		//effect for block
        this.x += this.width / 4;
        this.y += this.height / 4;
        this.width -= this.width / 2;
        this.height -= this.height / 2;         
	}
}

