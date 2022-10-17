/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,tsx,ts}'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
        OpenSans: ['Open Sans', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif'],
        DMSans: ['DM Sans', 'sans-serif'],
        Epilogue: ['Epilogue', 'sans-serif'],
        PassionOne: ['Passion One', 'cursive'],
        Muli: ['Muli', 'sans-serif'],
      },
      colors: {
        background: '#172b4d',
        primary: '#5e72e4',
        secondary: '#8392ab',
        info: '#11cdef',
        success: '#2dce89',
        danger: '#f5365c',
        warning: '#fb6340',
        gray: {
          c1: '#f6f9fc',
          c2: '#e9ecef',
          c3: '#dee2e6',
          c4: '#ced4da',
          c5: '#adb5bd',
          c6: '#8898aa',
          c7: '#525f7f',
          c8: '#32325d',
          c9: '#212529',
        },
      },
    },
  },
  plugins: [],
};
