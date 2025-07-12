import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import prettier from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

export default defineConfig([
	js.configs.recommended,
	{
		ignores: [
			'node_modules/',
			'dist/',
			'build/',
			'.expo/',
			'.expo-shared/',
			'web-build/',
			'android/',
			'ios/',
			'*.generated.*',
			'*.min.js',
			'babel.config.js',
			'metro.config.js',
			'tailwind.config.js',
			'package-lock.json',
			'yarn.lock',
		],
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			'@typescript-eslint': typescript,
			react,
			'react-hooks': reactHooks,
			'react-native': reactNative,
			prettier,
			'unused-imports': unusedImports,
		},
		rules: {
			// TypeScript rules
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-inferrable-types': 'off',
			'@typescript-eslint/no-var-requires': 'error',

			// React rules
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/jsx-props-no-spreading': 'off',
			'react/require-default-props': 'off',
			'react/jsx-filename-extension': [
				'error',
				{ extensions: ['.jsx', '.tsx'] },
			],

			// React Hooks rules
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			// React Native rules
			'react-native/no-unused-styles': 'error',
			'react-native/split-platform-components': 'error',
			'react-native/no-inline-styles': 'warn',
			'react-native/no-color-literals': 'warn',
			'react-native/no-raw-text': 'off',

			// Import rules
			'no-unused-vars': 'off', // Disabled in favor of TypeScript version
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'error',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],

			// General rules
			'no-console': 'warn',
			'no-debugger': 'error',
			'prefer-const': 'error',
			'no-var': 'error',

			// Prettier integration
			'prettier/prettier': 'error',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	{
		files: ['**/*.config.{js,mjs}', '**/*.config.ts'],
		rules: {
			'@typescript-eslint/no-var-requires': 'off',
		},
	},
]);
