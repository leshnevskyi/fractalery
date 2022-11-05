import {useEffect, useState, useRef} from 'react';

import {Canvas} from './components';

import {useElement} from 'hooks';

import render from './renderer';
import {setupCanvas} from 'packages/canvas';

const TransformationsPage = () => {
	const [canvasRef, canvas] = useElement<HTMLCanvasElement>();
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

		render(renderingContextRef.current, {
			offset: {
				x: offsetX,
				y: offsetY,
			},
			scale,
			rotation,
		});
	});

	return (
		<Canvas ref={canvasRef}/>
	);
};

export default TransformationsPage;
