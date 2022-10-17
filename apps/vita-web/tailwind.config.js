/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        screens: {
            xs: '375px',
            sm: '600px',
            md: '900px',
            lg: '1200px',
            xl: '1536px'
        },
        extend: {
            colors: {
                background: '#FCFCFC',
                'primary-900': '#052A3B',
                'primary-600': '#506A76',
                'primary-300': '#9BAAB1',
                'secondary-900': '#1F7A8F',
                'secondary-600': '#62A2B1',
                'secondary-300': '#A5CAD2',
                'secondary-100': '#E9F2F4',
                'accent-900': '#4D5861',
                'accent-600': '#869AAA',
                'accent-300': '#C0DCF3',
                'color-text': '#171718'
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out forwards'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 }
                }
            }
        }
    },
    plugins: []
}
