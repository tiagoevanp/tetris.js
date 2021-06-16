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
		context.fallEvent.reset({ delay: 20, callback: context.fallPiece, callbackScope: context, loop: true });
	});

	context.input.keyboard.on('keyup-DOWN', () => {
		context.fallEvent.reset({ delay: 1000, callback: context.fallPiece, callbackScope: context, loop: true });
	});
};
