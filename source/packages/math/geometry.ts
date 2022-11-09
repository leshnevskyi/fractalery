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

function getRegularPolygonPoints(sideCount: number, radius = 1) {
	const angle = 2 * Math.PI / sideCount;

	return [...Array(sideCount)].map((_, index) => {
		return {
			x: radius * Math.cos(index * angle),
			y: radius * Math.sin(index * angle),
		};
	}) as Point[];
}

export {getSquarePointsByDiagonalPoints, getRegularPolygonPoints};
