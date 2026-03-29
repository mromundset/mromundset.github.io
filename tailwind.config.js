/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector', // <--- THIS IS THE MISSING KEY!
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
