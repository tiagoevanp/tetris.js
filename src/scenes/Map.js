import { screenBlocks, pieces, gameOver } from '../constants';

export default class {
	constructor() {
		this.pieceMatrix = [];
		this.fillMatrix = [];
		this.destroy = [];
		this.falltime = 1000;
		this.gameOver = false;

		this.pieces = ['line', 'square', 't', 'l', 'reverseL', 'skew', 'reverseSkew'];
		this.nextPieceName = '';
		this.piece = this.getRandomPiece();
		this.nextPiece = this.getRandomPiece();
		this.xPiecePosition = 3;
		this.yPiecePosition = 0;

		this.startMatrix();
	}

	startMatrix() {
		for (let y = 0; y < screenBlocks.y; y++) {
			this.pieceMatrix[y] = [];
			this.fillMatrix[y] = [];

			for (let x = 0; x < screenBlocks.x; x++) {
				this.pieceMatrix[y][x] = 0;
				this.fillMatrix[y][x] = 0;
			}
		}
	}

	cleanPieceMatrix() {
		for (let y = 0; y < screenBlocks.y; y++) {
			for (let x = 0; x < screenBlocks.x; x++) {
				if (this.fillMatrix[y][x]) {
					this.pieceMatrix[y][x] = this.fillMatrix[y][x];
				} else {
					this.pieceMatrix[y][x] = 0;
				}
			}
		}
	}

	setGameOver() {
		this.gameOver = true;
		this.fillMatrix = gameOver;
	}

	resetPiece() {
		if (!this.doesPieceFit(this.nextPiece, 3, 0)) {
			this.setGameOver();
		}

		this.xPiecePosition = 3;
		this.yPiecePosition = 0;
		this.piece = this.nextPiece;
		this.nextPiece = this.getRandomPiece();

		return this.nextPieceName;
	}

	getRandomPiece() {
		const min = Math.ceil(0);
		const max = Math.floor(this.pieces.length);

		this.nextPieceName = this.pieces[Math.floor(Math.random() * (max - min) + min)];

		return pieces[this.nextPieceName];
	}

	rotatePiece() {
		const rotatedPiece = [[], [], [], []];

		for (let x = 0; x < 4; x++) {
			for (let y = 0; y < 4; y++) {
				rotatedPiece[y][x] = this.piece[4 - x - 1][y];
			}
		}

		if (this.doesPieceFit(rotatedPiece, this.xPiecePosition, this.yPiecePosition)) {
			this.piece = rotatedPiece;
		}
	}

	doesPieceFit(piece, posX, posY) {
		for (let y = 0; y < 4; y++) {
			for (let x = 0; x < 4; x++) {
				const pieceBlockValue = piece[y][x];
				const fillBlockValue = this.fillMatrix[y + posY] && this.fillMatrix[y + posY][x + posX];

				if (pieceBlockValue && fillBlockValue && pieceBlockValue === fillBlockValue) {
					return false;
				}

				if (posX + x < 0 || posX + x >= screenBlocks.x) {
					if (pieceBlockValue) {
						return false;
					}
				}
				if (posY + y < 0 || posY + y >= screenBlocks.y) {
					if (pieceBlockValue) {
						return false;
					}
				}
			}
		}
		return true;
	}

	detectFullLines() {
		for (let y = 0; y < screenBlocks.y; y++) {
			let aux = 0;
			const line = this.fillMatrix[y];
			const lineIdx = y;

			for (let x = 0; x < line.length; x++) {
				if (line[x] === 0) {
					break;
				}

				aux++;
			}

			if (aux === line.length) {
				this.destroy.push(lineIdx);
			}
		}
	}
}
