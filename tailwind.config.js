/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#0d1d6f",
        secondary: "#b1bfca",
      },
      backgroundColor: {
        primary: "#cfeaff",
        secondary: "#fdfdfd",
      },
    },
  },
  plugins: [],
};
