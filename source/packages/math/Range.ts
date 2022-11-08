class Range {
	constructor(public from: number, public to: number) {}

	scale(factor: number) {
		return new Range(this.from * factor, this.to * factor);
	}

	offset(value: number) {
		return new Range(this.from + value, this.to + value);
	}

	get length() {
		return Math.abs(this.to - this.from);
	}
}

export default Range;
