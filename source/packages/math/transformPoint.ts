import {matrix, add, multiply} from 'mathjs';

import type {Point, Transformation} from './types';

function transformPoint(
	point: Point, 
	{offset, scale, rotation, origin}: Transformation,
): Point {
	const coordinateMatrix = add(
		multiply(
			multiply(
				multiply(
					matrix([[point.x, point.y, 1]]), 
					matrix([[1, 0, 0], [0, 1, 0], [-origin.x, -origin.y, 1]]), 
				), 
				multiply(
					matrix([
						[Math.cos(rotation), Math.sin(rotation), 0], 
						[-Math.sin(rotation), Math.cos(rotation), 0],
						[0, 0, 1],
					]), 
					matrix([		
						[scale, 0, 0],
						[0, scale, 0],
						[0, 0, 1],
					]),
				)
			),
			matrix([[1, 0, 0], [0, 1, 0], [origin.x, origin.y, 1]])
		),
		matrix([[offset.x, offset.y, 0]])
	);

	return {
		x: coordinateMatrix.get([0, 0]),
		y: coordinateMatrix.get([0, 1]),
	};
}

export default transformPoint;
