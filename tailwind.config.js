/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			borderRadius: {
				sm: '0.2rem',
				md: '0.2rem',
				lg: '0.2rem',
			},
		},
	},
	plugins: [require('flowbite/plugin')],
};
