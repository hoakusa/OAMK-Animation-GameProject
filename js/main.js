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

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context.fillStyle = "black";
context.fillRect(0, 0, canvas.width, canvas.height);

