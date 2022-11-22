import {Wrapper, ColorComponentWrapper} from './components';
import {Text} from 'components';

interface Props {
	components: Record<string, number>;
}

const ColorComponents = ({components}: Props) => {
	const renderedComponents = Object.entries(components)
		.map(([componentName, value]) => {
			return (
				<ColorComponentWrapper key={componentName}>
					<Text weight={7} color='red' className='uppercase'>
						{componentName}
					</Text>
					<Text weight={7}>{value}</Text>
				</ColorComponentWrapper>
			);
		});
	
	return (
		<Wrapper>
			{renderedComponents}
		</Wrapper>
	);
};

export default ColorComponents;
