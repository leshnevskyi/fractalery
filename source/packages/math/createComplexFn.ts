import Complex from './Complex';

import {type DifferentiableFunction} from './types';

function createComplexFn(
	zExponent: number, constant: Complex | number
): DifferentiableFunction<Complex> {
	return Object.assign(
		(z: Complex) => z.pow(zExponent).add(constant),
		{derivative: (z: Complex) => z.pow(zExponent - 1).multiply(zExponent)}
	);
}

export default createComplexFn;
