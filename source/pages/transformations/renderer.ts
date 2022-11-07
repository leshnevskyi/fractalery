import {round} from 'lodash';

import {
	Range, 
	map, 
	transformPoint, 
	getSquarePointsByDiagonalPoints,
} from 'packages/math';
import type {Point, Transformation} from 'packages/math';

function render(
	context: CanvasRenderingContext2D, 
	transformation: Transformation
) {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);

	const canvas = context.canvas;
	const {clientWidth: width, clientHeight: height} = canvas;
	const aspectRatio = width / height;

	const xRange = new Range(-5, 5);
	const yRange = xRange.scale(1 / aspectRatio);
	const step = 1;

	function renderGrid() {
		for (let x = xRange.from - xRange.from % step; x < xRange.to; x += step) {
			context.lineWidth = round(x, 2) ? 1 : 3;
			const screenX = map(x, xRange.from, xRange.to, 0, width);

			context.beginPath();
			context.moveTo(screenX, 0);
			context.lineTo(screenX, height);
			context.stroke();
		}

		for (
			let y = yRange.from - yRange.from % step;  
			y < yRange.to; 
			y += step
		) {						
			context.lineWidth = round(y, 2) ? 1 : 3;
			const screenY = map(y, yRange.from, yRange.to, 0, height);

			context.beginPath();
			context.moveTo(0, screenY);
			context.lineTo(width, screenY);
			context.stroke();
		}
	}

	renderGrid();

	const origin: Point = {x: 1, y: 1};

	const points: Point[] = getSquarePointsByDiagonalPoints(
		{x: -1, y: -1}, {x: 1, y: 1}
	).map(point => {
		return transformPoint(point, origin, transformation);
	});

	const pointRadius = 10;

	points.forEach(point => {
		context.beginPath();
		context.arc(
			map(point.x, xRange.from, xRange.to, 0, width), 
			map(-point.y, yRange.from, yRange.to, 0, height), 
			pointRadius,
			0,
			2 * Math.PI
		);
		context.fill();
	});
}

export default render;
