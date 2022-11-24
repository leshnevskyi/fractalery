function setupCanvas(
	canvas: HTMLCanvasElement, 
	renderer?: (context: CanvasRenderingContext2D) => void,
	scaleFactor = 1
) {
	const context = canvas.getContext('2d');

	if (!context) return;

	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	
	canvas.width = width * scaleFactor;
	canvas.height = height * scaleFactor;
	canvas.style.width = `${width}px`;
	canvas.style.height = `${height}px`;
	context.scale(scaleFactor, scaleFactor);

	renderer?.(context);
}

export default setupCanvas;
