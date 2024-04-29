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
        thirdGrey: '#A4A3A3',
        bg_grey: '#F0F0F0',
        job_bg_1: '#CBE4F9',
        adminBlue: '#1176FF'
      },
      fontFamily: {
        bannerText: [ '"Kanit"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

