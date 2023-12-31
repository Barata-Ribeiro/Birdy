/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			container: {
				center: true,
			},
			screens: {
				xs: "320px",
			},
			colors: {
				mantis: {
					50: "hsl(94, 41%, 97%)",
					100: "hsl(100, 47%, 93%)",
					200: "hsl(101, 45%, 85%)",
					300: "hsl(102, 43%, 73%)",
					400: "hsl(102, 39%, 58%)",
					500: "hsl(102, 39%, 45%)",
					600: "hsl(103, 43%, 36%)", // primary
					700: "hsl(103, 41%, 29%)",
					800: "hsl(103, 37%, 24%)",
					900: "hsl(105, 34%, 20%)",
					950: "hsl(107, 45%, 10%)",
				},
				"bright-turquoise": {
					50: "hsl(200, 100%, 97%)",
					100: "hsl(198, 94%, 94%)",
					200: "hsl(195, 94%, 86%)",
					300: "hsl(194, 95%, 74%)",
					400: "hsl(193, 93%, 60%)",
					500: "hsl(193, 89%, 49%)",
					600: "hsl(195, 98%, 39%)", // secondary
					700: "hsl(196, 96%, 32%)",
					800: "hsl(195, 90%, 27%)",
					900: "hsl(197, 80%, 24%)",
					950: "hsl(198, 80%, 16%)",
				},
				"green-spring": {
					50: "hsl(60, 6%, 97%)",
					100: "hsl(120, 5%, 93%)",
					200: "hsl(105, 5%, 85%)",
					300: "hsl(105, 6%, 75%)",
					400: "hsl(105, 6%, 58%)",
					500: "hsl(106, 6%, 45%)",
					600: "hsl(104, 6%, 36%)", // neutral
					700: "hsl(100, 6%, 29%)",
					800: "hsl(111, 6%, 24%)",
					900: "hsl(108, 5%, 20%)",
					950: "hsl(100, 6%, 10%)",
				},
			},
			fontFamily: {
				heading: ["Montserrat", "sans"],
				body: ["Lora", "serif"],
			},
			animation: {
				pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				skeleton: "skeleton 1.5s infinite linear",
			},
			keyframes: {
				skeleton: {
					"0%": { backgroundPosition: "0px" },
					"100%": { backgroundPosition: "-200%" },
				},
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
