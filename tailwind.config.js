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
        'custom-border': 'rgba(255, 255, 255, 0.3)',
        'custom-light-border': 'rgba(255, 255, 255, 0.1)',

      },
      screens: {
        'xs': '320px',
        '2xs': '375px',
      }
    },
  },
  plugins: [],
}

