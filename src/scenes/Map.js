import { screenBlocks, pieces } from '../constants';

export default class {
	constructor() {
		this.matrix = [];

		this.pieces = ['line', 'square', 't', 'l', 'reverseL', 'skew', 'reverseSkew'];
		this.piece = this.getRandomPiece();
		this.xPiecePosition = 3;
		this.yPiecePosition = 0;

		this.startMap();
	}

	startMap() {
		for (let x = 0; x < screenBlocks.y; x++) {
			this.matrix[x] = [];

			for (let y = 0; y < screenBlocks.x; y++) {
				this.matrix[x][y] = 0;
			}
		}
	}

	getRandomPiece() {
		const min = Math.ceil(0);
		const max = Math.floor(this.pieces.length);

		return pieces[this.pieces[Math.floor(Math.random() * (max - min) + min)]];
	}

	rotatePiece() {
		const rotatedPiece = [[], [], [], []];

		for (let x = 0; x < 4; x++) {
			for (let y = 0; y < 4; y++) {
				rotatedPiece[y][x] = this.piece[4 - x - 1][y];
			}
		}

		this.piece = rotatedPiece;
	}

	doesPieceFit(piece, posX, posY) {
		for (let x = 0; x < 4; x++) {
			for (let y = 0; y < 4; y++) {
				const blockValue = piece[y][x];

				if (posX + x < 0 || posX + x >= screenBlocks.x) {
					if (blockValue) {
						return false;
					}
				}
				if (posY + y < 0 || posY + y >= screenBlocks.y) {
					if (blockValue) {
						return false;
					}
				}
			}
		}
		return true;
	}
}
