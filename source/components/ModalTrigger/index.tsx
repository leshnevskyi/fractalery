import {useState} from 'react';

import Modal from '../Modal';

import foxImageUrl from 'assets/fox.png';

interface Props {
	className?: string,
	children: React.ReactNode,
	modalContent: React.ReactNode,
}

const ModalTrigger = ({className, children, modalContent}: Props) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	return (
		<>
			<div 
				onClick={() => setModalIsOpen(true)}
				className={`
					rounded-full border-2 border-white font-display text-4xl text-orange
					py-3 px-8 pr-28 cursor-pointer hover:bg-white duration-300 
					flex items-center group ${className} z-20
				`}
			>
				{children}
				<img 
					className='
						absolute h-[170%] -right-10 group-hover:rotate-6 
						group-hover:scale-[1.2] duration-300
					'
					src={foxImageUrl}
				/>
			</div>
			<Modal 
				isOpen={modalIsOpen}
				onClose={() => setModalIsOpen(false)}
			>{modalContent}</Modal>
		</>
	);
};

export default ModalTrigger;
