import {useEffect, useState, useRef} from 'react';
import {round} from 'lodash';

import {Canvas, Polygon} from './components';
import {PageLayout, Slider} from 'components';

import {useElement} from 'hooks';

import render from './renderer';
import {getRegularPolygonPoints} from 'packages/math';
import {setupCanvas} from 'packages/canvas';

const TransformationsPage = () => {
	const [canvasRef, canvas] = useElement<HTMLCanvasElement>();

	const [originPointIndex, setOriginPointIndex] = useState<number>();
	const [contextScaleFactor, setContextScaleFactor] = useState(100);
	const [polygonSideCount, setPolygonSideCount] = useState(6);
	const [offsetX, setOffsetX] = useState(0);
	const [offsetY, setOffsetY] = useState(0);
	const [scale, setScale] = useState(1);
	const [rotation, setRotation] = useState(0);
	const renderingContextRef = useRef<CanvasRenderingContext2D | null>();

	useEffect(() => {
		if (!canvas) return;

		renderingContextRef.current = canvas?.getContext('2d');
		setupCanvas(canvas);
	}, [canvas]);	

	useEffect(() => {
		if (!renderingContextRef.current) return;

		const points = getRegularPolygonPoints(polygonSideCount);

		render(renderingContextRef.current, contextScaleFactor, points, {
			offset: {
				x: offsetX,
				y: offsetY,
			},
			scale,
			rotation,
			origin: originPointIndex === undefined 
				? {x: 0, y: 0} 
				: points?.[originPointIndex],
		});
	}, [
		canvas, 
		polygonSideCount, 
		offsetX, 
		offsetY, 
		scale, 
		rotation, 
		originPointIndex,
		contextScaleFactor,
	]);

	return (
		<PageLayout>
			<div className='flex w-full h-full'>
				<div className='flex flex-col w-1/3 gap-20'>
					<div>
						<Polygon 
							sideCount={polygonSideCount}
							selectedPointIndex={originPointIndex}
							handlePointSelection={index => setOriginPointIndex(index)}
						/>
					</div>
					<Slider
						title='Number of Polygon Sides'
						range={[3, 9]}
						step={1}
						value={polygonSideCount}
						onChange={setPolygonSideCount}
					/>
					<Slider
						title='Center X Position'
						range={[-10, 10]}
						step={0.1}
						value={offsetX}
						onChange={setOffsetX}
					/>
					<Slider
						title='Center Y Position'
						range={[-10, 10]}
						step={0.1}
						value={offsetY}
						onChange={setOffsetY}
					/>
					<Slider
						title='Rotation Angle'
						range={[-Math.PI, Math.PI]}
						step={Math.PI / 24}
						value={rotation}
						onChange={value => setRotation(round(value, 2))}
					/>
					<Slider
						title='Scale'
						range={[0, 2]}
						step={0.01}
						value={scale}
						onChange={setScale}
					/>
				</div>
				<div className='flex-1'>
					<Canvas 
						ref={canvasRef}
						onWheel={event => {
							event.preventDefault();	
							event.stopPropagation();

							setContextScaleFactor(prevScaleFactor => {
								if (prevScaleFactor < 100 && event.deltaY < 0) {
									return prevScaleFactor;
								}

								return prevScaleFactor + event.deltaY;
							});
						}}
					/>
				</div>
			</div>
		</PageLayout>
	);
};

export default TransformationsPage;
