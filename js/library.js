//****************************************
//  Shape Object  - create new Shape object
//****************************************  
function Shape() { 
    // default values
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.angle = 0;
}

Shape.prototype.rateX = function() { // delta X
    return 0; 
};

Shape.prototype.rateY = function() { // delta Y
    return 0; 
};

Shape.prototype.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
};

Shape.prototype.setStatus = function(angle, speed) {
    this.angle = angle * Math.PI/ 180; // set the angle 
    this.speed = speed; // set the speed
}

Shape.prototype.update = function() { // update shape's state
    this.x += this.rateX();
    this.y += this.rateY();
};

//****************************************
//  Map Object  - store types of Map
//****************************************  

function Map(width, height) {
    this.width = width; // get map width, height that are equal to canvas's
    this.height = height;
}

Map.prototype.setBlock = function(blockW, blockH, ColNumber, RowNumber) {
    // get the sizes of the block 
    this.blockWidth = blockW; 
    this.blockHeight = blockH;
    this.blockCol = ColNumber;
    this.blockRow = RowNumber;
}

Map.prototype.setTitle = function(index) {
    var index = index - 1; // to get index of Array 
    var mapTypes = [  
        [   //map1
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 2, 2, 2, 2, 0, 0, 0,
            0, 0, 0, 2, 0, 0, 2, 0, 0, 0,
            0, 0, 0, 2, 0, 0, 2, 0, 0, 0,
            0, 0, 0, 2, 2, 2, 2, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
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
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ],
        [   //map2
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
            0, 0, 0, 1, 2, 2, 1, 0, 0, 0,
            0, 0, 1, 2, 0, 0, 2, 1, 0, 0,
            0, 1, 2, 0, 0, 0, 0, 2, 1, 0,
            1, 2, 0, 0, 0, 0, 0, 0, 2, 1,
            1, 2, 0, 0, 0, 0, 0, 0, 2, 1,
            0, 1, 2, 0, 0, 0, 0, 2, 1, 0,
            0, 0, 1, 2, 0, 0, 2, 1, 0, 0,
            0, 0, 0, 1, 2, 2, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
            0, 4, 4, 0, 0, 0, 0, 4, 4, 0,
            0, 4, 4, 0, 0, 0, 0, 4, 4, 0,
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

    var layout = mapTypes[index]; // get information about map layout
    this.blocks = []; // list of all bricks
    this.numberOfBlocks = 0; 

    for (var i = 0; i < layout.length; i++) { 
        var blockType = layout[i]; // get brick types to create the bricks array

        if (blockType > 0) { // if the block is active
            var blockX = (i % this.blockCol) * this.blockWidth;
            var blockY = Math.floor(i / this.blockCol) * this.blockHeight;

            //create a new brick
            var brick = new Brick(this.blockWidth, this.blockHeight);
            brick.setPosition(blockX, blockY);
            brick.setType(blockType);

            this.blocks.push(brick); // push new brick into Bricks array
            this.numberOfBlocks++; // count the number of undestroy blocks in map 
        } //end of check the block is actived
    } //end of for-loop
}

Map.prototype.draw = function(context) {
    for (var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].draw(context); // draw each of block list
    }
}

Map.prototype.update = function() {
    for (var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].update(); // update each of block list
    }
}
