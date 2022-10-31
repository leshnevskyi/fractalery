import {mapValues, round} from 'lodash';

interface Rgb {
	r: number;
	g: number;
	b: number;
}

interface Hsl {
	h: number;
	s: number;
	l: number;
}

class Color {
	rgb: Rgb;

	constructor(rgb: Rgb) {
		this.rgb = rgb;
	}

	get hsl(): Hsl {
		return Color.rgbToHsl(this.rgb);
	}

	static rgbToHsl(rgb: Rgb): Hsl {
		const {r, g, b} = mapValues(
			rgb, channel => channel / 255
		);

		const min = Math.min(r, g, b);
		const max = Math.max(r, g, b);

		const l = round((min + max) / 2, 2);

		const s = min === max 
			? 0
			: l > 0.5
				? round((max - min) / (2 - max - min), 2)
				: round((max - min) / (max + min), 2);

		const chroma = max - min;

		/** 
		 * Always remember you cannot fucking divide by 0, so here we have to check 
		 * if chroma is not 0, otherwise we we'll see lots of NaNs for the hue 
		 * component on a B&W pic. 
		 */
		const h = chroma 
			? Math.round(60 * (max === r
				? (g - b) / chroma
				: max === g
					? 2 + (b - r) / chroma
					: 4 + (r - g) / chroma))
			: 0;

		return {h, s, l};
	}

	static hslToRgb(hsl: Hsl): Rgb {
		const {h, s, l} = hsl;

		const k = (n: number) => (n + h / 30) % 12;
		
		const a = s * Math.min(l, 1 - l);
		
		const f = (n: number) =>
			l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

		return {r: 255 * f(0), g: 255 * f(8), b: 255 * f(4)};
	}
}

export type {Rgb, Hsl};

export default Color;
