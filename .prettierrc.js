module.exports = {
  // Usar espacios en lugar de tabs para indentación
  useTabs: false,
  // Número de espacios por nivel de indentación
  tabWidth: 2,
  // No usar punto y coma al final de las líneas
  semi: false,
  // Usar comillas simples en lugar de dobles
  singleQuote: true,
  // Agregar coma final en objetos y arrays multilínea
  trailingComma: 'es5',
  // Ancho máximo de línea antes de hacer wrap
  printWidth: 80,
  // Agregar espacios entre llaves en objetos
  bracketSpacing: true,
  // Colocar el > de JSX en la misma línea
  bracketSameLine: false,
  // Omitir paréntesis en arrow functions con un solo parámetro
  arrowParens: 'avoid',
  // Usar LF (Linux/Mac) para saltos de línea
  endOfLine: 'lf',
  // Plugins adicionales para formateo
  plugins: ['prettier-plugin-tailwindcss'],
}
