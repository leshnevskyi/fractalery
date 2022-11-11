import {useEffect, useState, useRef} from 'react';
import {round} from 'lodash';

import {Canvas, Polygon} from './components';
import {PageLayout, Slider} from 'components';

import {useElement} from 'hooks';

import render from './renderer';
import {getRegularPolygonPoints, map} from 'packages/math';
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
	const [wtf, setWtf] = useState(0);
	const [circumscribedCircleRadius, setCircumscribedCircleRadius] = useState(1);
	const renderingContextRef = useRef<CanvasRenderingContext2D | null>();

	useEffect(() => {
		if (!canvas) return;

		renderingContextRef.current = canvas?.getContext('2d');
		setupCanvas(canvas);
	}, [canvas]);	

	useEffect(() => {
		if (!renderingContextRef.current) return;

		const points = getRegularPolygonPoints(
			polygonSideCount, circumscribedCircleRadius
		);

		render(renderingContextRef.current, contextScaleFactor, points, {
			offset: {
				x: offsetX,
				y: offsetY,
			},
			scale: map(wtf, 0, 360, 1, 3),
			rotation: wtf * (Math.PI / 180),
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
		wtf,
		circumscribedCircleRadius,
	]);

	return (
		<PageLayout>
			<div className='flex w-full h-full'>
				<div className='flex flex-col w-1/3 gap-20'>
					<div style={{marginBottom: -50}}>
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
						title='Circumscribed Circle Radius'
						range={[0.5, 5]}
						step={0.5}
						value={circumscribedCircleRadius}
						onChange={setCircumscribedCircleRadius}
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
						title='Simultaneous rotation with upscaling'
						range={[0, 360]}
						suffix='°'
						step={1}
						value={wtf}
						onChange={setWtf}
					/>
				</div>
				<div className='flex-1'>
					<Canvas 
						ref={canvasRef}
						onWheel={event => {	
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
