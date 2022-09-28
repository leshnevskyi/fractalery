interface DifferentiableFunction<T = number> {
	(x: T): T,
	derivative: (x: T) => T,
}

export type {DifferentiableFunction};
