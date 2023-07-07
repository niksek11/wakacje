/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
    screens: {
      'sm': '375px',     // Smartphones
      'md': '760px',     // Tablets
      'lg': '1024px',    // PC's
    },
  },
  plugins: [],
}