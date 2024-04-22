const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },

    plugins: [nextui({
        themes: {
            light: {
                colors: {
                    background: "#faf5ff",
                    foreground: "#1a0b00",
                    primary: {
                        '50': '#fafaf9',
                        '100': '#f5f5f4',
                        '200': '#e7e5e4',
                        '300': '#d6d3d1',
                        '400': '#a8a29e',
                        '500': '#78716c',
                        '600': '#57534e',
                        '700': '#44403c',
                        '800': '#292524',
                        '900': '#1c1917',
                        '950': '#0c0a09',
                        DEFAULT: '#a8a29e',
                        foreground: '#1a0b00',
                    },
                    focus: '#292524',
                },
                layout:{
                    disabledOpacity: "0.3",
                    radius: {
                        small: "4px",
                        medium: "6px",
                        large: "8px",
                    },
                    borderWidth: {
                        small: "1px",
                        medium: "2px",
                        large: "3px",
                    },

                }

            }
        }
    })],
}

