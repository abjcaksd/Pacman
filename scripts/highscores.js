
var highScoresState = {

	preload: function() {
		this.game.load.image('mainmenu', 'mainmenu.png');
	},
	
	create: function() {
		var highScores = this.game.add.text(game.world.centerX, 50, 'High Scores', { 'fill': 'gold', 'fontSize': 50 });
		
		highScores.anchor.setTo(0.5);
	}
	
}
