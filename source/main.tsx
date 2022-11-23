import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import App from './App';

import {appContainerElement, modalContainerElement} from './containerElements';

createRoot(appContainerElement).render(
	<StrictMode>
		<App/>
	</StrictMode>
);

document.body.appendChild(appContainerElement);
document.body.appendChild(modalContainerElement);
