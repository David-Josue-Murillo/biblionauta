/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './app/index.tsx',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  // eslint-disable-next-line no-undef
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
}
