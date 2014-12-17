/* Set the requestAnimFrame function to use the correct function per the browser. 
   If the browser is not supporting requestAnimationFrame function at all, then the backup
   is to use regular timer to achieve more or less the same. */
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     ||  
			function( callback ){
				return window.setTimeout(callback, 1000 / 60);
			};
})();

window.cancelRequestAnimFrame = ( function() {
	return window.cancelAnimationFrame              ||
		window.webkitCancelRequestAnimationFrame    ||
		window.mozCancelRequestAnimationFrame       ||
		window.oCancelRequestAnimationFrame         ||
		window.msCancelRequestAnimationFrame        ||
		clearTimeout
})();

//****************************************
//  Game Object  - manage Game states
//****************************************  
function Game(index) {
	this.canvas = document.getElementById("canvas");
	this.context = this.canvas.getContext("2d");
	this.context.font = "30px Tahoma";
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

	this.mapIndex = index; // get index of type Map
	this.setUp(); // game setting
	this.draw(); // draw objects		
}

Game.prototype.setUp = function() {
	// Wall informations
	this.leftWall = 0;
	this.rightWall = this.canvas.width;
	this.topWall = 0;
	this.bottomWall = this.canvas.height;

	// Block Information
	this.blockWidth = 50; 
	this.blockHeight = 25;
	this.blockCol = this.canvas.width / this.blockWidth; //Number of columns
	this.blockRow = this.canvas.height / this.blockHeight; // Number of rows
	this.totalBlocks = this.blockCol * this.blockRow;

	this.player = new Paddle(70, 10, "#2ecc71"); // create a new paddle/player
    this.player.setPosition( // set width and height for paddle
    	this.canvas.width / 2 - this.player.width / 2, 
    	this.canvas.height - this.player.height - 30
    );
    this.player.speed = 10; // the speed of paddle

	this.mainBall = new Ball(8, "white"); // create a new ball (main ball in this game)
	this.iniBallY = this.canvas.height - this.player.height - 31 - this.mainBall.radius;
    this.mainBall.setPosition(this.canvas.width / 2, this.iniBallY);// initial position
    this.mainBall.setStatus(30, 5); // set initial angle and speed for ball

    this.map = new Map(this.canvas.width, this.canvas.height); // create a new map
    this.map.setBlock(this.blockWidth, this.blockHeight, this.blockCol, this.blockRow);
    this.map.setTitle(this.mapIndex); // choose a type of map

    /* the states of game, which includes:
	0 means before starting/restarting
	1 means currently playing
	2 means game over 
	*/
	this.status = 0;
	this.result = 1; //Default setting player wins
}

Game.prototype.draw = function() {
	// clear previous canvas
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	//draw objects
	this.mainBall.draw(this.context); 
	this.player.draw(this.context);
	this.map.draw(this.context);

	if (this.status == 0) this.screenStart(); //default game state
	if (this.status == 2) this.screenGameover();
}

Game.prototype.screenUpdate = function() {
	if (this.status == 1) {
		this.update();
	} 
}

Game.prototype.screenStart = function() {
	var text = "Press Space to start game";
    var textWidth = this.context.measureText(text).width;

    // show the notification from game
    this.context.strokeStyle = "#aaaaaa";
    this.context.strokeText(text, (this.canvas.width - textWidth) / 2, 400);
    this.context.fillStyle = "#FFF7BD";
    this.context.fillText(text, (this.canvas.width - textWidth) / 2, 400);
}

Game.prototype.screenGameover = function() {	
	var text = [];

	if (this.result) { // call the status of player win or lose
		text = ["You win!"];
	} else {
		text = ["You lose!"];
	} // end of if-result

	text.push("Press Space to restart game");
	for (var i = 0; i < text.length; i++) { 
	    var textWidth = this.context.measureText(text[i]).width;
	    // show the notification from game
	    this.context.strokeStyle = "#aaaaaa";
	    this.context.strokeText(text[i], (this.canvas.width - textWidth) / 2, 400 + 30*i);
	    this.context.fillStyle = "#FFF7BD";
	    this.context.fillText(text[i], (this.canvas.width - textWidth) / 2, 400 + 30*i);
	}
	
	// Stop the Animation
	cancelRequestAnimFrame(this.init);
}
	
Game.prototype.update = function() {
	this.mainBall.update();
	this.player.update();
	this.map.update();
}

Game.prototype.start = function() {
	this.gameLoop();
}

Game.prototype.gameLoop = function() {
	// Request a new animation frame from the browser. 
	this.init = requestAnimFrame(this.gameLoop.bind(this));

	this.screenUpdate();// Execute the update phase of the animation loop
	this.draw(); // draw everything in canvas, render function draw()
}

Game.prototype.pressSpace = function(event) {
	// When pressing Space to start/restart a game
    if (event.keyCode == 32) {

    	if (this.status == 0 || this.status == 2) {
    		if(this.status == 2) {
        		startmap(this.mapIndex);
        	} // end of reset Game object      
            this.status = 1; // switch to playing_status
        } //end of reset game state back to 1
    } //end of if-keyCode
}

var game = null;
function startmap(mapIndex) {
	// create a new game object
	game = new Game(mapIndex);
	window.addEventListener('keydown', function (event) { game.player.keyDown(event); game.pressSpace(event);});
	window.addEventListener('keyup', function (event) { game.player.keyUp(event); });
	game.start(); // start the game
}