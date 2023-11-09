module.exports = {
	root: true,
	env: { browser: true, node: true, esnext: true },
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
		"plugin:tailwindcss/recommended",
		"plugin:prettier/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parserOptions: { ecmaVersion: "latest", sourceType: "module" },
	settings: { react: { version: "18.2" } },
	plugins: ["react-refresh", "react-hooks", "tailwindcss", "prettier"],
	rules: {
		"prettier/prettier": ["error", {}, { usePrettierrc: true }],
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
		"tailwindcss/classnames-order": "warn",
		"tailwindcss/no-custom-classname": "off",
		"tailwindcss/no-contradicting-classname": "error",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
