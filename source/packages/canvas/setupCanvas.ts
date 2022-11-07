function setupCanvas(
	canvas: HTMLCanvasElement, 
	renderer?: (context: CanvasRenderingContext2D) => void
) {
	const context = canvas.getContext('2d');

	if (!context) return;

	const scaleFactor = window.devicePixelRatio;
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
