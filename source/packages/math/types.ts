interface DifferentiableFunction<T = number> {
	(x: T): T,
	derivative: (x: T) => T,
}

interface Point {
	x: number;
	y: number;
}

interface Transformation {
	offset: {x: number; y: number};
	scale: number;
	rotation: number;
}

export type {DifferentiableFunction, Point, Transformation};
