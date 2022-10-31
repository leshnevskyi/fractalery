import styled from 'styled-components';

const Wrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

interface ColorProps {
	isSelected: boolean;
	color: string;
}

const Color = styled.div<ColorProps>`
	height: 7rem;
	aspect-ratio: 1 / 1;
	border-radius: 100vmax;
	border: 5px solid white;
	background: ${({color}) => color};
	opacity: ${({isSelected}) => isSelected ? 1 : 0.9};
	transform: scale(${({isSelected}) => isSelected ? 1 : 0.7});
	transition: 0.5s;
	
	&:hover {
		transform: scale(1);
	}
`;

interface Props {
	value: number;
	onChange: (value: number) => void;
	colors: string[];
}

const ColorSelector = ({colors, value, onChange}: Props) => {
	const renderedColors = colors.map((color, index) => {
		return (
			<Color 
				key={color}
				color={color} 
				isSelected={value === index}
				onClick={() => onChange(index)}
			/>
		);
	});

	return (
		<Wrapper>
			{renderedColors}
		</Wrapper>
	);
};

export default ColorSelector;
