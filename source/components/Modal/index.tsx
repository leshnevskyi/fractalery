import {createPortal} from 'react-dom';
import {AnimatePresence, motion} from 'framer-motion';

import Button from '../Button';

import {modalContainerElement} from 'containerElements';

interface Props {
	children?: React.ReactNode,
	isOpen: boolean,
	onClose: () => void,
}

const Modal = ({children, isOpen, onClose}: Props) => {
	return createPortal(
		<AnimatePresence>
			{isOpen && (	
				<motion.div 
					initial={{x: '50vw'}}
					animate={{x: 0}}
					exit={{x: '50vw'}}
					transition={{duration: 0.7, type: 'spring'}}
					className='
						absolute right-40 top-60 bottom-60 w-1/3 bg-white rounded-[3rem]
						shadow-2xl shadow-white/50 backdrop-blur-xl bg-opacity-80 font-bold
						flex flex-col items-center p-20 text-stone-600 text-justify 
					'
				>
					{children}
					<div className='absolute bottom-10'>
						<Button
							onClick={onClose}
						>Got it!</Button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>,
		modalContainerElement
	);
};

export default Modal;
