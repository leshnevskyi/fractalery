import {
	Range, 
	transformPoint, 
	getSquarePointsByDiagonalPoints,
} from 'packages/math';
import type {Point, Transformation} from 'packages/math';

function render(
	context: CanvasRenderingContext2D, 
	transformation: Transformation
) {
	const canvas = context.canvas;
	const aspectRatio = canvas.width / canvas.height;

	const contextScaleFactor = 300;
	const contextOrigin: Point = {
		x: canvas.width / 2,
		y: canvas.height / 2,
	};
	const transformMatrix = new DOMMatrix()
		.translateSelf(contextOrigin.x, contextOrigin.y)
		.scaleSelf(contextScaleFactor, -contextScaleFactor);
	context.setTransform(transformMatrix);

	const xRange = new Range(0, canvas.width)
		.offset(-contextOrigin.x)
		.scale(1 / contextScaleFactor);
	const yRange = xRange.scale(1 / aspectRatio);

	context.clearRect(xRange.from, yRange.from, xRange.length, yRange.length);

	const defaultLineWidth = 1 / contextScaleFactor;
	
	function renderGrid() {
		const step = 1;
		context.lineWidth = defaultLineWidth;

		function drawVerticalLine(x: number) {
			context.beginPath();
			context.moveTo(x, yRange.from);
			context.lineTo(x, yRange.to);
			context.stroke();
		}

		for (let x = 0; x > xRange.from; x -= step) {
			drawVerticalLine(x);
		}

		for (let x = 0; x < xRange.to; x += step) {
			drawVerticalLine(x);
		}

		function drawHorizontalLine(y: number) {
			context.beginPath();
			context.moveTo(xRange.from, y);
			context.lineTo(xRange.to, y);
			context.stroke();
		}

		console.log(yRange);
		

		for (let y = 0; y > yRange.from; y -= step) {
			drawHorizontalLine(y);
		}

		for (let y = 0; y < yRange.to; y += step) {
			drawHorizontalLine(y);
		}



		// for (
		// 	let y = yRange.from - yRange.from % step;  
		// 	y < yRange.to; 
		// 	y += step
		// ) {						
		// 	context.lineWidth = round(y, 2) ? 1 : 3;
		// 	const screenY = map(y, yRange.from, yRange.to, 0, canvas.height);

		// 	context.beginPath();
		// 	context.moveTo(0, screenY);
		// 	context.lineTo(canvas.width, screenY);
		// 	context.stroke();
		// }
	}

	renderGrid();

	const origin: Point = {x: 1, y: 1};

	const points: Point[] = getSquarePointsByDiagonalPoints(
		{x: -1, y: -1}, {x: 1, y: 1}
	).map(point => {
		return transformPoint(point, origin, transformation);
	});

	const pointRadius = 0.1;

	points.forEach(point => {
		context.beginPath();
		context.stroke();
		context.arc(
			point.x, 
			point.y, 
			pointRadius,
			0,
			2 * Math.PI
		);
		context.fill();
	});

	// context.beginPath();
	// context.moveTo(
	// 	map(points[0].x, xRange.from, xRange.to, 0, width),
	// 	map(-points[0].y, yRange.from, yRange.to, 0, height),
	// );
	// context.lineWidth = 3;
	// points.forEach(point => {
	// 	context.lineTo(
	// 		map(point.x, xRange.from, xRange.to, 0, width),
	// 		map(-point.y, yRange.from, yRange.to, 0, height),
	// 	);
	// 	context.stroke();
	// });
}

export default render;
