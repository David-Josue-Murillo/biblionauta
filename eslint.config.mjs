import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactNative from 'eslint-plugin-react-native'
import prettier from 'eslint-plugin-prettier'
import unusedImports from 'eslint-plugin-unused-imports'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import security from 'eslint-plugin-security'

export default defineConfig([
  // Configuración base recomendada de ESLint
  js.configs.recommended,
  {
    // Archivos y directorios que se ignoran durante el análisis
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
      'expo-env.d.ts',
      'eas.json',
      'app.config.js',
      'app.config.ts',
      'assets/**/*',
      '__generated__/**/*',
    ],
    // Archivos que se analizarán
    files: ['**/*.{js,jsx,ts,tsx}'],
    // Configuración del parser de TypeScript
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    // Plugins habilitados para el análisis
    plugins: {
      '@typescript-eslint': typescript, // Reglas específicas para TypeScript
      react, // Reglas para React
      'react-hooks': reactHooks, // Reglas para hooks de React
      'react-native': reactNative, // Reglas específicas para React Native
      prettier, // Integración con Prettier
      'unused-imports': unusedImports, // Detección de imports no utilizados
      'jsx-a11y': jsxA11y, // Reglas de accesibilidad
      security, // Reglas de seguridad
    },
    // Reglas de linting configuradas
    rules: {
      // ===== REGLAS DE TYPESCRIPT =====
      '@typescript-eslint/no-unused-vars': 'error', // Error si hay variables no utilizadas
      '@typescript-eslint/no-explicit-any': 'warn', // Advertencia al usar 'any'
      '@typescript-eslint/explicit-function-return-type': 'off', // No requiere tipos de retorno explícitos
      '@typescript-eslint/explicit-module-boundary-types': 'off', // No requiere tipos en límites de módulos
      '@typescript-eslint/no-inferrable-types': 'off', // Permite tipos inferibles
      '@typescript-eslint/no-var-requires': 'error', // Prohíbe require() en favor de import
      '@typescript-eslint/prefer-optional-chain': 'warn', // Sugiere encadenamiento opcional
      '@typescript-eslint/prefer-nullish-coalescing': 'warn', // Sugiere operador nullish coalescing

      // ===== REGLAS DE REACT =====
      'react/jsx-uses-react': 'off', // Desactivado para React 17+
      'react/react-in-jsx-scope': 'off', // Desactivado para React 17+
      'react/prop-types': 'off', // No requiere PropTypes (usamos TypeScript)
      'react/jsx-props-no-spreading': 'off', // Permite spread de props
      'react/require-default-props': 'off', // No requiere props por defecto
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.jsx', '.tsx'] },
      ], // Solo permite JSX en archivos .jsx/.tsx
      'react/jsx-no-bind': 'warn', // Advertencia al usar bind en JSX
      'react/no-array-index-key': 'warn', // Advertencia al usar índice como key
      'react/no-unstable-nested-components': 'error', // Error en componentes anidados inestables
      'react/jsx-no-useless-fragment': 'warn', // Advertencia en fragmentos innecesarios
      'react/jsx-boolean-value': 'warn', // Advertencia en valores booleanos explícitos

      // ===== REGLAS DE REACT HOOKS =====
      'react-hooks/rules-of-hooks': 'error', // Error si se violan las reglas de hooks
      'react-hooks/exhaustive-deps': 'warn', // Advertencia en dependencias faltantes

      // ===== REGLAS DE REACT NATIVE =====
      'react-native/no-unused-styles': 'error', // Error en estilos no utilizados
      'react-native/split-platform-components': 'error', // Error en componentes no separados por plataforma
      'react-native/no-inline-styles': 'error', // Error en estilos inline
      'react-native/no-color-literals': 'error', // Error en literales de color
      'react-native/no-raw-text': 'error', // Error en texto sin componente Text
      'react-native/sort-styles': 'warn', // Advertencia para ordenar estilos
      'react-native/no-single-element-style-arrays': 'warn', // Advertencia en arrays de estilo con un elemento

      // ===== REGLAS DE ACCESIBILIDAD =====
      'jsx-a11y/accessible-emoji': 'error', // Error en emojis sin accesibilidad
      'jsx-a11y/alt-text': 'error', // Error en imágenes sin alt
      'jsx-a11y/anchor-has-content': 'error', // Error en enlaces sin contenido
      'jsx-a11y/no-autofocus': 'warn', // Advertencia en autofocus

      // ===== REGLAS DE SEGURIDAD =====
      'security/detect-object-injection': 'error', // Error en inyección de objetos
      'security/detect-non-literal-require': 'warn', // Advertencia en require dinámico
      'security/detect-possible-timing-attacks': 'warn', // Advertencia en posibles ataques de timing

      // ===== REGLAS DE IMPORTS =====
      'no-unused-vars': 'off', // Desactivado en favor de la versión de TypeScript
      'unused-imports/no-unused-imports': 'error', // Error en imports no utilizados
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all', // Todas las variables
          varsIgnorePattern: '^_', // Ignora variables que empiecen con _
          args: 'after-used', // Argumentos después del último usado
          argsIgnorePattern: '^_', // Ignora argumentos que empiecen con _
        },
      ], // Error en variables no utilizadas
      'no-duplicate-imports': 'error', // Error en imports duplicados
      'sort-imports': [
        'warn',
        {
          ignoreCase: true, // Ignora mayúsculas/minúsculas
          ignoreDeclarationSort: true, // Ignora orden de declaraciones
        },
      ], // Advertencia para ordenar imports

      // ===== REGLAS DE CALIDAD DE CÓDIGO =====
      complexity: ['warn', { max: 10 }], // Advertencia si complejidad > 10
      'max-depth': ['warn', { max: 4 }], // Advertencia si anidación > 4
      'max-lines-per-function': ['warn', { max: 50 }], // Advertencia si función > 50 líneas
      'max-params': ['warn', { max: 4 }], // Advertencia si parámetros > 4
      'no-magic-numbers': ['warn', { ignore: [-1, 0, 1, 2] }], // Advertencia en números mágicos
      'prefer-template': 'error', // Error: preferir template literals

      // ===== REGLAS GENERALES =====
      'no-console': 'warn', // Advertencia en console.log
      'no-debugger': 'error', // Error en debugger
      'prefer-const': 'error', // Error: preferir const sobre let
      'no-var': 'error', // Error en var (usar let/const)
      semi: ['error', 'never'], // Error: no usar punto y coma
      quotes: ['error', 'single'], // Error: usar comillas simples
      'comma-dangle': ['error', 'always-multiline'], // Error: coma final en multilínea

      // ===== INTEGRACIÓN CON PRETTIER =====
      'prettier/prettier': [
        'error',
        {
          singleQuote: true, // Comillas simples
          semi: false, // Sin punto y coma
          trailingComma: 'all', // Coma final en todo
          printWidth: 80, // Ancho máximo de línea
          tabWidth: 2, // Ancho de tabulación
        },
      ],
    },
    // Configuración específica para React
    settings: {
      react: {
        version: 'detect', // Detecta automáticamente la versión
      },
    },
  },
  // Configuración específica para archivos de test
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    rules: {
      'no-console': 'off', // Permite console en tests
      '@typescript-eslint/no-explicit-any': 'off', // Permite any en tests
      'react-native/no-raw-text': 'off', // Permite texto sin Text en tests
      'no-magic-numbers': 'off', // Permite números mágicos en tests
    },
  },
  // Configuración específica para archivos de configuración
  {
    files: ['**/*.config.{js,mjs}', '**/*.config.ts', '.prettierrc.*'],
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
    rules: {
      '@typescript-eslint/no-var-requires': 'off', // Permite require en configs
      'no-console': 'off', // Permite console en configs
      '@typescript-eslint/prefer-optional-chain': 'off', // Desactiva regla que requiere tipos
      '@typescript-eslint/prefer-nullish-coalescing': 'off', // Desactiva regla que requiere tipos
    },
  },
])
