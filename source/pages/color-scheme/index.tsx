import {useState, useEffect, useCallback} from 'react';
import {isString, clamp} from 'lodash';
import BezierEasing from 'bezier-easing';

import {PageLayout, Text, Button, Slider, ColorSelector} from 'components';
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

function renderImage(
	canvas: HTMLCanvasElement, 
	image: HTMLImageElement,
	rgbMapper?: (rgb: Rgb) => Rgb,
) {
	canvas.style.aspectRatio = `${image.width} / ${image.height}`;
	setupCanvas(canvas);

	const context = canvas.getContext('2d');

	if (!context) return;

	context.drawImage(
		image, 0, 0, canvas.clientWidth, canvas.clientHeight
	);

	const imageData = context.getImageData(
		0, 0, canvas.clientWidth, canvas.clientHeight
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

	context.putImageData(imageData, 0, 0);
}

const ColorSchemePage = () => {
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

	useEffect(() => {
		image?.addEventListener('load', () => {			
			if (!image || !rgbCanvas || !hslCanvas) return;

			renderImage(rgbCanvas, image);
			renderImage(hslCanvas, image, rgb => Color.hslToRgb(Color.rgbToHsl(rgb)));
		});
	}, [image?.src]);

	const hueStep = 45;

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
				modifiedHsl.h = h + hueModifier * factor;
				modifiedHsl.s = clamp(s + saturationModifier * factor, 0, 1);
				modifiedHsl.l = clamp(l + lightnessModifier * factor, 0, 1);
			}
		
			return Color.hslToRgb(modifiedHsl);
		};

		renderImage(hslCanvas, image, rgbMapper);
	}, [
		hueModifier, 
		saturationModifier, 
		lightnessModifier, 
		selectedHueRangeIndex,
	]);

	function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {	
		const fileReader = new FileReader();
		const fileList = event.target.files;

		if (!fileList) return;

		const imageFile = fileList[0];
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

	return (
		<PageLayout>
			<ContentWrapper>
				<FigureContainer>
					<FigureWrapper>
						<div className='flex gap-10'>
							<Text size={5} weight={7}>Original</Text>
							<Button as='label'>
								Import
								<input
									type='file'
									className='w-full h-full hidden'
									accept='.jpg, .jpeg, .png'
									onChange={handleFileUpload}
								/>
							</Button>
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
						<div className='flex gap-10'>
							<Text size={5} weight={7}>Modified</Text>
							<Button>Export</Button>
						</div>
						{image && (
							<>
								<FigureCanvas
									ref={canvas => hslCanvas = canvas}
									onMouseMove={handleMouseMove}
								/>
								<ColorComponents components={
								hsl as unknown as Record<string, number>
								}/>
							</>
						)}
					</FigureWrapper>
				</FigureContainer>
			</ContentWrapper>
			<div className='w-full flex flex-col gap-10 items-center'>
				<div className='w-full mt-12 flex justify-between'>
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
				<ColorSelector
					colors={[...Array(360 / hueStep)].map((_, index) => {
						return `hsl(${hueStep * (index + 1) - hueStep / 2}, 100%, 50%)`;
					})}
					value={selectedHueRangeIndex}
					onChange={index => setSelectedHueRangeIndex(index)}
				/>
			</div>
		</PageLayout>
	);
};

export default ColorSchemePage;