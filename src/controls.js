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
		if (context.fallTime > 80) {
			context.fallTime = 80;
			context.fallEvent.reset({ delay: context.fallTime, callback: context.fallPiece, callbackScope: context, loop: true });
		}
	});

	context.input.keyboard.on('keyup-DOWN', () => {
		context.fallTime = 1000;
		context.fallEvent.reset({ delay: context.fallTime - (context.speed + 1) * 100, callback: context.fallPiece, callbackScope: context, loop: true });
	});
};
