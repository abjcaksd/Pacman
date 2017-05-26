
// map

var map;
var wallLayer;
var dotsLayer;

// Sprites

var pacman;
var redGhost;
var orangeGhost;
var pinkGhost;
var turquoiseGhost;
var fruit;

// Scoreboard

var scoreDisplay;
var highScoreDisplay;
var lifeIcon1;
var lifeIcon2;
var lifeIcon3;
var lifeIcon4;

var cherryIcon;
var strawberryIcon;
var orangeIcon;
var appleIcon;
var pearIcon;
var pineappleIcon;
var fruitScore;
var ghostScore;

var ghosts;

var pacmanX;
var pacmanY;

var cursors;

var ghostTimer;

var gameStats = {
    score: 0,
    highScore: localStorage['pacmanHighScore'] || 0,
    level: 1,
    lives: 3,
    livesEarned: 0,
    inPlay: false,
    invincible: false,
    fruitAdded: false,
    fruits: [
                {'levels': [1], 'name': 'cherry', 'value': 100},
                {'levels': [2], 'name': 'strawberry', 'value': 300},
                {'levels': [3,4], 'name': 'orange', 'value': 500},
                {'levels': [5,6], 'name': 'apple', 'value': 700},
                {'levels': [7,8], 'name': 'pear', 'value': 1000},
                {'levels': [9,10,11,12], 'name': 'pineapple', 'value': 2000}
            ],
    
    pacmanVelocity: 130,
    pacmanStartingX: 200,
    pacmanStartingY: 390,
    ghostPointValue: 200,
    ghostVelocity: 80,
    redGhostVelocity: 80,
    
    redGhostMoveDelay: 1000,
    pinkGhostMoveDelay: 2000,
    orangeGhostMoveDelay: 5000,
    turquoiseGhostMoveDelay: 6000,

    invincibilityTime: 5000,
    warningTime: 3000,
    dotsLeft: 205
};

function addFruit() {
    if (gameStats.dotsLeft <= 135 && !gameStats.fruitAdded) {
        gameStats.fruitAdded = true;
        var currentFruit = gameStats.fruits.find(fruit => fruit.levels.includes(gameStats.level));
        fruit = this.game.add.sprite(190, 305, currentFruit.name);
        fruit.anchor.setTo(0.5);
        this.game.physics.arcade.enable(fruit);
    }
}

function initScoreBoard() {
    scoreDisplay = this.game.add.text(50, 25, 'Score: ' + gameStats.score, { 'fill': 'white', 'fontSize': 16 });
    highScoreDisplay = this.game.add.text(200, 25, 'High Score: ' + gameStats.score, { 'fill': 'white', 'fontSize': 16 });
    lifeIcon1 = this.game.add.sprite(25, 520, 'life-icon');
    lifeIcon2 = this.game.add.sprite(45, 520, 'life-icon');
    lifeIcon3 = this.game.add.sprite(65, 520, 'life-icon');
    cherryIcon = this.game.add.sprite(350, 520, 'cherry');
    
    if (gameStats.level >= 2) {
        strawberryIcon = this.game.add.sprite(325, 520, 'strawberry');
        strawberryIcon.anchor.setTo(0.5);
    }
    
    if (gameStats.level >= 3) {
        orangeIcon = this.game.add.sprite(300, 520, 'orange');
        orangeIcon.anchor.setTo(0.5);
    }
    
    if (gameStats.level >= 5) {
        appleIcon = this.game.add.sprite(275, 520, 'apple');
        appleIcon.anchor.setTo(0.5);
    }
    
    if (gameStats.level >= 7) {
        pearIcon = this.game.add.sprite(240, 520, 'pear');
        pearIcon.anchor.setTo(0.5);
    }
    
    if (gameStats.level >= 9) {
        pineappleIcon = this.game.add.sprite(190, 520, 'pineapple');
        pineappleIcon.anchor.setTo(0.5);
    }
    
    [scoreDisplay, highScoreDisplay, lifeIcon1, lifeIcon2, lifeIcon3, cherryIcon].forEach(s => s.anchor.setTo(0.5));
}

function addLifeIcons() {
    switch (gameStats.lives) {
        case 1:
            lifeIcon2 = this.game.add.sprite(45, 520, 'life-icon');
            lifeIcon2.anchor.setTo(0.5);
            break;
        case 2:
            lifeIcon3 = this.game.add.sprite(65, 520, 'lifeicon');
            lifeIcon3.anchor.setTo(0.5);
            break;
        case 3:
            lifeIcon4 = this.game.add.sprite(85, 520, 'life-icon');
            lifeIcon4.anchor.setTo(0.5);
            break;
    }
}

function extraLife() {
	addLifeIcons();
	gameStats.lives++;
	gameStats.livesEarned++;
}
