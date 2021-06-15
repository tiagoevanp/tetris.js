import Phaser from 'phaser';

import blockBg from '../assets/block-bg.png';
import block from '../assets/block.png';
import { blockSize, screenBlocks } from '../constants';

export default class extends Phaser.Scene {
	constructor(handleNextPiece) {
		super();
		this.nexPiece = handleNextPiece;
	}

	preload() {
		this.load.image('blockBg', blockBg);
		this.load.image('block', block);
	}

	create() {
		this.arrows = this.input.keyboard.createCursorKeys();

		for (let i = 0; i < screenBlocks.y; i++) {
			for (let j = 0; j < screenBlocks.x; j++) {
				this.add.image(blockSize / 2 + blockSize * j, blockSize / 2 + blockSize * i, 'blockBg');
				if (i === 17 || i === 18) {
					this.add.image(blockSize / 2 + blockSize * j, blockSize / 2 + blockSize * i, 'block');
				}
			}
		}
	}

	update() {
		if (this.arrows.up.isDown) {
			this.nexPiece('square');
		}
		if (this.arrows.down.isDown) {
			this.nexPiece('line');
		}
	}
}
