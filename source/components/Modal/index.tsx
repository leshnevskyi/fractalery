import {createPortal} from 'react-dom';

import {modalContainerElement} from 'containerElements';

const Modal = () => {
	return createPortal(
		<div className='w-screen h-screen fixed flex items-center justify-center'>
			
		</div>,
		modalContainerElement
	);
};

export default Modal;
