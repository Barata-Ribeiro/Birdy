module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"plugin:prettier/recommended",
		"plugin:tailwindcss/recommended",
	],
	ignorePatterns: [
		"dist",
		".eslintrc.cjs",
		"vite.config.ts",
		"tailwind.config.js",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: ["tsconfig.json"],
	},
	plugins: ["react-refresh", "react-hooks", "tailwindcss", "prettier"],
	rules: {
		"prettier/prettier": ["error", {}, { usePrettierrc: true }],
		"react-refresh/only-export-components": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"tailwindcss/classnames-order": "warn",
		"tailwindcss/no-custom-classname": "warn",
		"tailwindcss/no-contradicting-classname": "error",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
