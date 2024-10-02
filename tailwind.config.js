/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(0)' },
          '100%': { opacity: '1', transform: 'translateY(1rem)' },
        },
        fadeUp: { 
          '0%': { opacity: '0', transform: 'translateY(1rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out forwards',
        'fade-up': 'fadeUp 1.5s ease-in-out forwards',
      },
      boxShadow: {
        'custom-purple': '0 4px 6px -1px rgba(94, 3, 252, 0.5)', 
      },
      colors: {
        darkGrey: '#1e1e1e',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    flowbite.plugin(),
  ],
}
