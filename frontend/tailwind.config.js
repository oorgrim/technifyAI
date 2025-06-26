/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jura: ['"Jura"', 'sans-serif'], 
        judson: ["Judson", 'serif'],
      },
    },
  },
  plugins: [],
}
