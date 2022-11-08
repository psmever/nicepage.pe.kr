/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			Dancing: ['Dancing Script', 'cursive'],
			NanumSquare: ['NanumSquareRound', 'sans-serif'],
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
