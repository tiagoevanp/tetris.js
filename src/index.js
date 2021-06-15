import './assets/digital-display-tfb-font/DigitalDisplayTfb-y6oZ.ttf';

import Phaser from 'phaser';

import { screenBlocks, blockSize } from './constants';
import empty from './assets/empty.png';
import line from './assets/line.png';
import square from './assets/square.png';
import t from './assets/t.png';
import l from './assets/l.png';
import reverseL from './assets/reverseL.png';
import skew from './assets/skew.png';
import reverseSkew from './assets/reverseSkew.png';
import Game from './scenes/game';

const imgPiece = document.getElementById('img-piece');
const imgEl = document.createElement('img');
imgEl.src = empty;
imgPiece.appendChild(imgEl);

const handleNextPiece = (piece) => {
	switch (piece) {
		case 'empty':
			imgEl.src = empty;
			break;
		case 'line':
			imgEl.src = line;
			break;
		case 'square':
			imgEl.src = square;
			break;
		case 't':
			imgEl.src = t;
			break;
		case 'l':
			imgEl.src = l;
			break;
		case 'reverse-l':
			imgEl.src = reverseL;
			break;
		case 'skew':
			imgEl.src = skew;
			break;
		case 'reverse-skew':
			imgEl.src = reverseSkew;
			break;
	}
};

const config = {
	type: Phaser.AUTO,
	width: screenBlocks.x * blockSize,
	height: screenBlocks.y * blockSize,
	parent: 'phaser-game',
	backgroundColor: '#89a25a',
	physics: {
		default: 'arcade',
	},
	render: {
		pixelArt: true,
	},
	scene: new Game(handleNextPiece),
};

new Phaser.Game(config);
