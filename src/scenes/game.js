import Phaser from 'phaser';

import Map from './Map';
import blockBg from '../assets/block-bg.png';
import block from '../assets/block.png';
import { blockSize, screenBlocks, points } from '../constants';
import { setupControl } from '../controls.js';

export default class extends Phaser.Scene {
	constructor(handleNextPiece) {
		super();
		this.nextPiece = handleNextPiece;
		this.fallTime = 1000;
		this.score = 16000;
		this.level = 0;
		this.speed = 0;
	}

	preload() {
		this.load.image('blockBg', blockBg);
		this.load.image('block', block);
	}

	create() {
		this.map = new Map();
		this.pieceGroup = this.add.group();

		setupControl(this);

		for (let y = 0; y < screenBlocks.y; y++) {
			for (let x = 0; x < screenBlocks.x; x++) {
				this.add.image(blockSize / 2 + blockSize * x, blockSize / 2 + blockSize * y, 'blockBg');
			}
		}
		this.nextPiece(this.map.nextPieceName);

		this.fallEvent = this.time.addEvent({ delay: this.fallTime - (this.speed + 1) * 100, callback: this.fallPiece, callbackScope: this, loop: true });
	}

	update() {
		this.pieceGroup.clear(true);
		this.map.cleanPieceMatrix();
		this.plotPiece(this.map.piece);

		for (let x = 0; x < screenBlocks.x; x++) {
			for (let y = 0; y < screenBlocks.y; y++) {
				if (this.map.pieceMatrix[y][x]) {
					this.pieceGroup.add(this.add.image(blockSize / 2 + blockSize * x, blockSize / 2 + blockSize * y, 'block'));
				}
			}
		}
	}

	plotPiece(piece) {
		for (let y = 0; y < 4; y++) {
			for (let x = 0; x < 4; x++) {
				if (piece[y][x]) {
					this.map.pieceMatrix[this.map.yPiecePosition + y][this.map.xPiecePosition + x] = piece[y][x];
				}
			}
		}
	}

	fillMatrix(piece) {
		for (let y = 0; y < 4; y++) {
			for (let x = 0; x < 4; x++) {
				if (piece[y][x]) {
					this.map.fillMatrix[this.map.yPiecePosition + y][this.map.xPiecePosition + x] = piece[y][x];
				}
			}
		}
	}

	setScore(lines) {
		this.score += points[lines];
		document.getElementById('score').innerHTML = String(this.score).padStart(6, '0');

		this.setLevel(this.score);
	}

	setLevel(score) {
		this.level = parseInt(score / 1000);
		document.getElementById('level').innerHTML = this.level;

		this.setSpeed(this.level);
	}

	setSpeed(level) {
		this.speed = parseInt(level / 2);
		document.getElementById('speed').innerHTML = this.speed;

		this.fallEvent.reset({ delay: this.fallTime - (this.speed + 1) * 100, callback: this.fallPiece, callbackScope: this, loop: true });
	}

	fallPiece() {
		if (this.map.doesPieceFit(this.map.piece, this.map.xPiecePosition, this.map.yPiecePosition + 1)) {
			this.map.yPiecePosition += 1;
		} else {
			this.fillMatrix(this.map.piece);
			this.map.detectFullLines();

			if (this.map.destroy.length) {
				this.setScore(this.map.destroy.length);
				this.map.destroy.forEach((lineIdx) => {
					this.map.fillMatrix.splice(lineIdx, 1);
					this.map.fillMatrix.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0]);
				});

				this.map.destroy = [];
			}

			this.nextPiece(this.map.resetPiece());
		}
	}
}
