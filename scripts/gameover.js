
var gameOverState = {

    preload: function() {
        this.game.load.image('gameover', 'gameover.png');
        this.game.load.image('mainmenu', 'mainmenu.png');
    },
    
    recordScore: function() {
        var scores = localStorage['pacmanScores'] ? JSON.parse(localStorage['pacmanScores']) : [];
        scores.push(gameStats.score);
        
        localStorage['pacmanScores'] = JSON.stringify(scores);
    },
    
    checkHighScore: function() {
        if (gameStats.score > gameStats.highScore) {
            localStorage['pacmanHighScore'] = gameStats.score;
        } 
    },
    
    create: function() {
        var gameOver = this.game.add.image(game.world.centerX, 50, 'gameover');
        
        var score = this.game.add.text(game.world.centerX, 200, 'Score: ' + gameStats.score, { 'fill': 'gold' });
        
        var mainMenu = this.game.add.button(game.world.centerX, 300, 'mainmenu', function() {
            this.game.state.start('menu');
        });
        
        [gameOver, mainMenu, score].forEach(s => s.anchor.setTo(0.5));
        
        this.recordScore();
        this.checkHighScore();
    }
    
}
