import {Complex, Range, map} from 'packages/math';

function createPixelColorGetter(
	colorIndex: number,
) {
	const hueRange = colorIndex == 0 
		? new Range(0, 0)
		: colorIndex == 1
			? new Range(150, 290)
			: new Range(0, 50);

	const saturation = colorIndex == 0 ? 0 : 100;

	return (z: Complex) => {
		let angle = Math.abs(Math.atan(z.im / z.re));
		if (z.im > 0 && z.re < 0) angle += Math.PI / 2;
		else if (z.im < 0 && z.re < 0) angle += Math.PI;
		else if (z.im < 0 && z.re > 0) angle += 3 * Math.PI / 2;

		const color = `hsl(${ 
			map(angle, 0, 2 * Math.PI, hueRange.from, hueRange.to)
		}, ${saturation}%, ${ 
			map(angle, 0, 2 * Math.PI, 30, 70)
		}%)`;
		
		return color;
	};
}

export default createPixelColorGetter;
