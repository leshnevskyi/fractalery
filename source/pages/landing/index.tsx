import {NavLink} from 'react-router-dom';

import {PageLayout} from 'components';
import {ReactComponent as ArrowIcon} from 'assets/arrow.svg';

import foxImageUrl from 'assets/fox.png';

const LandingPage = () => {
	return (
		<PageLayout navigationIsDisplayed={false}>
			<div className='
				h-full -mt-20 flex flex-col justify-center gap-32 text-orange 
				font-display
			'>
				<span className='text-9xl'>Hey u!</span>
				<span className='text-9xl'>
					Wanna learn
					<br/>
					computer graphics?
				</span>
				<span className='text-9xl'>
					Go ahead!
					<NavLink 
						to='/fractal' 
						className='
							relative align-middle ml-32 -top-2
						'
					>
						<ArrowIcon 
							className='
								inline rotate-90 w-32 text-red hover:text-orange 
								hover:scale-[1.05] duration-300
							'/>
					</NavLink>
				</span>
			</div>
			<img 
				src={foxImageUrl}
				className='absolute w-[50vmin] right-[10%] rotate-6 bottom-[25%]'
			/>
		</PageLayout>
	);
};

export default LandingPage;
