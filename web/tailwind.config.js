/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E7D32",
        secondary: "#558B2F",
        accent: "#8D6E63",
        highlight: "#F9A825",
        background: "#F7F8F4",
        sidebar: "#1B4332",
        navbar: "#2D6A4F",
        success: "#43A047",
        warning: "#FB8C00",
        danger: "#E53935",
      },
    },
  },
  plugins: [],
}
