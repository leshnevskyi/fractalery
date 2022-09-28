import Complex from './Complex';

import type {DifferentiableFunction} from './types';

function* newtonMethod<T extends Complex>(
	fn: DifferentiableFunction<T>, initialGuess: T
): Generator<T, T> {
	const nextGuess = initialGuess.subtract( 
		fn(initialGuess).divide(fn.derivative(initialGuess))
	) as T;

	yield nextGuess;
	yield* newtonMethod(fn, nextGuess);

	return nextGuess;
}

export default newtonMethod;
