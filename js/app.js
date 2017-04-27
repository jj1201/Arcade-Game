// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //row can be any row from 1 to 3
    this.row = Math.floor(Math.random() * 3) + 1;
    //speed's range is from 10 to 39
    this.speedOpt = Math.floor(Math.random() * 5);
    this.speed = [150, 200, 250, 300, 350];
    this.x = -101;
    this.y = this.row *83 - 20;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed[this.speedOpt] * dt;
    if(this.x >= 505) {
        this.x = -101;
        this.row = Math.floor(Math.random() * 3) + 1;
    //speed's range is from 10 to 39
        this.speedOpt = Math.floor(Math.random() * 5);
        this.y = this.row *83 - 20;
        console.log("row = " + this.y + " , speed = " + this.speed[this.speedOpt]);
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//create three enermt objects
var Enermy1 = function(){
    Enemy.call(this);
}
Enermy1.prototype = Object.create(Enemy.prototype);
Enermy1.prototype.constructor = Enermy1;
var Enermy2 = function(){
    Enemy.call(this);
}
Enermy2.prototype = Object.create(Enemy.prototype);
Enermy2.prototype.constructor = Enermy2;
var Enermy3 = function(){
    Enemy.call(this);
}
Enermy3.prototype = Object.create(Enemy.prototype);
Enermy3.prototype.constructor = Enermy3;
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    //initilize the player at the 5th row and 2th column
   this.reset();
}
Player.prototype.update = function() {
    if(this.y < 0) {
       this.reset();
    }
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(key) {
    console.log(key);
    if(key === 'left' &&(this.x - 101) >= 0) {
        this.x -= 101;
    }else if(key === 'right' && (this.x + 101) <= 404) {
        this.x += 101;
    }
    else if(key === 'up' && (this.y - 83) >= -500) {
        this.y -= 83;
    }
    else if(key === 'down' && (this.y + 83) <= 606 - 171) {
        this.y += 83;
    }
}
Player.prototype.reset = function() {
    this.x = 2 * 101;
    this.y = 5 * 83 - 20;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enermy1();
var bug2 = new Enermy2();
var bug3 = new Enermy3();
var allEnemies = [bug1, bug2, bug3];
var player = new Player();


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
