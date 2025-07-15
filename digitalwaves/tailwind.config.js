/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#112B3C",
        "secondary":"#F66B0E"
      }
    },
  },
  plugins: [],
}