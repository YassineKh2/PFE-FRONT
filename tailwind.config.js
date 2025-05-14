import {heroui, lightLayout} from "@heroui/theme"

const primaryColorScale = {
  50: '#ffe5eb',   
  100: '#ffb3c1',
  200: '#ff8097',
  300: '#ff4d6d',  
  400: '#fc3c61', 
  500: '#e63356', 
  600: '#c02e4a',
  700: '#a0263f',
  800: '#72032e',
  900: '#5a0224',
  foreground: '#ffffff',
  DEFAULT: '#fc3c61',
};


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui({
    themes:{
      light:{
        colors:{
          primary:primaryColorScale
        }
      },
      dark:{
        colors:{
          primary:primaryColorScale
        }
      }
    }
  })],
}
