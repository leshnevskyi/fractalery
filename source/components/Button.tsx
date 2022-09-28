import styled from 'styled-components';

import {palette} from 'style';

const Button = styled.button`
	position: relative;
	justify-content: center;
	align-items: center;
	border-radius: 100vmax;
	background: ${palette.orange};
	color: ${palette.white};
`;

export default Button;
