function map(
	value: number, 
	inStart: number, inStop: number, 
	outStart: number, outStop: number
) {
	return outStart + value / (inStop - inStart) * (outStop - outStart);
}

export default map;
