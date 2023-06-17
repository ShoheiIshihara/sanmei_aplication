const { urlWithoutHash } = require('@inertiajs/inertia');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    purge: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            fontFamily: {
                cormorant: ['Cormorant Garamond', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: theme => ({
                'hero-img': "url('../images/hero.gif')",
                'hero-img2': "url('../images/hero2.gif')",
                'hero-logo': "url('../images/hero-logo.png')"
            }),
            colors:{
                'sea-pink': {
                    '50': '#fdf3f4',
                    '100': '#fbe8e8',
                    '200': '#f7d4d8',
                    '300': '#ec9ea5',
                    '400': '#e68691',
                    '500': '#d95a6c',
                    '600': '#c43a53',
                    '700': '#a42c45',
                    '800': '#8a273f',
                    '900': '#77243b',
                },
                'ebb': {
                    '50': '#f9f7f7',
                    '100': '#f2eeef',
                    '200': '#e6dfe0',
                    '300': '#d6cbcd',
                    '400': '#bdacae',
                    '500': '#a48f92',
                    '600': '#8d7578',
                    '700': '#756063',
                    '800': '#625254',
                    '900': '#54484a',
                },


            }
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
        require("daisyui")
    ],
    daisyui:{
        themes: ["pastel"]
    }
};
