/** @type {import('tailwindcss').Config} */

// Antes estaba module.export = {}
export default {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out'
      },
      keyframes:{
        fadeIn:{
          '0%':{opacity:0},
          '100%': {opacity:1},
        }
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes:['night']
  }
}

