import type {Point} from './types';

function getSquarePointsByDiagonalPoints(
	firstPoint: Point, secondPoint: Point
): [Point, Point, Point, Point] {
	return [
		firstPoint, 
		secondPoint, 
		{
			x: (firstPoint.x + secondPoint.x + firstPoint.y - secondPoint.y) / 2,
			y: (secondPoint.x - firstPoint.x + firstPoint.y + secondPoint.y) / 2,
		},
		{
			x: (firstPoint.x + secondPoint.x + secondPoint.y - firstPoint.y) / 2,
			y: (firstPoint.x - secondPoint.x + firstPoint.y + secondPoint.y) / 2,
		},
	];
}

export {getSquarePointsByDiagonalPoints};
