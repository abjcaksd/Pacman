
var game = new Phaser.Game(385, 550, Phaser.AUTO, '');

this.game.state.add('boot', bootState);
this.game.state.add('load', loadState);
this.game.state.add('levelup', levelUpState);
this.game.state.add('level', levelState);
this.game.state.add('menu', menuState);
this.game.state.add('gameover', gameOverState);
this.game.state.add('highscores', highScoresState);

this.game.state.start('boot');
