/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				mantis: {
					50: "hsl(94, 41%, 97%)",
					100: "hsl(100, 47%, 93%)",
					200: "hsl(101, 45%, 85%)",
					300: "hsl(102, 43%, 73%)",
					400: "hsl(102, 39%, 58%)",
					500: "hsl(102, 39%, 45%)",
					600: "hsl(103, 43%, 36%)",
					700: "hsl(103, 41%, 29%)",
					800: "hsl(103, 37%, 24%)",
					900: "hsl(105, 34%, 20%)",
					950: "hsl(107, 45%, 10%)",
				},
			},
			fontFamily: {
				heading: ["Montserrat", "sans"],
				body: ["Lora", "serif"],
			},
		},
	},
	plugins: [],
};
