import styled from 'styled-components';

import {palette} from 'style';

const Button = styled.button`
	position: relative;
	padding: 1rem 4rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 100vmax;
	background: ${palette.orange};
	color: ${palette.white};
	font-size: 2rem;
	font-weight: 700;
	cursor: pointer;
	transition: 0.3s;

	&:hover {
		background: ${palette.red};
	}
`;

export default Button;
