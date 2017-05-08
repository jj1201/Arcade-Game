
var canvasWidth = 707;
var level = 0;
var totalScore = 0;
var layers = [
    {
        score : 0,
        life : 2,
        treeLoc : [[2, 1], [2, 2], [2, 3], [4, 2], [4, 3], [4, 4], [5, 4], [6, 4]],
        rockLoc : [[6, 2]],
        chestLoc : [[1, 0], [4, 0]],
        hiddenGemGet : 0,
        hiddenKeyGet : 0,
        hiddenGemIdx : 1,
        hiddenKeyIdx : 0,
        chestOpen : [false, false],
        gemLoc :[[1, 2],[5, 1]],
        keyLoc : [[0, 3],[5, 3]],
        keyNum : 2,
        gemNum : 2,
        keyGet : 0,
        gemGet : 0,
        hiddenDoorIdx : 6
    },
    {
        score : 0,
        life : 2,
        treeLoc : [[4, 5], [0, 5], [6, 5], [2, 5]],
        rockLoc : [[2, 3], [6, 2], [3, 1]],
        chestLoc : [[2, 0], [4, 0]],
        hiddenGemGet : 0,
        hiddenKeyGet : 0,
        hiddenGemIdx : 1,
        hiddenKeyIdx : 0,
        chestOpen : [false, false],
        gemLoc :[[6, 4],[3,5], [3, 2]],
        keyLoc : [[4, 4],[2,2]],
        keyNum : 2,
        gemNum : 3,
        keyGet : 0,
        gemGet : 0,
        hiddenDoorIdx : 6,
        bridge : [[[1, 2], [1, 3], [1, 4]], [[5, 2], [5, 3], [5, 4]]],
        
    },
    {
        score : 0,
        life : 2,
        treeLoc : [[1, 5], [5, 5]],
        rockLoc : [],
        chestLoc : [[1, 0], [5, 0]],
        hiddenGemGet : 0,
        hiddenKeyGet : 0,
        hiddenGemIdx : 1,
        hiddenKeyIdx : 0,
        chestOpen : [false, false],
        gemLoc :[[6, 5],[0,5], [5, 3]],
        keyLoc : [[1, 3],[4, 1]],
        keyNum : 2,
        gemNum : 3,
        keyGet : 0,
        gemGet : 0,
        hiddenDoorIdx : 6,
        bridge : [[[1, 2], [1, 3], [1, 4]], [[5, 2], [5, 3], [5, 4]]],
        
    }

];
var treeLoc = layers[level].treeLoc;
var rockLoc = layers[level].rockLoc;
var chestLoc = layers[level].chestLoc;
var gemLoc = layers[level].gemLoc;
var keyLoc = layers[level].keyLoc;

//the number of rows that have enermy bugs
var enermyRow = 4;
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //row can be any row from 1 to 4
    this.row = Math.floor(Math.random() * enermyRow) + 1;
    //speed's range is from 10 to 39
    this.speedOpt = Math.floor(Math.random() * 3);
    this.speed = [150, 200, 250, 300, 350];
    
    if(level === 2 && (this.row === 2 || this.row === 4)) {
          this.row--;
        }   
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
    if(this.x >= canvasWidth) {
        this.x = -101;
        this.row = Math.floor(Math.random() * enermyRow) + 1;
    //speed's range is from 10 to 39
        this.speedOpt = Math.floor(Math.random() * 3);
        if(level === 2 && (this.row === 2 || this.row === 4)) {
          this.row--;
        }   
        this.y = this.row *83 - 20;
        //console.log("row = " + this.row+ " , speed = " + this.speed[this.speedOpt]);
    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101, 171);
};
//create three enermt objects
// var Enermy1 = function(){
//     Enemy.call(this);
// }
// Enermy1.prototype = Object.create(Enemy.prototype);
// Enermy1.prototype.constructor = Enermy1;
// var Enermy2 = function(){
//     Enemy.call(this);
// }
// Enermy2.prototype = Object.create(Enemy.prototype);
// Enermy2.prototype.constructor = Enermy2;
// var Enermy3 = function(){
//     Enemy.call(this);
// }
// Enermy3.prototype = Object.create(Enemy.prototype);
// Enermy3.prototype.constructor = Enermy3;

