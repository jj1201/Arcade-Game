/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
     var doc = global.document,
         win = global.window,
    //     canvas = doc.createElement('canvas'),
    //     ctx = canvas.getContext('2d'),
         lastTime;

    // canvas.width = 505;
    // canvas.height = 606;
    // doc.body.appendChild(canvas);
    var canvas = doc.querySelector("#c");
    var ctx = c.getContext("2d");

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
     var temp = 0;
     $('#restart').click(function(){
        level = 0;
        buttonSound.play();
        reset(level);
        player.reset();
        console.log("restart level = 0");
        $('.row').css('display', 'none');
        $('.ending').css('display', 'none');
        $('.charPicker').css('display', 'block');
        

    });

    function init() {
        reset(level);
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
     function checkCollisions(){
        allEnemies.forEach(function(enemy) {
            if(level === 1 && player.onBridge) {
                return;
            }
            if(enemy.x + 50 >= player.x && enemy.x <= player.x + 50 && enemy.y == player.y) {
                //pause the bug if collisions happens
                //enemy.speedOpt = 0;
                console.log("enemy.x = " + enemy.x);
                console.log("enemy.y = " + enemy.y);
                //setTimeout(function() {player.reset()}, 50);
                collisionSound.play();
                player.reset();
                layers[level].life--;
                if(layers[level].life === 0) {
                    reset(level);
                    gameOverSound.play();
                }else {
                    collisionSound.play();
                }

            }
        });
     }
     function nextLevel() {
        if(player.x/101 === 6 && (player.y + 20)/83 === 0) {
            level++;
            if(level <=2) {
                if(level ===1 || level ===2){
                    console.log("level = " + level);
                    nextLevelSound.play();
                }
                player.reset();
                reset(level);
            } else {
                bgm.pause();
                congradsSound.play();
                $('.row').css('display', 'none');
                $('.ending').css('display', 'block');
                console.log("totalScore = " + totalScore);
                //player.reset();
                temp = totalScore;
                player.reset();
                level = 0;
            }
            
        }
       
     }
    function update(dt) {
        checkCollisions(); 
        //console.log("drawing gem... col = " + layers[level].gemLoc + " row = " + row);
        updateEntities(dt);
        updateData();
        nextLevel();
    }
    //update level, score, life
    function updateData() {
        $('.level').text("Level : " + (level + 1));
        $('.score').text(totalScore);
        $('.life').text(layers[level].life);
        $('.key').text(layers[level].keyGet);
        $('.totalScore').text(temp);

    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        

        if(level === 0) {
            renderL1();
        } else if(level === 1) {
            renderL2();
        } else if(level === 2) {
            renderL3();
        }
       
        renderEntities();
        
    }
    var treeImage = ['images/tree-short.png', 'images/tree-short.png', 'images/tree-short.png'];
    var gemImage = ['images/gem-orange.png', 'images/gem-blue.png','images/gem-green.png'];
    var rockTmage = 'images/rock.png';
    var chestImage = ['images/chest-closed.png','images/chest-open.png'];
    var keyImage =['images/key.png', 'images/key-gray.png'];
    var grassImage = 'images/grass-block.png';
    var doorOpenImage = 'images/door-tall-open.png';
    var bridgeImage = ['images/ramp-north.png', 'images/stone-block.png', 'images/ramp-south.png'];
    function renderL1() {
        var rowImages = [
                'images/door-tall-closed.png',   // Top row is water
                'images/grass-block.png',   // Row 1 of 3 of stone
                'images/grass-block.png',   // Row 2 of 3 of stone
                'images/grass-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/dirt-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 7,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                 
                    
                if(layers[level].hiddenKeyGet === 1 && col === layers[level].hiddenDoorIdx && row === 0) {
                    ctx.clearRect(col * 101, row * 83, 101, 171);
                    ctx.drawImage(Resources.get(doorOpenImage), col * 101, row * 83);
                } else {
                    ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
                }
            }
        }
        //console.log("i am in level 1");
         //location format: {colNum, rowNum}
      
       
        
    }

    function renderL2() {
         var rowImages = [
                'images/door-tall-closed.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/water-block.png',   // Row 3 of 3 of stone
                'images/water-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 7,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                 
                    
                if(layers[level].hiddenKeyGet === 1 && col === layers[level].hiddenDoorIdx && row === 0) {
                    ctx.clearRect(col * 101, row * 83, 101, 171);
                    ctx.drawImage(Resources.get(doorOpenImage), col * 101, row * 83);
                } else {
                    ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
                }
            }
        }
    }

    function renderL3() {
         var rowImages = [
                'images/door-tall-closed.png',   // Top row is water
                'images/water-block.png',   // Row 1 of 3 of stone
                'images/wall-block.png',   // Row 2 of 3 of stone
                'images/water-block.png',   // Row 3 of 3 of stone
                'images/wall-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 7,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                 
                    
                if(layers[level].hiddenKeyGet === 1 && col === layers[level].hiddenDoorIdx && row === 0) {
                    ctx.clearRect(col * 101, row * 83, 101, 171);
                    ctx.drawImage(Resources.get(doorOpenImage), col * 101, row * 83);
                } else {
                    ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
                }
            }
        }
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
         //draw chests
         for(var i = 0; i < chestLoc.length; i++) {
            var col = chestLoc[i][0];
            var row = chestLoc[i][1];
            if(!layers[level].chestOpen[i]) {
                ctx.drawImage(Resources.get(chestImage[0]), col * 101, row * 83 - 35);
            }
            else{
                // console.log("i = "+ i);
                // console.log("hiddenKeyIdx: "+layers[level].hiddenKeyIdx);
                // console.log("hiddenKeyIdx: "+layers[level].hiddenKeyIdx);
                ctx.drawImage(Resources.get(chestImage[1]), col * 101, row * 83 - 35);
                //open gem chest, didn't get gem yet
                if(i === layers[level].hiddenGemIdx && layers[level].hiddenGemGet === 0) {
                    ctx.drawImage(Resources.get(gemImage[2]), col * 101 + 10, row * 83 - 30, 101 * 0.75, 171*0.75);
                //get the gem from gem chest
                }else if(i === layers[level].hiddenGemIdx && layers[level].hiddenGemGet === 1) {
                    ctx.clearRect(col * 101 + 10, row * 83 - 30, 101 * 0.75, 171*0.75);
                    ctx.drawImage(Resources.get(chestImage[1]), col * 101, row * 83 - 35);
                }
                //open key chest, didn't get the key yet
                else if(i === layers[level].hiddenKeyIdx && layers[level].hiddenKeyGet === 0) {
                    //console.log("open key chest");
                    ctx.drawImage(Resources.get(keyImage[0]), col * 101 + 10, row * 83 - 30, 101 * 0.75, 171*0.75);
                //get the hidden key, the hidden door is opened!
                } else if(i === layers[level].hiddenKeyIdx && layers[level].hiddenKeyGet === 1) {
                    //console.log("hidden door is opened!");
                    ctx.clearRect(col * 101 + 10, row * 83 - 30, 101 * 0.75, 171*0.75);
                    ctx.drawImage(Resources.get(chestImage[1]), col * 101, row * 83 - 35);
                    //ctx.drawImage(Resources.get(doorOpenImage), layers[level].hiddenDoorIdx* 101, 0);
                }
            }
        };
        //draw gems
        //layers[0].gemLoc =[[2, 2],[5, 1]];
        for(var i = 0; i < gemLoc.length; i++) {
            var col = gemLoc[i][0];
            var row = gemLoc[i][1];
            //console.log("drawing gem... col = " + col + " row = " + row);
            if(col != -1 && row != -1) {
                ctx.drawImage(Resources.get(gemImage[i % gemImage.length]), col * 101 + 10, row * 83 + 10, 101 * 0.75, 171*0.75);
            }
            
        };
        //draw keys
        for(var i = 0; i < keyLoc.length; i++) {
            var col = keyLoc[i][0];
            var row = keyLoc[i][1];
            if(col != -1 && row != -1 && layers[level].gemGet < layers[level].gemNum) {
                ctx.drawImage(Resources.get(keyImage[1]), col * 101 + 10, row * 83 + 10, 101 * 0.75, 171*0.75);
            } else if(col != -1 && row != -1 && layers[level].gemGet === layers[level].gemNum) {
                ctx.drawImage(Resources.get(keyImage[0]), col * 101 + 10, row * 83 + 10, 101 * 0.75, 171*0.75);
            }
        };
         //draw trees
        //console.log(treeLoc.length);
        for(var i = 0; i < treeLoc.length; i++) {
            //console.log("drawing tree");
            var col = treeLoc[i][0];
            var row = treeLoc[i][1];
            ctx.drawImage(Resources.get(treeImage[0]), col * 101, row * 83 - 20);
        };
        //draw rocks
        //console.log(rockLoc.length);
        for(var i = 0; i < rockLoc.length; i++) {
            var col = rockLoc[i][0];
            var row = rockLoc[i][1];
            ctx.drawImage(Resources.get(rockTmage), col * 101, row * 83 - 20);
        };
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        //draw bridge for level 2
        if(level === 1) {
            for(var i = 0; i < layers[level].bridge.length; i++) {
                for(var j = 0; j < layers[level].bridge[i].length; j++) {
                    var col = layers[level].bridge[i][j][0];
                    var row = layers[level].bridge[i][j][1];
                    ctx.drawImage(Resources.get(bridgeImage[j %3]), col* 101, row * 83 - 40);
                }
            }
            
        }
        if(level === 1 && player.underBridge) {
            //console.log("underbridge : " + player.isUnderBridge());
        }else {
            player.render();
        }

    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset(level) {
        switch (level) {
            case 0:
                layers[0].score = 0;
                layers[0].life = 2;
                layers[0].treeLoc = [[2, 1], [2, 2], [2, 3], [4, 2], [4, 3], [4, 4], [5, 4], [6, 4]];
                layers[0].rockLoc = [[6, 2]];
                layers[0].chestLoc = [[1, 0],[4, 0]];
                layers[0].hiddenGemGet = 0;
                layers[0].hiddenKeyGet = 0;
                layers[0].hiddenGemIdx = 1;
                layers[0].hiddenKeyIdx = 0;
                layers[0].chestOpen = [false, false];
                layers[0].gemLoc =[[1, 2],[5, 1]];
                layers[0].keyLoc = [[0, 3],[5, 3]];
                layers[0].keyNum = 2;
                layers[0].gemNum = 2;
                layers[0].keyGet = 0;
                layers[0].gemGet = 0;
                layers[0].hiddenDoorIdx = 6;
                treeLoc = layers[level].treeLoc;
                rockLoc = layers[level].rockLoc;
                chestLoc = layers[level].chestLoc;
                gemLoc = layers[level].gemLoc;
                keyLoc = layers[level].keyLoc;
                totalScore = 0;
            case 1:
                layers[1].score = 0;
                layers[1].life = 2;
                layers[1].treeLoc = [[4, 5], [0, 5], [6, 5], [2, 5]];
                layers[1].rockLoc = [[2, 3], [6, 2], [3, 1]];
                layers[1].chestLoc = [[2, 0],[4, 0]];
                layers[1].hiddenGemGet = 0;
                layers[1].hiddenKeyGet = 0;
                layers[1].hiddenGemIdx = 1;
                layers[1].hiddenKeyIdx = 0;
                layers[1].chestOpen = [false, false];
                layers[1].gemLoc =[[6, 4],[3,5], [3, 2]];
                layers[1].keyLoc = [[4, 4],[2,2]];
                layers[1].keyNum = 2;
                layers[1].gemNum = 3;
                layers[1].keyGet = 0;
                layers[1].gemGet = 0;
                layers[1].hiddenDoorIdx = 6;
                treeLoc = layers[level].treeLoc;
                rockLoc = layers[level].rockLoc;
                chestLoc = layers[level].chestLoc;
                gemLoc = layers[level].gemLoc;
                keyLoc = layers[level].keyLoc;
                totalScore = layers[0].score;
            case 2:
                ctx.clearRect(0, 0, 101 *7, 171);
                layers[2].score = 0;
                layers[2].life = 2;
                layers[2].treeLoc = [[1, 5], [5, 5]];
                layers[2].rockLoc = [];
                layers[2].chestLoc = [[1, 0], [5, 0]];
                layers[2].hiddenGemGet = 0;
                layers[2].hiddenKeyGet = 0;
                layers[2].hiddenGemIdx = 1;
                layers[2].hiddenKeyIdx = 0;
                layers[2].chestOpen = [false, false];
                layers[2].gemLoc =[[6, 5],[0,5], [5, 3]];
                layers[2].keyLoc = [[1, 3],[4, 1]];
                layers[2].keyNum = 2;
                layers[2].gemNum = 3;
                layers[2].keyGet = 0;
                layers[2].gemGet = 0;
                layers[2].hiddenDoorIdx = 6;
                treeLoc = layers[level].treeLoc;
                rockLoc = layers[level].rockLoc;
                chestLoc = layers[level].chestLoc;
                gemLoc = layers[level].gemLoc;
                keyLoc = layers[level].keyLoc;
                totalScore = layers[0].score + layers[1].score;
        }      
                //$('.level').css('color', 'red');
        
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/stone-block-tall.png',
        'images/water-block.png',
        'images/grass-block.png', 
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/dirt-block.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/chest-closed.png',
        'images/chest-open.png',
        'images/door-tall-closed.png',
        'images/door-tall-open.png',
        'images/wall-block.png',
        'images/wall-block-tall.png',
        'images/tree-ugly.png',
        'images/rock.png',
        'images/tree-tall.png',
        'images/tree-short.png',
        'images/gem-orange.png',
        'images/gem-green.png',
        'images/gem-blue.png',
        'images/key.png',
        'images/key-gray.png',
        'images/brown-block.png',
        'images/ramp-north.png',
        'images/ramp-south.png',
        'images/background.jpg',

    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
