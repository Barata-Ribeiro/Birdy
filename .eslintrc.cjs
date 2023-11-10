module.exports = {
	root: true,
	env: { browser: true, node: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
		"plugin:import/recommended",
		"plugin:tailwindcss/recommended",
		"plugin:prettier/recommended",
		"eslint-config-prettier",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: { react: { version: "18.2" } },
	plugins: [
		"react-refresh",
		"react-hooks",
		"tailwindcss",
		"prettier",
		"import",
	],
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
		"import/resolver": {
			node: {
				paths: ["src"],
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		},
	},
};
