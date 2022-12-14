import {useState, useEffect} from 'react';
import {isString, clamp} from 'lodash';
import BezierEasing from 'bezier-easing';

import {
	PageLayout, 
	Text,
	Button,
	Slider,
	ColorSelector,
	Heading,
	Alert,
} from 'components';
import {
	ContentWrapper,
	FigureContainer,
	FigureWrapper,
	FigureCanvas,
	ColorComponents,
} from './components';

import {setupCanvas} from 'packages/canvas';
import {Color} from 'packages/colors';
import type {Rgb} from 'packages/colors';

import meta from './meta.json';

const defaultEasingFn = BezierEasing(0.3, 0, 0.1, 1);

function easeSymmetrically(
	value: number, 
	min: number, 
	max: number,
	easingFn: BezierEasing.EasingFunction = defaultEasingFn,
) {
	const average = (min + max) / 2;

	return easingFn((average - Math.abs(value - average)) / average); 
}

interface Point {
	x: number;
	y: number;
}

const getMappedImageData = (
	canvas: HTMLCanvasElement, 
	image: HTMLImageElement,
	rgbMapper?: (rgb: Rgb) => Rgb,
) => {
	canvas.style.aspectRatio = `${image.width} / ${image.height}`;
	setupCanvas(canvas);

	const context = canvas.getContext('2d');

	if (!context) return;

	context.drawImage(
		image, 0, 0, canvas.clientWidth, canvas.clientHeight
	);

	const imageData = context.getImageData(
		0, 0, canvas.width, canvas.height
	);
	const rgbaUint8ClampedArray = imageData.data;

	for (let i = 0; i < rgbaUint8ClampedArray.length; i += 4) {
		const [r, g, b] = [...Array(3)].map((_, index) => {
			return rgbaUint8ClampedArray[i + index];
		});
		
		([
			rgbaUint8ClampedArray[i], 
			rgbaUint8ClampedArray[i + 1],
			rgbaUint8ClampedArray[i + 2],
		] = rgbMapper ? Object.values(rgbMapper({r, g, b})) : [r, g, b]);
	}

	return imageData;
};

function renderImageData(
	context: CanvasRenderingContext2D,
	imageData: ImageData,
	selectionStartPoint?: Point,
	selectionEndPoint?: Point,
) {
	if (selectionStartPoint && selectionEndPoint) {
		context.putImageData(
			imageData,
			0, 
			0, 
			selectionStartPoint.x,
			selectionStartPoint.y, 
			selectionEndPoint.x - selectionStartPoint.x, 
			selectionEndPoint.y - selectionStartPoint.y,
		);
	} else context.putImageData(imageData, 0, 0);
}

