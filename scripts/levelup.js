
var levelUpState = {
    
    preload: function() {
        switch(gameStats.level) {
            case 2:
                this.game.load.image('strawberry', 'strawberry.png');
                break;
            case 3:
                this.game.load.image('orange', 'orange.png');
                break;
            case 5:
                this.game.load.image('apple', 'apple.png');
                break;
            case 7:
                this.game.load.image('pear', 'pear.png');
                break;
            case 9:
                this.game.load.image('pineapple', 'pineapple.png');
                break;
        }
    },
    
    addLevelMarkers: function() {
        var previousLevel = this.game.add.text(game.world.centerX - 75, 450, 'Level ' + (gameStats.level - 1), { 'fill': 'blue' });
        var nextLevel = this.game.add.text(game.world.centerX - 75, 150, 'Level ' + gameStats.level, { 'fill': 'blue' });
        [previousLevel, nextLevel].forEach(l => l.anchor.setTo(0.5));
    },
    
    addPacman: function() {
        pacman = this.game.add.sprite(game.world.centerX, 450, 'pacman');
        pacman.anchor.setTo(0.5);
        pacman.frame = 6;
        pacman.animations.add('moveup', [6,7], 3, true);
        pacman.animations.play('moveup');
        this.game.physics.arcade.enable(pacman);
        pacman.body.velocity.y = -75;
    },
    
    create: function() {
        var levelUp = this.game.add.text(game.world.centerX, 50, 'Level Up', { 'fill': 'gold', 'fontSize': 50 });
        levelUp.anchor.setTo(0.5);
        
        this.addLevelMarkers();
        this.addPacman();
        
    },
    
    update: function() {
        if (pacman.y <= 145) {
            pacman.body.velocity.y = 0;
            this.game.time.events.add(500, function() {
                this.game.state.start('level');
            });
        }
    }
    
}
