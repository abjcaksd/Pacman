
var levelState = {
    
    buildMap: function() {
        map = this.game.add.tilemap('map1');
        map.addTilesetImage('pacman_tiles', 'pacmanTiles');
        map.addTilesetImage('pacman_tiles_2', 'pacmanTiles2');
        wallLayer = map.createLayer('WallLayer');
        dotsLayer = map.createLayer('DotsLayer');
        map.setCollisionBetween(1, 1000, true, 'WallLayer');
    },
    
    addPacMan: function() {
        pacman = this.game.add.sprite(gameStats.pacmanStartingX, gameStats.pacmanStartingY, 'pacman');
        pacman.anchor.setTo(0.5);
    },
    
    addGhosts: function() {
        ghosts = this.game.add.group();
        
        redGhost = ghosts.create(155, 255, 'redghost');
        orangeGhost = ghosts.create(180, 255, 'orangeghost');
        pinkGhost = ghosts.create(205, 255, 'pinkghost');
        turquoiseGhost = ghosts.create(230, 255, 'turquoiseghost');

        ghosts.setAll('anchor.x', 0.5);
        ghosts.setAll('anchor.y', 0.5);
        ghosts.setAll('frame', 0);
        
        ghosts.forEachExists(ghost => ghost.mobilized = false);

    },

    addAnimations: function() {
        pacman.animations.add('pacmanRight', [0,1], 3, true);
        pacman.animations.add('pacmanLeft', [4,5], 3, true);
        pacman.animations.add('pacmanUp', [6,7], 3, true);
        pacman.animations.add('pacmanDown', [2,3], 3, true);
        
        ghosts.forEach(function(ghost) {
            ghost.animations.add('move', [0,1,2,3,4,5,6,7], 2, true);
            ghost.animations.add('vulnerable', [8,9], 2, true);
            ghost.animations.add('warning', [10,11], 2, true);
            ghost.animations.add('retreat', [12,13], 2, true);
        });

    },
    
    animateGhosts: function() {
        ghosts.forEachExists(ghost => ghost.animations.play('move'));
    },
    
    initGraphics: function() {
        this.buildMap();
        this.addPacMan();
        this.addGhosts();
        this.addAnimations();
        this.animateGhosts();
    },
    
    getGhostVelocity: function(ghost) {
        return ghost == redGhost ? gameStats.redGhostVelocity : gameStats.ghostVelocity;
    },
    
    mobilizeGhosts: function(ghost) {

        if (ghost == redGhost) {
            this.game.time.events.add(gameStats.redGhostMoveDelay, function() {
                ghost.body.velocity.y = -gameStats.ghostVelocity;
            });
        }
        
        else if (ghost == orangeGhost) {
            this.game.time.events.add(gameStats.orangeGhostMoveDelay, function() {
                ghost.body.velocity.y = -gameStats.ghostVelocity;
            });
        }
        
        else if (ghost == pinkGhost) {
            this.game.time.events.add(gameStats.pinkGhostMoveDelay, function() {
                ghost.body.velocity.y = -gameStats.ghostVelocity;
            });
        }
        
        else {
            this.game.time.events.add(gameStats.turquoiseGhostMoveDelay, function() {
                ghost.body.velocity.y = -gameStats.ghostVelocity;
            });
            
        }
 
        ghost.direction = 'up';
        ghost.body.velocity.x = 0;

    },
    
    initPhysics: function() {
        //this.game.time.events.add(3000, function() {
            this.game.physics.arcade.enable(pacman);
            this.game.physics.arcade.enable(ghosts);
            pacman.body.velocity.x = gameStats.pacmanVelocity;
            pacman.body.immovable = true;
            
            ghosts.setAll('body.immovable', true);
            
            ghosts.forEachExists(ghost => levelState.mobilizeGhosts(ghost));
            gameStats.inPlay = true;
        //});
    },
    
    initKeyboard: function() {
        cursors = this.game.input.keyboard.createCursorKeys();
    },
    
    create: function() {
        this.initGraphics();
        this.initPhysics();
        this.initKeyboard();
        initScoreBoard();
    },
    
    updatePacmanPosition: function() {
        pacmanX = Math.round(pacman.x / map.tileWidth);
        pacmanY = Math.round(pacman.y / map.tileHeight);
    },
    
    pathRightAvailable: function() {
        var index1 = map.getTileRight(0, pacmanX, pacmanY).index;
        var index2 = map.getTileRight(0, pacmanX + 1, pacmanY).index;
        var index3 = map.getTileRight(0, pacmanX + 2, pacmanY).index;
        return [index1, index2, index3].every(index => index == -1);
    },
    
    pathLeftAvailable: function() {
        var index1 = map.getTileLeft(0, pacmanX, pacmanY).index;
        var index2 = map.getTileLeft(0, pacmanX - 1, pacmanY).index;
        var index3 = map.getTileLeft(0, pacmanX - 2, pacmanY).index;
        return [index1, index2, index3].every(index => index == -1);
    },
    
    pathUpAvailable: function() {
        var index1 = map.getTileAbove(0, pacmanX, pacmanY).index;
        var index2 = map.getTileAbove(0, pacmanX, pacmanY - 1).index;
        var index3 = map.getTileAbove(0, pacmanX, pacmanY - 2).index;
        return [index1, index2, index3].every(index => index == -1);
    },
    
    pathDownAvailable: function() {
        var index1 = map.getTileBelow(0, pacmanX, pacmanY).index
        var index2 = map.getTileBelow(0, pacmanX, pacmanY + 1).index;
        var index3 = map.getTileBelow(0, pacmanX, pacmanY + 2).index
        return [index1, index2, index3].every(index => index == -1);
    },
    
    moveLeft: function() {
        if (cursors.left.justPressed()) {
            pacman.direction = 'left';
            pacman.body.velocity.y = 0;
            pacman.body.velocity.x = -(gameStats.pacmanVelocity);
            pacman.frame = 4;
            pacman.animations.stop();
            pacman.animations.play('pacmanLeft');
        }
    },
    
    moveRight: function() {
        if (cursors.right.justPressed()) {
            pacman.direction = 'right';
            pacman.body.velocity.y = 0;
            pacman.body.velocity.x = gameStats.pacmanVelocity;
            pacman.frame = 0;
            pacman.animations.stop();
            pacman.animations.play('pacmanRight');
        }
    },

    moveUp: function() {
        if (cursors.up.justPressed() && this.pathUpAvailable()) {
            pacman.direction = 'up';
            pacman.body.velocity.x = 0;
            pacman.body.velocity.y = -gameStats.pacmanVelocity;
            pacman.frame = 6;
            pacman.animations.stop();
            pacman.animations.play('pacmanUp');
        }
    },
    
    moveDown: function() {
        if (cursors.down.justPressed() && this.pathDownAvailable()) {
            pacman.direction = 'down';
            pacman.body.velocity.x = 0;
            pacman.body.velocity.y = gameStats.pacmanVelocity;
            pacman.frame = 2;
            pacman.animations.stop();
            pacman.animations.play('pacmanDown');
        }
    },
    
    movePacMan: function() {
        this.moveLeft();
        this.moveRight();
        this.moveUp();
        this.moveDown();
        this.wrapAround();
        this.hitWall();
        this.chompDots();
    },
    
    moveGhosts: function() {
        ghosts.forEachExists(function(ghost) {
            
            if (ghost.y <= 210) {
                ghost.mobilized = true;
            }
            
            if (ghost.mobilized) {
                this.game.physics.arcade.collide(ghost, wallLayer, function() {
                    
                    if (ghost.direction == 'up' ) {
                        ghost.y++;
                        
                        var direction = Math.random() > 0.5 ? 'left' : 'right';
                        var ghostVelocity = levelState.getGhostVelocity();
                        ghost.body.velocity.y = 0;
                        ghost.body.velocity.x = direction == 'left' ? -ghostVelocity : ghostVelocity;
                        ghost.direction = direction;
                    }
                    
                    else if (ghost.direction == 'down') {
                        ghost.y--;
                        var direction = Math.random() > 0.5 ? 'left' : 'right';
                        var ghostVelocity = levelState.getGhostVelocity();
                        ghost.body.velocity.y = 0;
                        ghost.body.velocity.x = direction == 'left' ? -ghostVelocity : ghostVelocity;
                        ghost.direction = direction;
                    }
                    
                    else if (ghost.direction == 'left') {
                        ghost.x++;
                        var direction = Math.random() > 0.5 ? 'up': 'down';
                        var ghostVelocity = levelState.getGhostVelocity();
                        
                        ghost.body.velocity.x = 0;
                        ghost.body.velocity.y = direction == 'up' ? -ghostVelocity : ghostVelocity;
                        ghost.direction = direction;
                    }
                    
                    else {
                        ghost.x--;
                        var direction = Math.random() > 0.5 ? 'up' : 'down';
                        var ghostVelocity = levelState.getGhostVelocity();
                        
                        ghost.body.velocity.x = 0;
                        ghost.body.velocity.y = direction == 'up' ? -ghostVelocity : ghostVelocity;
                        ghost.direction = 'down';
                    }
                    
                    
                }, null, this);
            }
        });
    },
    
    levelUp: function() {
        gameStats.level++;
        gameStats.inPlay = false;
        gameStats.dotsLeft = 205;
        gameStats.fruitAdded = false;
        
        if (gameStats.invincibilityTime > 0) {
            gameStats.invincibilityTime -= 1000;
            gameStats.warningTime -= 300;
        }
        
        else {
            if (gameStats.warningTime > 0) {
                gameStats.warningTime -= 500;
            }
        }
        
        pacman.animations.stop();
        ghosts.forEachExists(ghost => ghost.animations.stop());
        this.game.state.start('levelup');
    },
    
    resetPacman: function() {
        pacman.body.velocity.x = gameStats.pacmanVelocity;
        pacman.body.velocity.y = 0;
        pacman.x = gameStats.pacmanStartingX;
        pacman.y = gameStats.pacmanStartingY;
        pacman.frame = 0;
    },
    
    resetGhost: function(ghost) {
        switch (ghost) {
            case redGhost: ghost.position.setTo(155,255); break;
            case orangeGhost: ghost.position.setTo(180, 255); break;
            case pinkGhost: ghost.position.setTo(205, 255); break;
            case turquoiseGhost: ghost.position.setTo(230, 255); break;
        }
        ghost.mobilized = false;
    },
    
    removeLifeIcons: function() {
        switch (gameStats.lives) {
            case 3: lifeIcon3.kill(); break;
            case 2: lifeIcon2.kill(); break;
            case 1: lifeIcon1.kill(); break;
        }
    },
    
    loseLife: function() {
        levelState.resetPacman();
        ghosts.forEachExists(ghost => levelState.resetGhost(ghost));
        levelState.removeLifeIcons();
        gameStats.lives--;
        gameStats.inPlay = false;
        ghosts.forEach(ghost => levelState.mobilizeGhosts(ghost));
        
        if (gameStats.lives == 0) {
            levelState.gameOver();
        }
        
        this.game.time.events.add(500, function() { gameStats.inPlay = true });
    },
    
    gameOver: function() {
        pacman.animations.stop();
        ghosts.forEachExists(ghost => ghost.animations.stop());
        game.state.start('gameover');
    },
    
    displayHitScore: function() {
        ghostScore = game.add.text(pacman.x - 50, pacman.y, gameStats.ghostPointValue, { 'fill': 'white' });
        ghostScore.anchor.setTo(0.5);
        ghostScore.lifespan = 500;
    },
    
    hitGhost: function() {
        this.game.physics.arcade.collide(pacman, ghosts, function(sprite, ghost) {
            if (gameStats.inPlay) {
                if (gameStats.invincible) {
                    ghost.animations.play('retreat');
                    levelState.resetGhost(ghost);
                    
                    game.time.events.add(3000, function() {
                        levelState.mobilizeGhosts(ghost);
                    });
                    
                    levelState.displayHitScore();
                    
                    gameStats.score += gameStats.ghostPointValue;
                    gameStats.ghostPointValue *= 2;

                }
                else {
                    levelState.loseLife();
                }
            }
        });
    },
    
    hitWall: function() {
        this.game.physics.arcade.collide(pacman, wallLayer, function(sprite, wall) {
            pacman.body.velocity.x = 0;
            pacman.animations.stop();
        }, null, this);
    },
    
    powerPillLocation: function(object) {
        return ((object.x == 2 && (object.y == 64 || object.y == 65 || object.y == 14 || object.y == 15)) || 
                (object.x == 60 && (object.y == 14 || object.y == 15)) ||
                (object.x == 61 && (object.y == 64 || object.y == 65)));
    },
    
    transitionAnimation: function(sprite, animation1, animation2) {
        sprite.animations.stop(animation1);
        sprite.animations.play(animation2);
    },
    
    turnGhostsBlue: function() {
        ghosts.forEachExists(ghost => levelState.transitionAnimation(ghost, 'move', 'vulnerable'));
        gameStats.invincible = true;
        
    },
    
    revertGhosts: function() {
        ghosts.forEachExists(ghost => levelState.transitionAnimation(ghost, 'vulnerable', 'warning'));
        
        game.time.events.add(gameStats.warningTime, function() {
            ghosts.forEachExists(ghost => levelState.transitionAnimation(ghost, 'warning', 'move'));
            gameStats.invincible = false;
            gameStats.ghostPointValue = 200;
        });
    },
    
    chompDots: function() {
        this.game.physics.arcade.overlap(pacman, dotsLayer, function(sprite, dot) {
            if (map.hasTile(dot.x, dot.y, dotsLayer)) {
                gameStats.dotsLeft--;
                map.removeTile(dot.x, dot.y, dotsLayer);
                gameStats.score += levelState.powerPillLocation(dot) ? 25 : 10;
                if (levelState.powerPillLocation(dot)) {
                    levelState.turnGhostsBlue();
                    ghostTimer = this.game.time.events.add(gameStats.invincibilityTime, levelState.revertGhosts);
                   
                }

            }
        }, null, this);
        
        if (gameStats.dotsLeft == 0) {
            levelState.levelUp();
        }
        
    },

    collectFruit: function() {
        if (fruit) {
            this.game.physics.arcade.overlap(pacman, fruit, function() {
                fruit.destroy();
                var currentFruit = gameStats.fruits.find(fruit => fruit.levels.includes(gameStats.level));
                gameStats.score += currentFruit.value;
                fruitScore = game.add.text(190, 305, currentFruit.value, { 'fill': 'white', 'fontSize': 25 });
                fruitScore.anchor.setTo(0.5);
                fruitScore.lifespan = 1000;
            });
        }
    },
    
    wrapAround: function() {
        if (pacman.right >= game.world.right && pacman.direction == 'right') {
            pacman.right = 0;
        }
        if (pacman.left <= 0 && pacman.direction == 'left') {
            pacman.left = game.world.right;
        }
    },
    
    updateScore: function() {
        scoreDisplay.setText('Score: ' + gameStats.score);
        highScoreDisplay.setText('High Score: ' + Math.max(gameStats.score, gameStats.highScore));
        if (gameStats.score >= 10000 && !gameStats.livesEarned) {
            extraLife();
        }
    },
    
    update: function() {
        
        if (gameStats.inPlay) {
            this.movePacMan();
            this.updatePacmanPosition();
            this.moveGhosts();
            this.updateScore();
        }
        
        addFruit();
        this.hitGhost();
        this.collectFruit();
    }
    
}
