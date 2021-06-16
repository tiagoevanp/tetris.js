export const screenBlocks = { x: 9, y: 19 };
export const blockSize = 20;

export const pieces = {
	line: [
		[0, 1, 0, 0], // 1, 1, 1, 1     0,0 3,0  0,1 2,0  0,2 1,0  0,3 0,0
		[0, 1, 0, 0], // 0, 0, 0, 0     1,0 3,1  1,1 2,1  1,2 1,1  1,3 0,1
		[0, 1, 0, 0], // 0, 0, 0, 0     2,0 3,2  2,1 2,2  2,2 1,2  2,3 0,2
		[0, 1, 0, 0], // 0, 0, 0, 0     3,0 3,3  3,1 2,3  3,2 1,3  3,3 0,3
	],
	square: [
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	],
	t: [
		[0, 0, 0, 0],
		[1, 1, 1, 0],
		[0, 1, 0, 0],
		[0, 0, 0, 0],
	],
	l: [
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	],
	reverseL: [
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	],
	skew: [
		[0, 0, 0, 0],
		[1, 1, 0, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	],
	reverseSkew: [
		[0, 0, 0, 0],
		[0, 0, 1, 1],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	],
};
