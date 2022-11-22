import styled from 'styled-components';

import {Text} from './typography';

const ControlLabel = styled(Text).attrs({
	color: 'red',
	stretch: 'expanded',
	weight: 9,
})`
	font-size: 2.3rem;
	font-family: 'SF Pro';
  display: flex;
  align-items: center;
`;

export default ControlLabel;
