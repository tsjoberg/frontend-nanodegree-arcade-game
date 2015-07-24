// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed * dt;

    //Update grid cell position based on x value (y is always the same)
    if(this.x < -80) {
        this.cellPosition.column = 0;
    } else if(this.x <= 0) {
        this.cellPosition.column = 1;
    } else {
        this.cellPosition.column = Math.floor(this.x / 100) +2;
    }
    
    if(this.cellPosition.column > 5) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Resets Enemy after crawling off screen
Enemy.prototype.reset = function() {
    this.x = -100;
    this.y = 60 + Math.floor(Math.random() * 3) * 83;
    this.speed = 10 * Math.floor(Math.random() * 10) + 10;

    this.cellPosition = {
        row: ((this.y - 60) / 83) + 2,
        column: 1
    };
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.resetPosition();
};

// Resets Player starting position
Player.prototype.resetPosition = function(dt) {
    this.x = 200;
    this.y = 405;
    
    //Set initial cell position
    this.cellPosition = {
        row: 6,
        column: 3
    };
};

Player.prototype.update = function(dt) {
    //noop
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move Player and and update cell position. Player cannot move out of grid.
Player.prototype.handleInput = function(direction) {
    if(direction === 'up' && this.cellPosition.row > 1) {
        this.y = this.y - 83;
        this.cellPosition.row = this.cellPosition.row - 1;
        // If Player reaches water reset to starting position
        if(this.cellPosition.row == 1){
            this.resetPosition();
        }
    }

    if(direction === 'down' && this.cellPosition.row < 6) {
        this.y = this.y + 83;
        this.cellPosition.row = this.cellPosition.row + 1;
    }

    if(direction === 'left' && this.cellPosition.column > 1) {
        this.x = this.x - 101;
        this.cellPosition.column = this.cellPosition.column - 1;
    }

    if(direction === 'right' && this.cellPosition.column < 5) {
        this.x = this.x + 101;
        this.cellPosition.column = this.cellPosition.column + 1;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player();

// Generate Enemies
for(var i=0; i < 5; i++){
    allEnemies.push(new Enemy());
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
