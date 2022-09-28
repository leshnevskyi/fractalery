import {createGlobalStyle} from 'styled-components';
import palette from './palette';

const Style = createGlobalStyle`
	* {
		box-sizing: border-box;
		font-size: large;
		margin: 0;
		padding: 0;
	}

	:root {
		--font-size-3: 1.6rem;
		--font-size-4: 2rem;
		--font-size-5: 3rem;
		--font-size-9: 9.6rem;

		font-size: 62.5%;
		background: ${palette.tuftbush};
	}

	root {
		height: 100vh;
		width: 100vw;
		display: block;
	}

	body {
		margin: 0;
		padding: 0;
	}
`;

export default Style;
