/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#55cf72',
        secondary: '#a7e5c5',
        textGray: '#4a4c50',
        grayLabel: '#A2A5AB',
        grayBorder: '#caced5',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
      spacing: {
        22: '5.5rem',
      },
      backgroundImage: {
        'custom-pattern': "url('/public/assets/background.jpg')",
      },
    },
  },
  plugins: [],
};
