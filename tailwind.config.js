/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          50: "#eefffb",
          100: "#c5fff4",
          200: "#8bffe9",
          300: "#4afede",
          400: "#15eccc",
          500: "#00d0b4",
          600: "#00a894",
          700: "#00897b",
          800: "#066961",
          900: "#0a574f",
        },
        secondary: {
          50: "#fcf3f6",
          100: "#fae9f0",
          200: "#f7d3e0",
          300: "#f1b0c6",
          400: "#e77fa0",
          500: "#db597e",
          600: "#be3455",
          700: "#ad2945",
          800: "#8f253a",
          900: "#782334",
        },
      },
    },
  },
  plugins: [],
};
