/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF8F4", // Warm Cream
        surface: "#F5F0E8", // Warm Stone
        linen: "#E8DED0", // Dusty Linen
        amber: {
          mist: "#D4B896",
          muted: "#D4963A",
        },
        gold: {
          dawn: "#C9A54C",
        },
        ochre: {
          dusty: "#C8A96E",
        },
        text: {
          walnut: "#8C6B3E", // Warm Walnut
          redBrown: "#3A2E28", // Deep Brown-Red
          charcoal: "#2A2420", // Rich Charcoal
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // refined sans-serif
        serif: ['Playfair Display', 'serif'], // elegant editorial serif
      }
    },
  },
  plugins: [],
}
