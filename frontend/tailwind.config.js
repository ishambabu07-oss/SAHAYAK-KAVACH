/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: { 50: '#F0F7F4', 100: '#D4E8DC', 200: '#A8D1B9', 300: '#7CBA96', 400: '#50A373', 500: '#2D6A4F', 600: '#1C4E3D', 700: '#163D30', 800: '#102C23', 900: '#0A1B16' },
        sand: { 50: '#FDF6ED', 100: '#F9E4C8', 200: '#F3C991', 300: '#E0A96D', 400: '#D4944B', 500: '#C07F2A', 600: '#9A6622', 700: '#734D19', 800: '#4D3311', 900: '#261A08' },
        terracotta: { 50: '#FDF2ED', 100: '#F9DFD0', 200: '#F0BFA1', 300: '#E09F72', 400: '#D07F43', 500: '#C05621', 600: '#9A451A', 700: '#733414', 800: '#4D230D', 900: '#261107' },
        cream: '#F8FAF9',
        parchment: '#F3F6F4'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
