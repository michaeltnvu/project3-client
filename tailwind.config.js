/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {  
      extend: {
        fontFamily: {
          amarillo: ['Amarillo', 'sans-serif']
        },
        letterSpacing: {
          tightest: '-.075em',
          tighter: '-.05em',
          tight: '-.025em',
          normal: '0',
          wide: '.025em',
          wider: '.01em',
          widest: '.1em',
          widest: '.25em',
    },
  },
  },
  plugins: [
    require("flowbite/plugin"),
],
};
