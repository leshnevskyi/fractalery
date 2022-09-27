import {isNumber} from 'lodash';

class Complex {
	constructor(public re: number, public im: number) {}

	static from(other: Complex | number) {
		return isNumber(other) 
			? new Complex(other, 0) 
			: new Complex(other.re, other.im);
	}

	add(other: Complex | number) {
		other = Complex.from(other);

		return new Complex(this.re + other.re, this.im + other.im);
	}

	subtract(other: Complex | number) {
		other = Complex.from(other);

		return this.add(other.additiveInverse);
	}

	multiply(other: Complex | number) {
		other = Complex.from(other);
		
		return new Complex(
			this.re * other.re - this.im * other.im, 
			this.re * other.im + this.im * other.re
		);
	}

	divide(other: Complex | number) {
		if (isNumber(other)) {
			return new Complex(this.re / other, this.im / other);
		}

		const commonDenominator = other.re ** 2 + other.im ** 2;

		return new Complex(
			(this.re * other.re + this.im * other.im) / commonDenominator,
			(this.im * other.re - this.re * other.im) / commonDenominator
		);
	}

	pow(exponent: number): Complex {
		return exponent == 0 
			? new Complex(1, 0) 
			: this.multiply(this.pow(exponent - 1));
	}

	get additiveInverse() {
		return new Complex(-this.re, -this.im);
	}

	get abs() {
		return Math.sqrt(this.re ** 2 + this.im ** 2);
	}
}

export default Complex;
