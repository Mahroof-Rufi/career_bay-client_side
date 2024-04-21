/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#FF6B00",
        mainGrey: '#404040',
        secondGrey: '#5F5C5C',
      },
      fontFamily: {
        bannerText: [ '"Kanit"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

