import {Complex, Range, map, newtonMethod} from 'packages/math';

import type {DifferentiableFunction} from 'packages/math/types';

function createComplexFn(
	zExponent: number, constant: Complex | number
): DifferentiableFunction<Complex> {
	return Object.assign(
		(z: Complex) => z.pow(zExponent).add(constant),
		{derivative: (z: Complex) => z.pow(zExponent - 1).multiply(zExponent)}
	);
}

function getPixelRenderer(
	context: CanvasRenderingContext2D,
	colorIndex: number,
) {
	const hueRange = colorIndex == 0 
		? new Range(0, 0)
		: colorIndex == 1
			? new Range(150, 290)
			: new Range(0, 50);

	const saturation = colorIndex == 0 ? 0 : 100;

	return (z: Complex, x: number, y: number) => {
		let angle = Math.abs(Math.atan(z.im / z.re));
		if (z.im > 0 && z.re < 0) angle += Math.PI / 2;
		else if (z.im < 0 && z.re < 0) angle += Math.PI;
		else if (z.im < 0 && z.re > 0) angle += 3 * Math.PI / 2;

		context.fillStyle = `hsl(${ 
			map(angle, 0, 2 * Math.PI, hueRange.from, hueRange.to)
		}, ${saturation}%, ${ 
			map(angle, 0, 2 * Math.PI, 30, 70)
		}%)`;
		context.fillRect(x, y, 1, 1);
	};
}

function fractalRenderer(
	context: CanvasRenderingContext2D, 
	iterationCount = 5,
	exponent = 4,
	constant = new Complex(-1, 4),
	scaleFactor = 1,
	colorIndex = 0,
) {
	const fn = createComplexFn(exponent, constant);

	const width = context.canvas.clientWidth;
	const height = context.canvas.clientHeight;

	const renderingRange = new Range(-2, 2).scale(scaleFactor);
	const xRange = renderingRange;
	const yRange = renderingRange.scale(height / width);

	const pixelRenderer = getPixelRenderer(context, colorIndex);

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const newtonMethodGen = newtonMethod(fn, new Complex(
				map(x, 0, width, xRange.from, xRange.to),
				map(y, 0, height, yRange.from, yRange.to)
			));
	
			let nextValue = new Complex(0, 0);

			for (let i = 0; i < iterationCount; i++) {
				nextValue = newtonMethodGen.next().value;
			}

			pixelRenderer(nextValue, x, y);
		}
	}
}

export default fractalRenderer;
