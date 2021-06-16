import Phaser from 'phaser';

import Map from './Map';
import blockBg from '../assets/block-bg.png';
import block from '../assets/block.png';
import { blockSize, screenBlocks } from '../constants';
import { setupControl } from '../controls.js';

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
		this.map = new Map();
		this.pieceGroup = this.add.group();

		setupControl(this);

		for (let i = 0; i < screenBlocks.y; i++) {
			for (let j = 0; j < screenBlocks.x; j++) {
				this.add.image(blockSize / 2 + blockSize * j, blockSize / 2 + blockSize * i, 'blockBg');
			}
		}

		this.fallEvent = this.time.addEvent({ delay: 1000, callback: this.fallPiece, callbackScope: this, loop: true });
	}

	update() {
		this.pieceGroup.clear(true);
		this.map.startMap();
		this.plotPiece(this.map.piece);

		for (let x = 0; x < screenBlocks.x; x++) {
			for (let y = 0; y < screenBlocks.y; y++) {
				if (this.map.matrix[x][y]) {
					this.pieceGroup.add(this.add.image(blockSize / 2 + blockSize * x, blockSize / 2 + blockSize * y, 'block'));
				}
			}
		}
	}

	plotPiece(piece) {
		for (let x = 0; x < 4; x++) {
			for (let y = 0; y < 4; y++) {
				if (this.map.xPiecePosition + x >= 0) {
					this.map.matrix[this.map.xPiecePosition + x][this.map.yPiecePosition + y] = piece[y][x];
				}
			}
		}
	}

	fallPiece() {
		if (this.map.doesPieceFit(this.map.piece, this.map.xPiecePosition, this.map.yPiecePosition + 1)) {
			this.map.yPiecePosition += 1;
		}
	}
}