// var Enermy4 = function(){
//     Enemy.call(this);
// }
// Enermy4.prototype = Object.create(Enemy.prototype);
// Enermy4.prototype.constructor = Enermy4;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var charPicker = 0;
var Player = function(){
    this.sprite = ['images/char-boy.png','images/char-cat-girl.png','images/char-horn-girl.png','images/char-pink-girl.png','images/char-princess-girl.png',];
    //initilize the player at the 5th row and 2th column
   this.reset();
}
Player.prototype.update = function() {
    if(this.y < 0) {
      // this.reset();
    }
    //get gems
    for(var i = 0; i < gemLoc.length; i++) {
        if(gemLoc[i][1] == (this.y + 20)/83 && gemLoc[i][0] == this.x/101) {
            console.log("get gem");
            gemLoc[i][0] = -1;
            gemLoc[i][1] = -1;
            layers[level].gemGet++;
            layers[level].score += 100;
            totalScore += 100;
            console.log(layers[level].gemGet);
        }
    }
    //get yellow keys
    if(layers[level].gemGet == layers[level].gemNum) {
        for(var i = 0; i < keyLoc.length; i++) {
            if(keyLoc[i][1] == (this.y + 20)/83 && keyLoc[i][0] == this.x/101) {
                console.log("get key");
                keyLoc[i][0] = -1;
                keyLoc[i][1] = -1;
                layers[level].keyGet++;
                console.log(layers[level].keyGet);
            }
        }
    }
    //isinWater(this.x, this.y);
    //this.inBridgeArea(this.x, this.y);
    
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite[charPicker]), this.x, this.y);
}
Player.prototype.handleInput = function(key) {
    if(key === 'up') {
        meetChests(this.x, this.y - 83);
    }

    //check bridge and water conditions for layer2
    if(level === 1) {
        //once on the bridge, can't jumo off the bridge

        console.log(" Before x = " + this.x/101 + ", y = " + (this.y + 20)/83);
         console.log("Before I am in the water : " + this.inWater);
         console.log(" Before I am underBridge : " + this.underBridge);
         console.log("Before I am on the bridge : " + this.onBridge);
         console.log(key);
         if((((this.x / 101 === 1 || this.x / 101 === 5) && (this.y + 20)/83 === 3 && key === 'up') || ((this.x / 101 === 1 || this.x / 101 === 5) && (this.y + 20)/83 === 4 && key === 'down')) && this.underBridge) {
            console.log("underBridge trying to land");
            return;
        }
        if((key === 'left'  || key ==='right')&& this.inBridgeArea(this.x, this.y) && !this.inWater) {
            console.log("on bridge trying to move left or right");
            return;
        }
        if(key === 'left' && this.inBridgeArea(this.x - 101, this.y) && !this.inWater) {
            console.log("on the land trying to jump on the bridge");
            return;
        }
        if(key === 'right' && this.inBridgeArea(this.x + 101, this.y) && !this.inWater) {
            console.log("on the land trying to jump on the bridge");
            return;
        }
        //determine after the move if the player is underWater or not. 
        if(key === 'left' && this.inWater && this.inBridgeAndWaterArea(this.x - 101, this.y) &&(this.x - 101) >= 0 && !meetTrees(this.x - 101, this.y) && !meetRocks(this.x - 101, this.y)) {
            console.log("11111");
            this.underBridge = true;
        }
        else if(key === 'right' && this.inWater && this.inBridgeAndWaterArea(this.x + 101, this.y) &&(this.x + 101) <= canvasWidth - 101 && !meetTrees(this.x + 101, this.y) && !meetRocks(this.x + 101, this.y)) {
             console.log("2222");
            this.underBridge = true;
        }
        else if(key === 'left' && this.inBridgeAndWaterArea(this.x, this.y)  &&(this.x - 101) >= 0 && !meetTrees(this.x - 101, this.y) && !meetRocks(this.x - 101, this.y)) {
             console.log("3333");
            this.underBridge = false;
        }
        else if(key === 'right' && this.inBridgeAndWaterArea(this.x, this.y) &&(this.x + 101) <= canvasWidth - 101 && !meetTrees(this.x + 101, this.y) && !meetRocks(this.x + 101, this.y)) {
             console.log("44444");
            this.underBridge = false;
        }
        //determine after the move if the player is onbridge or not
        if(key === 'up' && this.inBridgeArea(this.x, this.y - 83) && !this.isinWater(this.x, this.y)) {
            this.onBridge = true;
        }
        else if(key === 'down' && this.inBridgeArea(this.x, this.y + 83) && !this.isinWater(this.x, this.y)) {
            this.onBridge = true;
        }
        

    }if(level === 2) {
        console.log(key);
        if(key === 'jumpup') {
            if((this.y + 20)/83 === 5 || (this.y + 20)/83 === 3) {
                this.y -= 83 * 2;
                return;
            }
        }else if(key === 'jumpdown') {
             if(((this.y + 20)/83 === 1 || (this.y + 20)/83 === 3) && !meetTrees(this.x, this.y + 83*2) && !meetRocks(this.x, this.y + 83*2)) {
                this.y += 83 * 2;
                return;
            }
        }
        if(key === 'up' && ((this.y + 20 - 83)/83 === 2 || (this.y + 20 - 83)/83 === 4)) {
            //can't jump on the wall
            return;
        }else if(key === 'down' && ((this.y + 20 + 83)/83 === 2 || (this.y + 20 + 83)/83 === 4)) {
            return;
        }
    }

    console.log(key + "x : " + this.x);
    console.log(canvasWidth);
    console.log((this.x + 101) <= canvasWidth - 101);
    if(key === 'up' && layers[level].hiddenKeyGet === 1 && (this.x / 101) === 6 && ((this.y + 20 - 83)/83) === 0) {
        this.y -= 83;
    }
    if(key === 'left' &&(this.x - 101) >= 0 && !meetTrees(this.x - 101, this.y) && !meetRocks(this.x - 101, this.y)) {
        this.x -= 101;
    }else if(key === 'right' && (this.x + 101) <= canvasWidth - 101 && !meetTrees(this.x + 101, this.y) && !meetRocks(this.x + 101, this.y)) {
        console.log("move right");
        this.x += 101;
    }
    else if(key === 'up' && (this.y - 83) > 0 && !meetTrees(this.x, this.y - 83) && !meetRocks(this.x, this.y - 83)) {
        this.y -= 83;
    }
    else if(key === 'down' && (this.y + 83) <= 606 - 171 && !meetTrees(this.x, this.y + 83) && !meetRocks(this.x, this.y + 83)) {
        this.y += 83;
    }
    if((this.x/101 === 1 && (this.y + 20)/83 === 1)||(this.x/101 === 5 && (this.y + 20)/83 === 1)||(this.x/101 === 5 && (this.y + 20)/83 === 1)||(this.x/101 === 5 && (this.y + 20)/83 === 5)) {
            this.onBridge = false;
        }
    this.inWater = this.isinWater(this.x, this.y);
    // console.log(" After x = " + this.x/101 + ", y = " + (this.y + 20)/83);
    // console.log("After I am in the water : " + this.inWater);
    // console.log(" After I am underBridge : " + this.underBridge);
    // console.log("After I am on the bridge : " + this.onBridge);
   
}
Player.prototype.reset = function() {
    if(level === 0) {
        this.x = 3*101;
        this.y = 5 * 83 - 20;
    } else if(level === 1) {
        this.x = 1*101;
        this.y = 5 * 83 - 20;
        this.inWater = false;
        this.underBridge = false;
        this.onBridge = false;
    } else if(level === 2) {
         this.x = 3*101;
        this.y = 5 * 83 - 20;
    }
    
   
}
function meetTrees(playerX, playerY) {
    var row = (playerY + 20)/83;
    var col = playerX / 101;
    for(var i = 0; i < treeLoc.length; i++) {
        if(row == treeLoc[i][1] && col == treeLoc[i][0]) {
            return true;
        }
    }
    return false;
}
function meetRocks(playerX, playerY) {
    var row = (playerY + 20)/83;
    var col = playerX / 101;
    for(var i = 0; i < rockLoc.length; i++) {
        if(row == rockLoc[i][1] && col == rockLoc[i][0]) {
            return true;
        }
    }
    return false;
}
function meetChests(playerX, playerY) {
    var row = (playerY + 20)/83;
    var col = playerX / 101;
    for(var i = 0; i < chestLoc.length; i++) {
        if(row == chestLoc[i][1] && col == chestLoc[i][0] && layers[level].keyGet > 0 && layers[level].chestOpen[i] == false) {
            layers[level].chestOpen[i] = true;
            layers[level].keyGet--;
            console.log("i = " + i);
            console.log("hiddenKeyIdx = " + layers[level].hiddenKeyIdx);
            console.log("hiddenGemIdx = " + layers[level].hiddenGemIdx);
            
        }else if(row == chestLoc[i][1] && col == chestLoc[i][0] && layers[level].chestOpen[i] == true && i == layers[level].hiddenKeyIdx && layers[level].hiddenKeyGet === 0) {
             console.log("get hidden key");
            layers[level].hiddenKeyGet++;
            //layers[level].keyGet++;
        }else if(row == chestLoc[i][1] && col == chestLoc[i][0] && layers[level].chestOpen[i] == true && i == layers[level].hiddenGemIdx && layers[level].hiddenGemGet === 0) {
            console.log("get hidden gem");
            layers[level].hiddenGemGet++;
            layers[level].score += 150;
            totalScore += 150;
        }
    }
    
}

