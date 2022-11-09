import {Svg, Circle} from './components';

import {getRegularPolygonPoints} from 'packages/math';

interface Props {
	sideCount: number;
	selectedPointIndex?: number;
	handlePointSelection: (selectedPointIndex?: number) => void;
}

const Polygon = ({
	sideCount, selectedPointIndex, handlePointSelection,
}: Props) => {
	const points = getRegularPolygonPoints(sideCount, 40);

	return (
		<Svg viewBox='0 0 100 100'>
			<g transform='translate(50 50) rotate(180)'>
				<polygon 
					stroke='red'
					strokeWidth={3}
					fill='none'
					points={points.map(({x, y}) => `${x} ${y}`).join(', ')}
				/>
				<Circle
					r={7}
					fill='red'
					isSelected={selectedPointIndex === undefined}
					onClick={() => handlePointSelection(undefined)}
				/>
				{points.map(({x, y}, index) => {
					const isSelected = selectedPointIndex === index;

					return (
						<Circle 
							key={`${x} ${y}`}
							cx={x}
							cy={y}
							r={7}
							fill='red'
							isSelected={isSelected}
							onClick={() => handlePointSelection(index)}
						/>
					);
				})}
			</g>
		</Svg>
	);
};

export default Polygon;
