import {useState} from 'react';

import {
	FractalSection, 
	Canvas, 
	ControlContainer, 
	ControlWrapper,
	ControlLabel,
} from './components';
import {
	PageLayout,
	Heading,
	Slider,
	ColorSelector,
	NumberInput,
} from 'components';


import {Complex} from 'packages/math';

const FractalPage = () => {
	const [scaleValue, setScaleValue] = useState(1);
	const [exponent, setExponent] = useState(3);
	const [constant, setConstant] = useState(new Complex(-1, 4));

	const colors = ['black', 'blue', 'red'];
	const [colorIndex, setColorIndex] = useState(0);

	return (
		<PageLayout>
			<Heading as='span' level={1}>f(z) = z<sup>k</sup> + c</Heading>
			<FractalSection>
				<ControlContainer>
					<Slider 
						title='K value' 
						range={[3, 5]} 
						value={exponent} 
						onChange={value => {
							setExponent(value);
						}}
					/>
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
					<Slider
						title='Scale'
						range={[1, 2]}
						step={0.5}
						value={scaleValue}
						onChange={value => {
							setScaleValue(value);
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
			</FractalSection>
		</PageLayout>
	);
};

export default FractalPage;
