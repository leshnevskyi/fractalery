/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./source/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				red: '#FF0000',
				orange: '#FF6400',
				peach: '#ffa064',
				tuftbush: '#FFE1CD',
				white: '#FFFFFF',
			},
		},
	},
	plugins: [],
};
