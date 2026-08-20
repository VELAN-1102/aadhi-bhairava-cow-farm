/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2E7D32",
          dark: "#1B4332",
          light: "#A5D6A7"
        },
        secondary: {
          DEFAULT: "#558B2F",
          light: "#C5E1A5"
        },
        accent: {
          DEFAULT: "#8D6E63",
          light: "#D7CCC8"
        },
        highlight: "#F9A825",
        background: "#F7F8F4",
        success: "#43A047",
        warning: "#FB8C00",
        danger: "#E53935",
        textMain: "#263238"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
}
