import styled from 'styled-components';

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
`;

const ControlContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.7rem;
`;

export {FractalSection, Canvas, ControlContainer, ControlWrapper};
