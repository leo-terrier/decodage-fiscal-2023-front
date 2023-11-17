import type { Config } from 'tailwindcss' // Tailwind Types for TS

const config: Config = {
    content: [
        //'./pages/**/*.{js,ts,jsx,tsx,mdx}',
        //'./components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                // colors ui website : https://uicolors.app/create
                orange: {
                    light: '#fce6d8',
                    md: '#f8c3b1',
                    dark: '#EF7B54',
                    flame: '#EA521F'
                },
                blueGray: {
                    light: '#4C5970',
                    dark: '#2D3142'
                },
                red: {
                    danger: 'red'
                },
                green: {
                    success: '#4BB543'
                },
                blue: {
                    crayola: '#3772FF'
                },
                yellow: {
                    sunglow: '#FDCA40'
                },
                greish: {
                    base: 'rgba(178, 153, 120, 0.954)'
                }
            },
            fontFamily: {
                nunito: ['var(--font-nunito)'],
                poppins: ['var(--font-poppins)'],
                rancho: ['var(--font-rancho)']
            },
            fontSize: {
                xs: '14px'
            },
            screens: {
                '3xl': '1660px',
                lg: '1064px'
            }
        }
    },

    plugins: []
}
export default config
