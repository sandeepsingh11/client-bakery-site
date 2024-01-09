/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#f5faf9', 
          '100': '#e9f5f3', 
          '200': '#cae3de', 
          '300': '#abd1c8', 
          '400': '#78b0a0', 
          '500': '#4c8e78', 
          '600': '#3e8068', 
          '700': '#2b6b50', 
          '800': '#1c573b', 
          '900': '#0f4027', 
          '950': '#072915'
        },
        'secondary': {
          '50': '#fafffe', 
          '100': '#f5fcfa', 
          '200': '#e3faf2', 
          '300': '#d5f7ea', 
          '400': '#b8f2d7', 
          '500': '#9beec1', 
          '600': '#7ed6a4', 
          '700': '#57b37c', 
          '800': '#388f58', 
          '900': '#1f6b38', 
          '950': '#0d451d'
        },
        'black': '#333333',
        'white': '#efefef',
        'gray': '#696762',
      },
      fontFamily: {
        'body': 'poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
      }
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
  ],
};

module.exports = config;
