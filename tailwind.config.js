/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        '2xs': '375px',
      }
    },
  },
  plugins: [],
}

