import {Text} from '../typography';
import {Wrapper, SliderWrapper, Track, Range, Thumb} from './components';
import ControlLabel from '../ControlLabel';

interface Props {
	title?: string;
	range: [number, number];
	value: number;
	suffix?: string;
	step?: number;
	onChange: (value: number) => void;
}

const Slider = ({title, range, step = 1, suffix, value, onChange}: Props) => {
	return (
		<Wrapper>
			<ControlLabel>{title}</ControlLabel>
			<SliderWrapper
				min={range[0]}
				max={range[1]}
				step={step}
				value={[value]}
				onValueChange={([value]) => onChange(value)}
			>
				<Track>
					<Range/>
				</Track>
				<Thumb>
					<Text
						size={3}
						color='tuftbush'
						stretch='expanded'
						weight={9}
					>{value}{suffix}</Text>
				</Thumb>
			</SliderWrapper>
		</Wrapper>
	);
};

export default Slider;
