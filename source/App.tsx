import {Style} from 'style';
import {
	LandingPage,
	FractalPage, 
	ColorModelPage, 
	TransformationsPage,
} from 'pages';

import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';

import 'style/index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <LandingPage/>,
	},
	{
		path: '/fractal',
		element: <FractalPage/>,
	},
	{
		path: '/color-model',
		element: <ColorModelPage/>,
	},
	{
		path: '/transformations',
		element: <TransformationsPage/>,
	},
]);

function App() {
	return (
		<>
			<Style/>
			<RouterProvider router={router}/>
		</>
	);
}

export default App;
