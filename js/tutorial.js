//****************************************
//  Game Object  
//****************************************    
function Game(canvasElement)
{

    this.gc = canvasElement.getContext("2d");        
    // this.gc.font = "30px Arial";

    this.canvasWidth = canvasElement.getAttribute("width");        
    this.canvasHeight = canvasElement.getAttribute("height");;
    this.blockWidth = 50;
    this.blockHeight = 25;
    
    // Create the club object 
    this.theClub = new Club(this.canvasWidth /2,
                            this.canvasHeight - 40,
                            this.blockWidth * 2, this.blockHeight / 2);
    
    
    // Create the ball object and place it to the bottom half of the canvas
    // Set also the initial speed with the constructor
    ballStartPosX = this.canvasWidth / 2;
    ballStartPosY = this.canvasHeight - this.canvasHeight / 8 - 50;
    this.theBall = new Ball(5, ballStartPosX, ballStartPosY);
    
    // Set key event handlers        
            
    
    this.render();
                    
}

Game.prototype.update = function ()
{
    // Execute the update function for the player controlled club
    this.theClub.update();

    // Execute the update function for the ball
    this.theBall.update();			
}
  
Game.prototype.render = function ()
{
    // Clear the canvas 
    this.gc.clearRect(0, 0, this.canvasWidth, this.canvasHeight);		

    // Draw the ball 
    this.theBall.draw(this.gc);

    // Draw the club
    this.theClub.draw(this.gc);	   
}
    
Game.prototype.gameLoop = function()
{
    // Request a new animation frame from the browser. 
    // Note the use of ECMAScript5 bind() to allow object method to be passed as a callback
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
    requestAnimFrame(this.gameLoop.bind(this));

    // Execute the update phase of the animation loop
    this.update();		

    // Render everything on the canvas since all positions have just been updated
    this.render();
}
    
Game.prototype.start = function()
{
    this.gameLoop();   
}
    
Game.prototype.keyDown = function(event)
{
    switch (event.keyCode)
    {
        case 37:  /* Left arrow was pressed */
            console.log("left");
			this.theClub.move("LEFT");
            break;
        case 39:  /* Right arrow was pressed */
            console.log("right");
			this.theClub.move("RIGHT");
            break;
    }
}

Game.prototype.keyUp = function(event)
{
    switch (event.keyCode)
    {
        case 37:  /* Left arrow was pressed */
        case 39:  /* Right arrow was pressed */
            this.theClub.move("NONE");
        break;
   }   
}
    


//****************************************
//  Club Object  
//****************************************  
function Club(centerPosX, centerPosY, width, height)
{        
    this.x = centerPosX - width / 2;
    this.y = centerPosY - 40;
    this.width = width; 
    this.height = height; 
    this.moveDir = "NONE";	

}

// Define the draw function for the club class
Club.prototype.draw = function(graphCtx)
{
    graphCtx.beginPath();
    graphCtx.rect(this.x, this.y, this.width, this.height);
    
    graphCtx.fillStyle = "blue";
    graphCtx.fill();
    graphCtx.strokeStyle = "gray";
    graphCtx.stroke();
    graphCtx.closePath(); 
}

// Define the move function for the club class
Club.prototype.move = function(amount)
{
    this.moveDir = amount;  		  	
}

// Define the update function for the club class
Club.prototype.update = function()
{
    if(this.moveDir == "LEFT")
    {
        this.x -= 5;  			
    }
    else if(this.moveDir == "RIGHT")
    {
        this.x += 5;
    }
}

//****************************************
//  Ball Object  
//****************************************  
function Ball(speed, startPosX, startPosY)
{
    this.x = startPosX;
    this.y = startPosY;
    this.vy = -0.75;
    this.vx = 0.25;
    this.radius = 8;  		
    this.speed = speed;
}

// Define the draw function for the ball class
Ball.prototype.draw = function(graphCtx)
{
    graphCtx.beginPath();
    graphCtx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    graphCtx.fillStyle = "rgb(130,130,130)";
    graphCtx.fill();
    graphCtx.strokeStyle = "white";
    graphCtx.stroke();
    graphCtx.closePath();  		
}
    
Ball.prototype.checkWallHits = function()
{
    // Put contconhe code to check wall hits here
}	

Ball.prototype.checkClubHit = function()
{
    // put the code to check club hit here
}  	  

Ball.prototype.update = function()
{
    // Check if the end of the screen is reached - eg. ball missed the club
    if(this.y >= Game.canvasHeight)
    {  			
        this.vy = 0;
        this.vx = 0;			
    }
            
    // Check if the ball hits an edge wall
    this.checkWallHits();  		
    
    // Check if the ball hits the club
    this.checkClubHit();  		  		
    
    // Update the ball position 
    this.x += this.vx * this.speed;
    this.y += this.vy * this.speed;
}
      
                
                

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
            window.setTimeout(callback, 1000 / 60);
          };
})();        
                
var game = null;
function start()
{
    // Create the game object
    game = new Game(document.getElementById("canvasTarget"));
	window.addEventListener('keydown', function (event) { game.keyDown(event); });
		window.addEventListener('keyup', function (event) { game.keyUp(event); });
                    
    // Start the game
    game.start();

}