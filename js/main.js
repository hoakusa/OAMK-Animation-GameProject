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

function Game() {
	this.canvas = document.getElementById("canvas");
	this.context = this.canvas.getContext("2d");
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

	this.setUp();
	this.draw();
}

Game.prototype.setUp = function() {
	this.leftWall = 0;
	this.rightWall = this.canvas.width;
	this.topWall = 0;
	this.bottomWall = this.canvas.height;

	this.player = new Paddle(100, 10, "white");
    this.player.setPosition(this.canvas.width / 2 - this.player.width / 2, this.canvas.height - this.player.height - 30);
    this.player.speed = 10;

	this.mainBall = new Ball(7, "white");
	this.iniBallY = this.canvas.height - this.player.height - 31 - this.mainBall.radius;
    this.mainBall.setPosition(this.canvas.width / 2, this.iniBallY);
    this.mainBall.setStatus(40, 8);
}

Game.prototype.draw = function() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.mainBall.draw(this.context);
	this.player.draw(this.context);
}
	
Game.prototype.update = function() {
	this.mainBall.update();
	this.player.update();
}

Game.prototype.start = function() {
	this.gameLoop();
}

Game.prototype.gameLoop = function() {
	requestAnimFrame(this.gameLoop.bind(this));
	this.update();
	this.draw();
}

var game = null;
function start() {
	game = new Game();
	window.addEventListener('keydown', function (event) { game.player.keyDown(event); });
	window.addEventListener('keyup', function (event) { game.player.keyUp(event); });

	game.start();
}