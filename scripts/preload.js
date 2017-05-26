
var loadState = {
    
    preload: function() {
        this.game.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
        
        this.game.load.path = 'assets/images/';
		this.game.load.image('menubackground', 'menubackground.png');
        this.game.load.image('pacmanTiles', 'pacman_tiles.png');
        this.game.load.image('pacmanTiles2', 'pacman_tiles_2.png');
        this.game.load.image('life-icon', 'life-icon.png');
        this.game.load.spritesheet('pacman', 'pacmanspritesheet.png', 17, 15);
        this.game.load.spritesheet('redghost', 'redghostspritesheet.png', 20, 18);
        this.game.load.spritesheet('orangeghost', 'orangeghostspritesheet.png', 20, 18);
        this.game.load.spritesheet('pinkghost', 'pinkghostspritesheet.png', 20, 18);
        this.game.load.spritesheet('turquoiseghost', 'turquoiseghostspritesheet.png', 20, 18);
		
		this.game.load.image('cherry', 'cherry.png');

    },
    
    create: function() {
        this.game.state.start('menu');
    }
    
}
