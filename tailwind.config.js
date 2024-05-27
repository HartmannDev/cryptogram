import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:['"Oswald"', 'sans-serif']
      },
      keyframes:{
        puzzleFoward:{
          from: {
            transform: "rotate(0deg) translate(50px)"
          },
          to: {
            transform: "rotate(360deg) translate(50px)"
          }
        },
        puzzleBackward:{
          from: {
            transform: "rotate(0deg)"
          },
          to: {
            transform: "rotate(-360deg)"
          }
        }
      },
      animation: {
        "puzzleF": "puzzleFoward 2s linear infinite",
        "puzzleB": "puzzleBackward 2s linear infinite",
        "textPulse": "pulse 2s linear 1"
      }
    },
  },
  plugins: [],
}

