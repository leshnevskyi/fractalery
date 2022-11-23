import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

interface Props {
	children: React.ReactNode,
	title: string,
	className?: string,
}

const Tooltip = ({children, title, className}: Props) => {
	const [isHovered, setIsHovered] = useState(false);
	
	return (
		<div 
			className={`relative ${className} flex w-max justify-center`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{children}
			<AnimatePresence>
				{isHovered && (
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						className='
							py-3 px-10 bg-white absolute -bottom-2 translate-y-full 
							rounded-full text-orange font-bold shadow-lg shadow-orange/10
							text-2xl whitespace-nowrap
						'
					>{title}</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Tooltip;
