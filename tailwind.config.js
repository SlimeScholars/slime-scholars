/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{pages,components}/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "bg-light": "#FEF8FF",
        "fuchsia": "#F649DA",
        "fuchsia-light": "#EC5ED6",
        "fuchsia-dark": "#D125B5",
        "ink": "#4E5A84",
      },
      fontFamily: {
        "galindo": ["Galindo"],
        "cabin": ["Cabin Sketch"],
      },
    },
    boxShadow: {
      "2xl": "0px 0px 30px rgba(255, 255, 255, 0.8)",
    }
    
  },
  plugins: [],
}

