import Phaser from 'phaser';

import Map from './Map';
import mainMusic from '../assets/tetris-gameboy.mp3';
import breakBlocks from '../assets/break.mp3';
import beep from '../assets/beep.mp3';
import hook from '../assets/hook.mp3';
import blockBg from '../assets/block-bg.png';
import block from '../assets/block.png';
import { blockSize, screenBlocks, points, gameOver } from '../constants';
import { setupControl } from '../controls.js';

export default class extends Phaser.Scene {
	constructor(handleNextPiece) {
		super();
		this.nextPiece = handleNextPiece;
		this.gameOver = false;
		this.keyDown = false;
		this.fallTime = 1000;
		this.score = 0;
		this.level = 0;
		this.speed = 0;
	}

	onClickMute(sound) {
		const { visibility } = document.getElementById('sound-image').style;
		document.getElementById('sound-image').style.visibility = visibility === 'hidden' ? 'visible' : 'hidden';

		sound.mute = document.getElementById('sound-image').style.visibility === 'hidden';
	}

	onClickReset(scene) {
		scene.restart();
	}

	onClickAbout() {
		window.open('https://github.com/tiagoevanp/tetris.js', '_blank');
	}

	preload() {
		this.load.audio('main-music', mainMusic);
		this.load.audio('beep', beep);
		this.load.audio('hook', hook);
		this.load.audio('break', breakBlocks);

		this.load.image('blockBg', blockBg);
		this.load.image('block', block);
	}

	create() {
		document.getElementById('mute').onclick = () => this.onClickMute(this.sound);
		document.getElementById('reset').onclick = () => this.onClickReset(this.scene);
		document.getElementById('about').onclick = this.onClickAbout;

		this.resetGame();

		this.map = new Map();
		this.pieceGroup = this.add.group();

		this.setHiScore();

		setupControl(this);

		for (let y = 0; y < screenBlocks.y; y++) {
			for (let x = 0; x < screenBlocks.x; x++) {
				this.add.image(blockSize / 2 + blockSize * x, blockSize / 2 + blockSize * y, 'blockBg');
			}
		}
		this.nextPiece(this.map.nextPieceName);

		this.fallEvent = this.time.addEvent({ delay: this.fallTime - (this.speed + 1) * 100, callback: this.fallPiece, callbackScope: this, loop: true });

		this.hookSound = this.sound.add('hook');
		this.breakSound = this.sound.add('break');
		this.beepSound = this.sound.add('beep');
		this.mainMusicSound = this.sound.add('main-music', { loop: true });

		this.mainMusicSound.play();
	}

	update() {
		this.pieceGroup.clear(true);
		this.map.cleanPieceMatrix();

		if (!this.gameOver) {
			this.plotPiece(this.map.piece);
		}

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

	resetGame() {
		this.gameOver = false;
		this.keyDown = false;
		this.fallTime = 1000;
		this.level = 0;
		this.speed = 0;
		this.score = 0;

		this.sound.stopAll();
		document.getElementById('score').innerHTML = String(this.score).padStart(6, '0');
	}

	setScore(lines) {
		this.score += points[lines];
		document.getElementById('score').innerHTML = String(this.score).padStart(6, '0');

		const newLevel = parseInt(this.score / 1000);

		this.setLevel(newLevel);
	}

	setHiScore() {
		document.getElementById('hi-score').innerHTML = String(window.localStorage.getItem('hi-score')).padStart(6, '0');
	}

	setLevel(level) {
		this.level = level;
		document.getElementById('level').innerHTML = this.level;

		this.setSpeed(parseInt(this.level / 2));
	}

	setSpeed(speed) {
		this.speed = speed;
		document.getElementById('speed').innerHTML = this.speed;
	}

	setNormalSpeed() {
		this.fallEvent.reset({ delay: this.fallTime - (this.speed + 1) * 100, callback: this.fallPiece, callbackScope: this, loop: true });
	}

	setFixedSpeed(speed) {
		this.fallEvent.reset({ delay: speed, callback: this.fallPiece, callbackScope: this, loop: true });
	}

	fallPiece() {
		if (this.map.doesPieceFit(this.map.piece, this.map.xPiecePosition, this.map.yPiecePosition + 1)) {
			this.map.yPiecePosition += 1;
		} else {
			this.fillMatrix(this.map.piece);
			this.map.detectFullLines();

			if (this.map.destroy.length) {
				this.breakSound.play();
				this.setScore(this.map.destroy.length);
				this.map.destroy.forEach((lineIdx) => {
					this.map.fillMatrix.splice(lineIdx, 1);
					this.map.fillMatrix.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0]);
				});

				this.map.destroy = [];
			}

			if (!this.map.doesPieceFit(this.map.nextPiece, 3, 0)) {
				this.setGameOver();
			}

			if (!this.gameOver) {
				this.hookSound.play();
				this.nextPiece(this.map.resetPiece());
			}
		}
	}

	setGameOver() {
		this.gameOver = true;
		this.mainMusicSound.stop();
		this.fallEvent.remove();
		this.nextPiece('empty');
		this.map.fillMatrix = gameOver;

		this.score > window.localStorage.getItem('hi-score') && window.localStorage.setItem('hi-score', this.score);
		this.setHiScore();
	}
}
