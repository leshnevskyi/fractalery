function map(
	value: number, 
	inStart: number, inStop: number, 
	outStart: number, outStop: number
) {
	return outStart 
		+ (outStop - outStart) / (inStop - inStart) * (value - inStart);
}

export default map;
