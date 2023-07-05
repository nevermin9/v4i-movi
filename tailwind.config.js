/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      zIndex: {
        '6666': 6666,
        '7777': 7777,
        '8888': 8888,
        '9999': 9999,
      },
      colors: {
        violet: {
          600: '#806491',
        },
        amber: {
          900: '#B9848C'
        },
        blue: {
          900: '#02315E',
          700: '#00457E',
          600: '#2F70AF',
        }
      },
    },
  },
  plugins: [],
}

