import {useEffect} from 'react';
import {createPortal} from 'react-dom';
import {AnimatePresence, motion} from 'framer-motion';

import {modalContainerElement} from 'containerElements';

import {ReactComponent as SuccessIcon} from 'assets/checkmark.svg';
import {ReactComponent as WarningIcon} from 'assets/warning.svg';
import {ReactComponent as ErrorIcon} from 'assets/error.svg';

interface Props {
	isDisplayed: boolean,
	closingTimeout?: number,
	children: React.ReactNode,
	onClose?: () => void,
	type: 'success' | 'warning' | 'error',
}

const renderedIcons = {
	success: <SuccessIcon/>,
	warning: <WarningIcon/>,
	error: <ErrorIcon/>,
};

const color = {
	success: 'text-green-500',
	warning: 'text-orange',
	error: 'text-red',
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
						${color[type]} font-medium shadow-lg shadow-orange/10 
						py-5 px-10 bg-opacity-90 flex gap-5 items-center
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
