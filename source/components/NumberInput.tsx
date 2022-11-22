import styled from 'styled-components';

import {palette} from 'style';

const Wrapper = styled.input.attrs({type: 'number'})`
	background: transparent;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 8rem;
	height: 4rem;
	border: 2px solid ${palette.red};
	font-weight: inherit;
	color: inherit;
	border-radius: 100vmax;

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		appearance: none;
		margin: 0;
	}
`;

interface Props {
	value: number;
	onChange: (value: number) => void;
}

const NumberInput = ({value, onChange}: Props) => {
	return (
		<Wrapper 
			value={value}
			onChange={event => onChange(event.target.valueAsNumber)}
			style={{fontSize: '2rem'}}
		/>
	);
};

export default NumberInput;
