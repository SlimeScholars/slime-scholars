/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{pages,components}/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      flexBasis: {
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
      },
      colors: {
        "bg-light": "#FEF8FF",
        primary: "#4bad5a",
        "primary-light": "#D4F2D1",
        "primary-medium": "#AACEA7",
        "primary-dark": "#2a5932",
        ink: "#4E5A84",
        "bg-completed": "#151515",
      },
      fontFamily: {
        galindo: ["Galindo"],
        cabin: ["Cabin Sketch"],
        averia: ["Averia Serif Libre"],
      },
    },
    dropShadow: {
      sm: "0px 3px 2px rgba(0, 0, 0, 0.6)",
      glow: "0px 0px 15px rgba(255, 255, 255, 0.5)",
    },
  },
  plugins: [],
};
