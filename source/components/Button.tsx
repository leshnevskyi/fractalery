import styled from 'styled-components';

import {palette} from 'style';

const Button = styled.button`
	position: relative;
	padding: 0.5rem 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 100vmax;
	background: ${palette.orange};
	color: ${palette.white};
	font-weight: 700;
`;

export default Button;
