import {useState, useEffect} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

import {
	FractalSection, 
	Canvas,
	CanvasWrapper, 
	ControlContainer, 
	ControlWrapper,
} from './components';
import {
	PageLayout,
	Heading,
	Slider,
	ColorSelector,
	NumberInput,
	ControlLabel,
	Tooltip,
	Alert,
	Button,
} from 'components';

import {setupCanvas} from 'packages/canvas';
import fractalRenderer from './fractalRenderer';
import {Complex} from 'packages/math';

import meta from './meta.json';

const FractalPage = () => {
	const [iterationCount, setIterationCount] = useState(5);
	const [scaleFactor, setScaleFactor] = useState(1);
	const [exponent, setExponent] = useState(3);
	const [constant, setConstant] = useState(new Complex(-1, 4));
	const [_, setRenderingWorker] = useState<Worker>();

	const colors = ['black', 'blue', 'red'];
	const [colorIndex, setColorIndex] = useState(2);

	const [progress, setProgress] = useState<number>();

	const [canvasElement, setCanvasElement] = useState<
		HTMLCanvasElement | null
	>(null);
	const renderingContext = canvasElement?.getContext('2d');

	useEffect(() => {
		canvasElement && setupCanvas(canvasElement);
	}, [canvasElement]);

	useEffect(() => {
		if (!renderingContext) return;

		fractalRenderer(
			renderingContext, 
			iterationCount, 
			exponent, 
			constant, 
			1 / scaleFactor, 
			colorIndex,
			setProgress,
			worker => setRenderingWorker(prevWorker => {
				prevWorker && prevWorker.terminate();

				return worker;
			}),
		);
	}, [	
		renderingContext,
		iterationCount, 
		exponent, 
		constant, 
		scaleFactor, 
		colorIndex, 
	]);

	const constantNumberIsSet = !Number.isNaN(constant.im)
		&& !Number.isNaN(constant.re);

	return (
		<PageLayout meta={meta}>
			<Alert 
				isDisplayed={
					iterationCount > 30 && constantNumberIsSet} 
				type='warning'
			>
				Rendering might take a long time bacause of the big number of iterations
			</Alert>
			<Alert isDisplayed={!constantNumberIsSet} type='error'>
				Constant number must be present
			</Alert>
			<div className='flex flex-col w-full'>
				<Tooltip title={'Newton\'s fractal formula'}>
					<Heading as='span' level={1}>f(z) = z<sup>k</sup> + c</Heading>
				</Tooltip>
				<FractalSection>
					<ControlContainer>
						<Tooltip title='Exponent of the function'>
							<Slider
								title='K value'
								range={[3, 10]}
								value={exponent}
								onChange={value => {
									setExponent(value);
								}}
							/>
						</Tooltip>
						<Slider
							title='Number of iterations'
							range={[5, 100]}
							value={iterationCount}
							onChange={value => {
								setIterationCount(value);
							}}
						/>
						<Tooltip title='Complex number: real and imaginary parts'>
							<ControlLabel>
								C = &nbsp;
								<NumberInput
									value={constant.re}
									onChange={value => setConstant(prevConstant => {
										return new Complex(value, prevConstant.im);
									})}
								/>
								&nbsp; + &nbsp;
								<NumberInput
									value={constant.im}
									onChange={value => setConstant(prevConstant => {
										return new Complex(prevConstant.re, value);
									})}
								/>
								&nbsp; i
							</ControlLabel>
						</Tooltip>
						<Slider
							title='Scale'
							range={[1, 10]}
							step={0.1}
							value={scaleFactor}
							onChange={value => {
								setScaleFactor(value);
							}}
						/>
						<ControlWrapper>
							<ControlLabel>Color palette</ControlLabel>
							<ColorSelector
								colors={colors}
								value={colorIndex}
								onChange={index => setColorIndex(index)}
							/>
						</ControlWrapper>
					</ControlContainer>
					<CanvasWrapper>
						<Canvas
							ref={canvas => canvas && setCanvasElement(canvas)}
						/>
						<AnimatePresence>
							{progress && (
								<motion.div 
									initial={{opacity: 0}}
									animate={{opacity: 1}}
									exit={{opacity: 0}}
									className='
										absolute w-full h-full flex items-center justify-center
										bg-tuftbush bg-opacity-70
									'
								>
									<div className='
										w-2/3 h-3 bottom-0 rounded-full overflow-hidden 
										bg-white bg-opacity-30 flex shadow-lg shadow-orange/30
									'>
										<div 
											className='
												bg-white rounded-full
											' 
											style={{flex: progress}}
										/>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
						<AnimatePresence>
							{!progress && (
								<motion.div 
									className='absolute -top-5 -left-5'
									initial={{opacity: 0}}
									animate={{opacity: 1}}
									exit={{opacity: 0}}
								>
									<Button
										className='
											border-2 border-tuftbush shadow-lg shadow-tuftbush/50
										'
										as='a'
										onClick={event => {
											if (!canvasElement || progress) return;

											event.currentTarget.download = 'fractal.png';
											event.currentTarget.href = canvasElement.toDataURL();
										}}
									>Export</Button>
								</motion.div>
							)}
						</AnimatePresence>
					</CanvasWrapper>
				</FractalSection>
			</div>
		</PageLayout>
	);
};

export default FractalPage;