Player.prototype.inBridgeArea = function(x, y) {
    var row = (y + 20)/83;
    var col = x / 101;
    //console.log("is on bridge : row = " + row + " col = " + col); 
    if((col === 1 || col ===5) && (row >=2 && row <= 4)) {
        return true;
    }else {
        return false;
    }
}

Player.prototype.isinWater = function(x, y) {
  
    var row = (y + 20)/83;
    var col = x / 101;

    //console.log("in water test row = " + row +" col = " + col);
    if(row === 3 &&(col === 0 || col === 2 || col === 3 || col === 4 || col === 6) || (row === 4 && col === 3)) {
        return true;
    }
    else if(row === 2 &&(col === 0 || col === 2 || col === 3 || col === 4 || col === 6) || (row === 5 && col === 3)) {
        return false;
    }else {
        return this.inWater;
    }

    console.log("in water test : " + this.inWater);
}
 Player.prototype.inBridgeAndWaterArea = function(x, y) {
    var row = (y + 20)/83;
    var col = x / 101;
    if((col === 1 || col ===5) && row >=3 && row <= 4) {
        return true;
    }else{
        return false;
    }
    
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
/*var bug1 = new Enermy1();
var bug2 = new Enermy2();
var bug3 = new Enermy3();*/
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var bug4 = new Enemy();
//var bug5 = new Enemy();
var allEnemies = [bug1, bug2, bug3, bug4];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
var map = {32: false, 38: false, 40: false};
$(document).keydown(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = true;
        if (map[32] && map[38]) {
            // FIRE EVENT
            player.handleInput('jumpup');
        } else if(map[32] && map[40]) {
            player.handleInput('jumpdown');
        }
    }
}).keyup(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = false;
    }
});
document.addEventListener('keyup', function(e) {      
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down', 
    };
    player.handleInput(allowedKeys[e.keyCode]);
        
});

//disable scrolling via pressing arrow keys on keyboard
window.addEventListener("keydown", function(e) {
    // space, page up, page down and arrow keys:
    if([32, 33, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
    
});
$('#char-boy').click(function(){
    charPicker = 0;
    $('.charPicker').css('display', 'none');
    $('.row').css('display', 'block');
});
$('#char-cat-girl').click(function(){
    charPicker = 1;
    $('.charPicker').css('display', 'none');
    $('.row').css('display', 'block');
});
$('#char-horn-girl').click(function(){
    charPicker = 2;
    $('.charPicker').css('display', 'none');
    $('.row').css('display', 'block');
});
$('#char-pink-girl').click(function(){
    charPicker = 3;
    $('.charPicker').css('display', 'none');
    $('.row').css('display', 'block');
});
$('#char-princess-girl').click(function(){
    charPicker = 4;
    $('.charPicker').css('display', 'none');
    $('.row').css('display', 'block');
});












