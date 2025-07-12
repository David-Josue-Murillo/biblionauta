import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactNative from 'eslint-plugin-react-native'
import prettier from 'eslint-plugin-prettier'
import unusedImports from 'eslint-plugin-unused-imports'

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
      parser: typescriptParser, // Usa el parser de TypeScrip
      parserOptions: {
        ecmaVersion: 'latest', // Usa la versión más reciente de JavaScript
        sourceType: 'module', // Permite usar import/export
        ecmaFeatures: {
          jsx: true, // Permite usar JSX (React)
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
      '@typescript-eslint/no-unused-vars': 'error', //  ERROR si declaras variables que no usas
      '@typescript-eslint/no-explicit-any': 'warn', // AVISO si usas any (mejor ser específico con los tipos)
      '@typescript-eslint/explicit-function-return-type': 'off', // APAGADO - no obliga a poner el tipo de retorno en funciones
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-var-requires': 'error', //  ERROR si usas require() en lugar de import

      // React rules
      'react/jsx-uses-react': 'off', // APAGADO - En React 17+ no necesitas importar React
      'react/react-in-jsx-scope': 'off', // APAGADO - No necesitas import React en cada archivo
      'react/prop-types': 'off', // APAGADO - Usas TypeScript en lugar de PropTypes
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.jsx', '.tsx'] }, // ERROR - Solo permite JSX en archivos .jsx y .tsx
      ],

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error', // ERROR - Asegura que uses los hooks correctamente
      'react-hooks/exhaustive-deps': 'warn', // AVISO - Te avisa si olvidas dependencias en useEffect

      // React Native rules
      'react-native/no-unused-styles': 'error', // ERROR - No puedes tener estilos que no uses
      'react-native/split-platform-components': 'error', // ERROR - Separa componentes por plataforma (iOS/Android)
      'react-native/no-inline-styles': 'warn', // AVISO - Prefiere StyleSheet en lugar de estilos inline
      'react-native/no-color-literals': 'warn', // AVISO - Evita colores hardcodeados como '#FF0000'
      'react-native/no-raw-text': 'error', // ERROR - No permite texto sin componente <Text>

      // Import rules
      'no-unused-vars': 'off', // Disabled in favor of TypeScript version
      'unused-imports/no-unused-imports': 'error', // ERROR - Elimina imports que no usas
      'unused-imports/no-unused-vars': [
        'error', // ERROR - Variables no usadas son error
        {
          vars: 'all',
          varsIgnorePattern: '^_', // Ignora variables que empiecen con _ (ej: _unused)
          args: 'after-used',
          argsIgnorePattern: '^_', // Ignora argumentos que empiecen con _
        },
      ],

      // General rules
      'no-console': 'warn', // AVISO - Te avisa si usas console.log
      'no-debugger': 'error', //  ERROR - No puedes usar debugger
      'prefer-const': 'error', // ERROR - Usa const en lugar de let cuando sea posible
      'no-var': 'error', // ERROR - No uses var, usa let o const
      semi: ['error', 'never'], // ERROR - No uses punto y coma al final de las líneas

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
    /* Configuración Especial para Archivos Config */
    files: ['**/*.config.{js,mjs}', '**/*.config.ts'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
])
