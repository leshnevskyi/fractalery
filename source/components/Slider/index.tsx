import {Text} from '../typography';
import {Wrapper, SliderWrapper, Track, Range, Thumb} from './components';

interface Props {
	title?: string;
	range: [number, number];
	value: number;
	step?: number;
	onChange: (value: number) => void;
}

const Slider = ({title, range, step = 1, value, onChange}: Props) => {
	return (
		<Wrapper>
			<Text 
				size={5}
				color='red'
				stretch='expanded'
				weight={9}
			>{title}</Text>
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
					>{value}</Text>
				</Thumb>
			</SliderWrapper>
		</Wrapper>
	);
};

export default Slider;
