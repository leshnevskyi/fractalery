import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';

const containerElement = document.createElement('root');

createRoot(containerElement).render(
	<StrictMode>
		<App/>
	</StrictMode>
);

document.body.appendChild(containerElement);
