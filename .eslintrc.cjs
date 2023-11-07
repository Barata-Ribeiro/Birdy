module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
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
	parserOptions: {
		ecmaVersion: 11, // es2020 equivalente a ecmaVersion: 11
		sourceType: "module",
	},
	plugins: ["react-refresh", "react-hooks", "tailwindcss", "prettier"],
	rules: {
		"prettier/prettier": ["error", {}, { usePrettierrc: true }],
		"react-refresh/only-export-components": "off",
		"tailwindcss/classnames-order": "warn",
		"tailwindcss/no-custom-classname": "off",
		"tailwindcss/no-contradicting-classname": "error",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: ["tsconfig.json"],
			},
			plugins: ["@typescript-eslint"],
			extends: ["plugin:@typescript-eslint/recommended"],
			rules: {
				"@typescript-eslint/no-non-null-assertion": "off",
				"@typescript-eslint/no-unused-vars": "off",
			},
		},
		{
			files: ["*.js", "*.jsx"],
		},
	],
};
