export const setupControl = (context) => {
	context.input.keyboard.on('keydown-LEFT', () => {
		context.beepSound.play();
		if (context.map.doesPieceFit(context.map.piece, context.map.xPiecePosition - 1, context.map.yPiecePosition)) { context.map.xPiecePosition -= 1; }
	});

	context.input.keyboard.on('keydown-RIGHT', () => {
		context.beepSound.play();
		if (context.map.doesPieceFit(context.map.piece, context.map.xPiecePosition + 1, context.map.yPiecePosition)) { context.map.xPiecePosition += 1; }
	});

	context.input.keyboard.on('keydown-UP', () => {
		context.beepSound.play();
		context.map.rotatePiece();
	});

	context.input.keyboard.on('keydown-DOWN', () => {
		if (context.fallTime > 200) {
			context.setFixedSpeed(50);
		}
	});

	context.input.keyboard.on('keyup-DOWN', () => {
		context.setNormalSpeed();
	});

	context.input.keyboard.on('keydown-SPACE', () => {
		while (context.map.doesPieceFit(context.map.piece, context.map.xPiecePosition, context.map.yPiecePosition + 1)) {
			context.map.yPiecePosition += 1;
		}

		if (!context.gameOver) {
			context.fallPiece();
		}
	});
};
