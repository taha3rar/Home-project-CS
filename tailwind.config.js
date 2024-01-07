/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#082d61",
        secondary: "#b1bfca",
      },
      backgroundColor: {
        primary: "#cfeaff",
      },
    },
  },
  plugins: [],
};
