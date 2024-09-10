/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-1rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out forwards',
      },
      boxShadow: {
        'custom-purple': '0 4px 6px -1px rgba(94, 3, 252, 0.5)', 
      },
    },
  },
  plugins: [],
}