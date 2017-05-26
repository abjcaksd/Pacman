
var menuState = {

    preload: function() {
        this.game.load.image('title', 'title.png');
        this.game.load.image('newgame', 'newgame.png');
        this.game.load.image('highscores', 'highscores.png');
    },
    
	addBackground: function() {
		this.game.add.image(0, 0, 'menubackground');
	},
	
    create: function() {
		this.addBackground();
		
        var title = this.game.add.image(game.world.centerX, 50, 'title');
        
		var newGame = this.game.add.button(game.world.centerX, 200, 'newgame', function() {
			this.game.state.start('level');
		});
        
		var highScores = this.game.add.button(game.world.centerX, 300, 'highscores', function() {
			this.game.state.start('highscores');
		});
        
        [title, newGame, highScores].forEach(o => o.anchor.setTo(0.5));
    }
    
}
