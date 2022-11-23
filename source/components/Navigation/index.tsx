import {NavLink} from 'react-router-dom';
import {titleCase} from 'title-case';
import classNames from 'classnames';

enum Routes {
	Fractal = '/fractal',
	ColorScheme = '/color-model',
	Transformations = '/transformations',
} 

const links = [
	{title: 'Fractal', to: Routes.Fractal},
	{title: 'Color model', to: Routes.ColorScheme},
	{title: 'Transformations', to: Routes.Transformations},
];

const Navigation = () => {
	const renderedLinks = links.map(({to, title}) => {
		return (
			<NavLink 
				key={to} 
				to={to}
				className={({isActive}) => classNames(
					'text-4xl font-extrabold',
					{
						'text-red': isActive,
						'text-peach': !isActive,
					},
				)}
			>{titleCase(title)}</NavLink>
		);
	});

	return (
		<div className='flex self-center gap-20 py-7 px-20 bg-white
			rounded-full shadow-lg shadow-orange/10
		'>
			{renderedLinks}
		</div>
	);
};

export default Navigation;
