import Phaser from 'phaser';

import Game from './scenes/game';

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	parent: 'phaser-game',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: Game,
};

new Phaser.Game(config);
