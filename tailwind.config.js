/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F84464',
        dark: '#0f0f0f',
        card: '#1a1a1a',
        border: '#2a2a2a',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
