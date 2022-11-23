import {useEffect} from 'react';
import {createPortal} from 'react-dom';
import {AnimatePresence, motion} from 'framer-motion';

import {modalContainerElement} from 'containerElements';

interface Props {
	isDisplayed: boolean,
	closingTimeout?: number,
	children: React.ReactNode,
	onClose?: () => void,
	type: 'success' | 'warning' | 'error',
}

const WarningIcon = () => {
	return (
		<svg 
			fill='none' 
			viewBox='0 0 24 24' 
			strokeWidth='1.5' 
			stroke='currentColor'
			className='stroke-orange' 
		>
			<path 
				strokeLinecap='round'
				strokeLinejoin='round' 
				d='
					M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 
					0118 0zm-9 3.75h.008v.008H12v-.008z
				'
			/>
		</svg>
	);
};

const SuccessIcon = () => {
	return (
		<svg fill='none'
			viewBox='0 0 24 24'
			strokeWidth='1.5'
			stroke='currentColor'
			className='stroke-green-500'
		>
			<path 
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
			/>
		</svg>
	);
};

const ErrorIcon = () => {
	return (
		<svg 
			fill='none' 
			viewBox='0 0 24 24' 
			strokeWidth='1.5' 
			stroke='currentColor' 
			className='stroke-red'
		>
			<path 
				strokeLinecap='round' 
				strokeLinejoin='round' 
				d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
			/>
		</svg>
	);
};

const renderedIcons = {
	success: <SuccessIcon/>,
	warning: <WarningIcon/>,
	error: <ErrorIcon/>,
};

const color = {
	success: 'green-500',
	warning: 'orange',
	error: 'red',
};

const Alert = ({
	children, type, isDisplayed, onClose, closingTimeout,
}: Props) => {
	useEffect(() => {
		if (!isDisplayed || closingTimeout === undefined || !onClose) return;

		const timeoutId = setTimeout(onClose, closingTimeout);

		return () => clearTimeout(timeoutId);
	}, [isDisplayed]);

	return createPortal(
		<AnimatePresence>
			{isDisplayed && (
				<motion.div 
					className={`
						absolute top-10 left-1/2 -translate-x-1/2 bg-white rounded-full
						text-${color[type]} font-medium shadow-lg shadow-orange/10 
						py-5 px-10 bg-opacity-80 flex gap-5 items-center
					`}
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
				>
					<div className='w-14'>{renderedIcons[type]}</div>
					{children}
				</motion.div>
			)}
		</AnimatePresence>,
		modalContainerElement
	);
};

export default Alert;
