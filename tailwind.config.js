/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{pages,components}/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      flexBasis: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
      colors: {
        "bg-light": "#FEF8FF",
        primary: "#F649DA",
        "primary-light": "#EC5ED6",
        "primary-dark": "#D125B5",
        ink: "#4E5A84",
        'bg-completed': '#151515',
      },
      fontFamily: {
        galindo: ["Galindo"],
        cabin: ["Cabin Sketch"],
        averia: ["Averia Serif Libre"],
      },
    },
    boxShadow: {
      "2xl": "0px 0px 30px rgba(255, 255, 255, 0.8)",
    },
    dropShadow: {
      sm: "0px 3px 2px rgba(0, 0, 0, 0.6)",
    },
  },
  plugins: [],
};
