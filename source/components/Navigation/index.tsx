import {NavLink} from 'react-router-dom';
import {titleCase} from 'title-case';
import classNames from 'classnames';

enum Routes {
	Fractal = '/fractal',
	ColorScheme = '/color-scheme',
	Transformations = '/transformations',
} 

const links = [
	{title: 'Fractal', to: Routes.Fractal},
	{title: 'Color scheme', to: Routes.ColorScheme},
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
		<div className='flex self-center gap-20'>
			{renderedLinks}
		</div>
	);
};

export default Navigation;
