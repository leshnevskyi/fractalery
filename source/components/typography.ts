import styled from 'styled-components';

import {palette} from 'style';

interface TextProps {
	size?: number;
	weight?: number;
  stretch?: string;
	color?: keyof typeof palette;
}

const Text = styled.span<TextProps>`
  font-family: 'SF Pro';
  font-size: var(--font-size-${({size = 1}) => size});
  font-weight: ${({weight = 4}) => weight * 100};
  font-stretch: ${({stretch = 'normal'}) => stretch};
  color: ${({color = 'orange'}) => palette[color]};
  background-color: transparent;

  & > * {
    display: inline;
    font-size: 0.6em;
  }
`;

interface HeadingProps {
	level: number;
}

const Heading = styled(Text).attrs(({level}: HeadingProps) => {
	return {as: `h${level ?? 1}`};
})<HeadingProps>`
  font-family: 'Erica One', sans-serif;
  font-size: var(--font-size-${({level = 1}) => 10 - level});
  font-weight: 900;
  line-height: 1em;
`;

export {Text, Heading};
