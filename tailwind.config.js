/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  theme: {
    extend: {
      colors : {
        primary: '#C8291E',
        secondary: '#161616',
        black: '#100F10',
        white: '#FDFDFD',
      }
    },
  },
  plugins: [],
}