const ColorModelPage = () => {
	const [color, setColor] = useState(new Color({r: 0, g: 0, b: 0}));
	const rgb = color.rgb;
	const hsl = color.hsl;

	let rgbCanvas: HTMLCanvasElement | null;
	let hslCanvas: HTMLCanvasElement | null;

	const [image, setImage] = useState<HTMLImageElement>();
	const [hueModifier, setHueModifier] = useState(0);
	const [saturationModifier, setSaturationModifier] = useState(0);
	const [lightnessModifier, setLightnessModifier] = useState(0);
	const [selectedHueRangeIndex, setSelectedHueRangeIndex] = useState(0);

	const [isSelecting, setIsSelecting] = useState(false);

	const [successAlertIsDisplayed, setSuccessAlertIsDisplayed] = useState(false);

	useEffect(() => {
		image?.addEventListener('load', () => {			
			if (!image || !rgbCanvas || !hslCanvas) return;

			getMappedImageData(rgbCanvas, image);
			getMappedImageData(
				hslCanvas, 
				image, 
				rgb => Color.hslToRgb(Color.rgbToHsl(rgb))
			);

			setSuccessAlertIsDisplayed(true);
		});
	}, [image?.src]);

	const hueStep = 45;

	const [selectionStartPoint, setSelectionStartPoint] = useState<Point>();
	const [selectionEndPoint, setSelectionEndPoint] = useState<Point>();

	const [mappedImageData, setMappedImageData] = useState<ImageData>();

	useEffect(() => {
		if (!image || !hslCanvas) return;

		const rgbMapper = ({r, g, b}: Rgb) => {
			const {h, s, l} = Color.rgbToHsl({r, g, b});
			const modifiedHsl = {h, s, l};
		
			const minHue = hueStep * selectedHueRangeIndex;
			const maxHue = minHue + hueStep;
		
			if (h >= minHue && h < maxHue) {
				const factor = s 
					* easeSymmetrically(l, 0, 1) 
					* easeSymmetrically(h, minHue, maxHue); 
				modifiedHsl.h = (360 + h + hueModifier) % 360;
				modifiedHsl.s = clamp(s + saturationModifier * factor, 0, 1);
				modifiedHsl.l = clamp(l + lightnessModifier * factor, 0, 1);
			}
		
			return Color.hslToRgb(modifiedHsl);
		};

		const hslCanvasContext = hslCanvas?.getContext('2d');
		const mappedImageData = getMappedImageData(hslCanvas, image, rgbMapper);
		setMappedImageData(mappedImageData);

		if (!hslCanvasContext || !mappedImageData) return;

		renderImageData(
			hslCanvasContext, 
			mappedImageData, 	
			selectionStartPoint,
			selectionEndPoint
		);
	}, [
		hueModifier, 
		saturationModifier, 
		lightnessModifier, 
		selectedHueRangeIndex,
	]);

	const selectionArea = selectionStartPoint && selectionEndPoint && {
		startPoint: selectionStartPoint,
		width: selectionEndPoint.x - selectionStartPoint.x,
		height: selectionEndPoint.y - selectionStartPoint.y,
	};

	useEffect(() => {
		if (!hslCanvas || !image) return;

		const hslCanvasContext = hslCanvas.getContext('2d');

		if (!selectionArea || !hslCanvasContext || !mappedImageData) return;

		hslCanvasContext.drawImage(
			image, 0, 0, hslCanvas.clientWidth, hslCanvas.clientHeight
		);
		
		renderImageData(
			hslCanvasContext, 
			mappedImageData, 	
			selectionStartPoint,
			selectionEndPoint,
		);
	}, [JSON.stringify(selectionArea), mappedImageData]);

	const [imageFile, setImageFile] = useState<File>();

	function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {	
		const fileReader = new FileReader();
		const fileList = event.target.files;

		if (!fileList) return;

		const imageFile = fileList[0];
		setImageFile(imageFile);
		fileReader.readAsDataURL(imageFile);

		const image = new Image();

		fileReader.addEventListener('load', () => {
			if (!isString(fileReader.result)) return;
			
			image.src = fileReader.result;
		});

		setImage(image);
	}

	function handleMouseMove(
		event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
	) {
		const context = event.currentTarget.getContext('2d');

		if (!context) return;

		const [r, g, b] = [...context.getImageData(
			event.nativeEvent.offsetX, 
			event.nativeEvent.offsetY,
			1, 1
		).data].slice(0, 3).map(component => Math.round(component));

		setColor(new Color({r, g, b}));
	}

	const renderedImportButton = <Button as='label'>
		Import
		<input
			type='file'
			className='w-full h-full hidden'
			accept='.jpg, .jpeg, .png'
			onChange={handleFileUpload}
		/>
	</Button>;

	return (
		<PageLayout meta={meta}>
			<Alert 
				type='success'
				isDisplayed={successAlertIsDisplayed}
				onClose={() => setSuccessAlertIsDisplayed(false)}
				closingTimeout={1500}
			>Image has been successfully loaded</Alert>
			{image ? (
				<div className='flex flex-col gap-5'>
					<ContentWrapper>
						<FigureContainer>
							<FigureWrapper>
								<div className='flex gap-10 self-end'>
									<Text size={5} weight={7}>Original</Text>
									{renderedImportButton}
								</div>
								{image && (
									<>
										<FigureCanvas
											ref={canvas => rgbCanvas = canvas}
											onMouseMove={handleMouseMove}
										/>
										<ColorComponents components={
												rgb as unknown as Record<string, number>
										}/>
									</>
								)}
							</FigureWrapper>
							<FigureWrapper>
								<div className='flex gap-10 self-start'>
									<Button
										as='a'
										onClick={event => {
											if (!hslCanvas || !imageFile) return;
											event.currentTarget.download = `${imageFile.name}`;
											event.currentTarget.href = hslCanvas.toDataURL();
										}}
									>Export</Button>
									<Text size={5} weight={7}>Modified</Text>
								</div>
								{image && (
									<>
										<div>
											<FigureCanvas
												ref={canvas => hslCanvas = canvas}
												onMouseMove={event => {
													if (isSelecting) setSelectionEndPoint({
														x: event.nativeEvent.offsetX,
														y: event.nativeEvent.offsetY,
													});
													handleMouseMove(event);
												}}
												onMouseDown={event => {
													setSelectionStartPoint({
														x: event.nativeEvent.offsetX,
														y: event.nativeEvent.offsetY,
													});
													setIsSelecting(true);
												}}
												onMouseUp={event => {
													setIsSelecting(false);
													setSelectionEndPoint({
														x: event.nativeEvent.offsetX,
														y: event.nativeEvent.offsetY,
													});
												}}
												onClick={() => {
													setSelectionStartPoint(undefined);
													setSelectionEndPoint(undefined);
												}}
											/>
										</div>
										<ColorComponents components={
												hsl as unknown as Record<string, number>
										}/>
									</>
								)}
							</FigureWrapper>
						</FigureContainer>
					</ContentWrapper>
					<div className='w-full flex flex-col gap-10 items-center'>
						<div className='w-full flex justify-between'>
							<ColorSelector
								colors={[...Array(360 / hueStep)].map((_, index) => {
									return `hsl(${
										hueStep * (index + 1) - hueStep / 2
									}, 100%, 50%)`;
								})}
								value={selectedHueRangeIndex}
								onChange={index => setSelectedHueRangeIndex(index)}
							/>
							<Slider
								title='Hue'
								range={[-360, 360]}
								step={10}
								value={hueModifier}
								onChange={value => setHueModifier(value)}
							/>
							<Slider
								title='Saturation'
								range={[-1, 1]}
								step={0.1}
								value={saturationModifier}
								onChange={value => setSaturationModifier(value)}
							/>
							<Slider
								title='Lightness'
								range={[-1, 1]}
								step={0.1}
								value={lightnessModifier}
								onChange={value => setLightnessModifier(value)}
							/>
						</div>
					</div>
				</div>
			) : (
				<div className='
					w-full h-full flex flex-col gap-20 items-center justify-center
				'>
					<Heading as='span' level={1}>
						Let&apos;s import an image to mess around with!
					</Heading>
					{renderedImportButton}
				</div>
			)}
		</PageLayout>
	);
};

export default ColorModelPage;
