/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8", // blue-700
        secondary: "#9333ea", // purple-600
        safe: "#16a34a", // green-600
        suspicious: "#ca8a04", // yellow-600
        dangerous: "#dc2626", // red-600
        background: "#f8fafc", // slate-50
        surface: "#ffffff",
      }
    },
  },
  plugins: [],
}
