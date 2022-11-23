import {Complex, createComplexFn, map, newtonMethod} from 'packages/math';
import createPixelColorGetter from './createPixelColorGetter';

globalThis.addEventListener('message', (event: MessageEvent) => {
	const {
		width, 
		height, 
		xRange, 
		yRange, 
		iterationCount, 
		exponent,
		constant, 
		colorIndex,
	} = event.data;
	const fn = createComplexFn(exponent, new Complex(constant.re, constant.im));
	const getPixelColor = createPixelColorGetter(colorIndex);

	const pixelColors = [] as string[];

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const newtonMethodGen = newtonMethod(fn, new Complex(
				map(x, 0, width, xRange.from, xRange.to),
				map(y, 0, height, yRange.from, yRange.to)
			));
	
			let value = new Complex(0, 0);

			for (let i = 0; i < iterationCount; i++) {
				value = newtonMethodGen.next().value;
			}

			pixelColors.push(getPixelColor(value));
		}

		globalThis.postMessage(y / height); 
	}

	globalThis.postMessage(1); 
	globalThis.postMessage(pixelColors); 
});
