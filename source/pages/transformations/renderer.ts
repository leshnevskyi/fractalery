import {
	map,
	Range, 
	transformPoint,
	getRegularPolygonPoints,
} from 'packages/math';
import type {Point, Transformation} from 'packages/math';

function render(
	context: CanvasRenderingContext2D, 
	transformation: Transformation
) {
	const canvas = context.canvas;

	const contextScaleFactor = 150;
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
	const yRange = new Range(0, canvas.height)
		.offset(-contextOrigin.y)
		.scale(1 / contextScaleFactor);

	context.clearRect(xRange.from, yRange.from, xRange.length, yRange.length);

	const defaultLineWidth = 1 / contextScaleFactor;
	
	function renderGrid() {
		const step = 1;

		function drawVerticalLine(x: number) {
			context.beginPath();
			context.moveTo(x, yRange.from);
			context.lineTo(x, yRange.to);
			context.stroke();
		}

		function drawHorizontalLine(y: number) {
			context.beginPath();
			context.moveTo(xRange.from, y);
			context.lineTo(xRange.to, y);
			context.stroke();
		}

		context.lineWidth = defaultLineWidth * 5;
		drawVerticalLine(0);
		drawHorizontalLine(0);

		context.lineWidth = defaultLineWidth;

		const pixelXRange = xRange.scale(contextScaleFactor);
		const pixelYRange = yRange.scale(contextScaleFactor);

		context.font = '3vw sans-serif';
		context.textAlign = 'end';

		function renderText(
			text: string, x: number, y: number, offsetX = 0, offsetY = 0
		) {
			context.setTransform(transformMatrix.scaleSelf(
				1 / contextScaleFactor, 
				-1 / contextScaleFactor
			));
			context.fillText(
				text, 
				map(x, xRange.from, xRange.to, pixelXRange.from, pixelXRange.to) 
					+ offsetX,
				map(-y, yRange.from, yRange.to, pixelYRange.from, pixelYRange.to) 
					+ offsetY,
			);
			context.setTransform(transformMatrix.scaleSelf(
				1 * contextScaleFactor, 
				-1 * contextScaleFactor
			));
		}
		
		for (let x = 0; x > xRange.from; x -= step) {
			renderText(x.toString(), x, 0, -10, 50);
			drawVerticalLine(x);
		}

		for (let x = 0; x < xRange.to; x += step) {
			renderText(x.toString(), x, 0, -10, 50);
			drawVerticalLine(x);
		}

		for (let y = 0; y > yRange.from; y -= step) {
			renderText(y.toString(), 0, y, -10, 50);
			drawHorizontalLine(y);
		}

		for (let y = 0; y < yRange.to; y += step) {
			renderText(y.toString(), 0, y, -10, 50);
			drawHorizontalLine(y);
		}
	}

	renderGrid();

	const points = getRegularPolygonPoints(6);
	const origin = points[1];
	const transformedPoints: Point[] = points.map(point => {
		return transformPoint(point, origin, transformation);
	});

	const pointRadius = 0.1;

	transformedPoints.forEach(point => {
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

	context.beginPath();
	context.lineWidth = defaultLineWidth * 5;

	[...transformedPoints, transformedPoints[0]].forEach(point => {
		context.lineTo(point.x, point.y);
		context.stroke();
	});
}

export default render;
