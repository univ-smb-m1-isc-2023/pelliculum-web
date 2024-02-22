/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
    theme: {
        extend: {
            screens: {
                '3xl': '1600px',
                '2xl': '1440px',
                xs: '320px'
            },
            colors: {
                primary: '#C8291E',
                secondary: '#161616',
                black: '#100F10',
                white: '#FDFDFD',
                cinema: '#C8291E',
                'custom-border': 'rgba(255, 255, 255, 0.3)',
                'custom-light-border': 'rgba(255, 255, 255, 0.1)'
            },
            width: {
                '1/48': '2.083333%',
                '2/48': '4.166667%',
                '3/48': '6.25%',
                '4/48': '8.333333%',
                '5/48': '10.416667%',
                '6/48': '12.5%',
                '7/48': '14.583333%',
                '8/48': '16.666667%',
                '9/48': '18.75%',
                '10/48': '20.833333%',
                '11/48': '22.916667%',
                '12/48': '25%',
                '13/48': '27.083333%',
                '14/48': '29.166667%',
                '15/48': '31.25%',
                '16/48': '33.333333%',
                '17/48': '35.416667%',
                '18/48': '37.5%',
                '19/48': '39.583333%',
                '20/48': '41.666667%',
                '21/48': '43.75%',
                '22/48': '45.833333%',
                '23/48': '47.916667%',
                '24/48': '50%',
                '25/48': '52.083333%',
                '26/48': '54.166667%',
                '27/48': '56.25%',
                '28/48': '58.333333%',
                '29/48': '60.416667%',
                '30/48': '62.5%',
                '31/48': '64.583333%',
                '32/48': '66.666667%',
                '33/48': '68.75%',
                '34/48': '70.833333%',
                '35/48': '72.916667%',
                '36/48': '75%',
                '37/48': '77.083333%',
                '38/48': '79.166667%',
                '39/48': '81.25%',
                '40/48': '83.333333%',
                '41/48': '85.416667%',
                '42/48': '87.5%',
                '43/48': '89.583333%',
                '44/48': '91.666667%',
                '45/48': '93.75%',
                '46/48': '95.833333%',
                '47/48': '97.916667%'
            }
        }
    },
    plugins: [require('rippleui')],
    rippleui: {
        themes: [
            {
                themeName: 'dark',
                prefersColorScheme: 'dark',
                colorScheme: 'dark',
                primary: '#C8291E',
                secondary: '#161616',
                black: '#100F10',
                white: '#FDFDFD',
                'custom-border': 'rgba(255, 255, 255, 0.3)',
                'custom-light-border': 'rgba(255, 255, 255, 0.1)'
            }
        ]
    }
};
