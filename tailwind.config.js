/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-500' : '#00ADB5',
        'dark-1': '#000000',
        'dark-2': '#09090A',
        'dark-3': '#101012',
        'dark-4': '#1F1F22',
        'light-1': '#FFFFFF',
        'light-2': '#EFEFEF',
        'light-3': '#9DB2BF',
        'light-4': '#393E46',
      },
      fontFamily: {
        noto: ['Noto Sans KR', 'sans-serif'],
        han: ['Black Han Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}