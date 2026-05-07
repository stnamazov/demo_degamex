/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#FAFF00',
      },
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      serif: ['Orbitron', 'serif'],
    },
  },
  plugins: [],
}

