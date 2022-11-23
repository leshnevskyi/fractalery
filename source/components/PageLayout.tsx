import styled from 'styled-components';

import ModalTrigger from './ModalTrigger';
import Navigation from './Navigation';

const Wrapper = styled.div`
	position: relative;
	padding: 5rem 20rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100vh;
`;

interface Props {
	children: React.ReactNode,
	navigationIsDisplayed?: boolean,
	meta?: {
		title: string,
		description: React.ReactNode,
	}
}

const PageLayout = ({
	children, 
	navigationIsDisplayed = true,
	meta,
}: Props) => {
	return (
		<Wrapper>
			{meta && (
				<ModalTrigger 
					className='absolute right-40'
					modalContent={meta.description}
				>{meta.title}</ModalTrigger>
			)}
			{children}
			{navigationIsDisplayed && <Navigation/>}
		</Wrapper>
	);
};

export default PageLayout;
