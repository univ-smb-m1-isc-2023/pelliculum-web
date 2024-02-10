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
        'custom-border': 'rgba(255, 255, 255, 0.5)',
        'custom-light-border': 'rgba(255, 255, 255, 0.1)',

      },
    },
  },
  plugins: [],
}

