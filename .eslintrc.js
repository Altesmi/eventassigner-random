module.exports = {
	root: true,

	parser: '@typescript-eslint/parser', // or 'babel-eslint'

	plugins: [
		'eslint-plugin-jest',
		'eslint-plugin-node',
		'eslint-plugin-prettier',
		'eslint-plugin-promise',
		'eslint-plugin-standard',
		'eslint-plugin-import',
		'@typescript-eslint',
	],

	extends: [
		'eslint-config-standard-with-typescript',
		'eslint-config-prettier',
		'eslint-config-prettier/standard',
		'eslint-config-prettier/@typescript-eslint',
		'plugin:eslint-plugin-eslint-comments/recommended',
		'plugin:eslint-plugin-jest/recommended',
		'plugin:eslint-plugin-import/errors',
		'plugin:eslint-plugin-import/typescript',
	],

	ignorePatterns: ['node_modules', 'lib'],

	parserOptions: {
		sourceType: 'module',
		impliedStrict: true,
		project: ['./tsconfig.json'],
	},

	env: {
		node: true,
		jest: true,
	},

	rules: {
		// eslint
		'no-param-reassign': 'error',
		'no-console': 'error',

		// eslint-plugin-prettier
		'prettier/prettier': 'error',

		// eslint-plugin-eslint-comments
		'eslint-comments/no-unused-disable': 'error',

		// @typescript-eslint
		'@typescript-eslint/ban-ts-comment': 'error',
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/strict-boolean-expressions': 'off', // Forces unwanted code style
		'@typescript-eslint/restrict-template-expressions': 'off', // Requires typing catch(e) every time
		'@typescript-eslint/restrict-plus-operands': 'off', // Doesn't support dynamic object occurance counting

		'import/no-cycle': 'error',
	},
};
