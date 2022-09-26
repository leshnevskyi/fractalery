class Complex {
	constructor(public re: number, public im: number) {}

	static from(other: Complex) {
		return new Complex(other.re, other.im);
	} 

	add(other: Complex) {
		return new Complex(this.re + other.re, this.im + other.im);
	}

	multiply(other: Complex) {
		return new Complex(
			this.re * other.re - this.im * other.im, 
			this.re * other.im + this.im * other.re
		);
	}

	pow(exponent: number): Complex {
		return exponent == 0 
			? new Complex(1, 0) 
			: this.multiply(this.pow(exponent - 1));
	}

	get abs() {
		return Math.sqrt(Math.pow(this.re, 2) + Math.pow(this.im, 2));
	}
}

export default Complex;
