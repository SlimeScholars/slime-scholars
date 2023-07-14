/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{pages,components}/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "bg-light": "#FEF8FF",
        "fuchsia": "#F649DA",
        "fuchsia-light": "#EC5ED6",
        "fuchsia-dark": "#D125B5",
      }
    },
  },
  plugins: [],
}

