export const setupControl = (context) => {
	context.input.keyboard.on('keydown-LEFT', () => {
		if (context.map.doesPieceFit(context.map.piece, context.map.xPiecePosition - 1, context.map.yPiecePosition)) { context.map.xPiecePosition -= 1; }
	});

	context.input.keyboard.on('keydown-RIGHT', () => {
		if (context.map.doesPieceFit(context.map.piece, context.map.xPiecePosition + 1, context.map.yPiecePosition)) { context.map.xPiecePosition += 1; }
	});

	context.input.keyboard.on('keydown-UP', () => {
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
};
