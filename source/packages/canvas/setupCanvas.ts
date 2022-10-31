function setupCanvas(
	canvas: HTMLCanvasElement, 
	renderer?: (context: CanvasRenderingContext2D) => void
) {
	const context = canvas.getContext('2d');

	if (!context) return;

	const scaleFactor = 1;
	canvas.width = canvas.clientWidth * scaleFactor;
	canvas.height = canvas.clientHeight * scaleFactor;
	context.scale(scaleFactor, scaleFactor);

	renderer?.(context);
}

export default setupCanvas;
