import styled from 'styled-components';

const Svg = styled.svg`
	height: 15rem;
	transform: scaleX(-1);
`;

interface CircleProps {
	isSelected: boolean;
}

const Circle = styled.circle<CircleProps>`
	opacity: ${({isSelected}) => isSelected ? 1 : 0.2};
	transition: 0.3s;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}
`;

export {Svg, Circle};
