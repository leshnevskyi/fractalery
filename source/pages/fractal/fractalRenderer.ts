import {Complex, Range} from 'packages/math';

function fractalRenderer(
	context: CanvasRenderingContext2D, 
	iterationCount = 5,
	exponent = 4,
	constant = new Complex(-1, 4),
	scaleFactor = 1,
	colorIndex = 0,
	onProgress: (value: number | undefined) => void,
	onWorkerInit: (worker: Worker) => void,
) {
	const width = context.canvas.clientWidth;
	const height = context.canvas.clientHeight;

	const renderingRange = new Range(-2, 2).scale(scaleFactor);
	const xRange = renderingRange;
	const yRange = renderingRange.scale(height / width);

	const worker = new Worker(new URL('./renderer.worker.ts', import.meta.url), {
		type: 'module',
	});
	onWorkerInit(worker);

	worker.postMessage({
		width, 
		height, 
		xRange, 
		yRange, 
		iterationCount, 
		exponent, 
		constant, 
		colorIndex,
	});

	worker.addEventListener('message', (event: MessageEvent) => {
		if (typeof event.data === 'number') {
			onProgress(event.data);

			return;
		}

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				context.fillStyle = event.data[y * width + x];
				context.fillRect(x, y, 1, 1);
			}
		}

		onProgress(undefined);
	});
}

export default fractalRenderer;
