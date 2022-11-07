import * as Slider from '@radix-ui/react-slider';
import styled from 'styled-components';

import {palette} from 'style';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SliderWrapper = styled(Slider.Root)`
  --slider-height: 1.3rem;

  position: relative;
  display: flex;
  width: 25rem;
  height: var(--slider-height);
  align-items: center;
`;

const Track = styled(Slider.Track)`
  position: relative;
  background: ${palette.peach};
  width: 100%;
  height: 100%;
  border-radius: 100vmax;
  overflow: hidden;
`;

const Range = styled(Slider.Range)`
  position: absolute;
  height: 100%;
  background: ${palette.orange};
  opacity: 0.5;
`;

const Thumb = styled(Slider.Thumb)`
  height: calc(var(--slider-height) * 2.7);
  aspect-ratio: 3 / 2;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100vmax;
  background: ${palette.red};
  outline: none;
  cursor: pointer;

  * {
    pointer-events: none;
  }
`;

export {Wrapper, SliderWrapper, Track, Range, Thumb};
