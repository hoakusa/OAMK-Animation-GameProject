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

function Map(width, height) {
    this.width = width;
    this.height = height;
}

Map.prototype.draw = function(context) {
    for (var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].draw(context);
    }
}

Map.prototype.setBlock = function(blockW, blockH, ColNumber, RowNumber) {
    this.blockWidth = blockW;
    this.blockHeight = blockH;
    this.blockCol = ColNumber;
    this.blockRow = RowNumber;
}

Map.prototype.setTitle = function(index) {
    var index = index - 1;    
    var mapTypes = [  
        [   //map1
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 2, 0, 2, 2, 2, 2, 0, 2, 0,
            0, 3, 3, 3, 3, 3, 3, 3, 3, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 2, 2, 2, 0, 0, 2, 2, 2, 0,
            0, 0, 2, 2, 0, 0, 2, 2, 0, 0,
            0, 0, 0, 2, 0, 0, 2, 0, 0, 0,
            0, 0, 0, 0, 3, 3, 0, 0, 0, 0,
            0, 0, 0, 0, 3, 3, 0, 0, 0, 0,
            0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
            0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ] 
    ];

    var layout = mapTypes[index];
    this.blocks = [];

    for (var i = 0; i < layout.length; i++) {
        var blockType = layout[i];

        if (blockType > 0) {
            var blockX = (i % this.blockCol) * this.blockWidth;
            var blockY = Math.floor(i / this.blockCol) * this.blockHeight;

            var brick = new Brick(this.blockWidth, this.blockHeight);
            brick.setPosition(blockX, blockY);
            brick.setType(blockType);

            this.blocks.push(brick);
        }
    }
}

