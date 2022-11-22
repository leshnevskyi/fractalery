import styled from 'styled-components';

const ContentWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	gap: 2rem;
`;

const FigureContainer = styled.div`
	display: flex;
	gap: 0.5rem;
`;

const FigureWrapper = styled.div`
	display: flex;
	min-width: 30rem;
	flex: 1;
	flex-direction: column;
	align-items: center;
	gap: 1.5rem;
`;

const FigureCanvas = styled.canvas`
	height: 53vh;
	aspect-ratio: 3 / 2;
	background: white;
`;

export {
	ContentWrapper,
	FigureContainer,
	FigureWrapper,
	FigureCanvas,
};
export {default as ColorComponents} from './ColorComponents';
