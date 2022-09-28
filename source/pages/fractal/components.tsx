import styled from 'styled-components';

import {Text} from 'components';

const FractalSection = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5rem;
`;

const Canvas = styled.canvas`
  width: 100vh;
  height: 50vh;
  margin-right: -20rem;
`;

const ControlContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 7rem;
`;

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.7rem;
`;

const ControlLabel = styled(Text).attrs({
	size: 5,
	color: 'red',
	stretch: 'expanded',
	weight: 9,
})`
  display: flex;
  align-items: center;
`;

export {FractalSection, Canvas, ControlContainer, ControlWrapper, ControlLabel};
