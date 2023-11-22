/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./libs/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      gray: "#7ED5FE",
      green: "#40cea8",
      gray_dark: "#6A7268",
      blue: "#18A0FB",
      blue_dark: "#2b12ce",
      white: "#FFFFFF",
      black: "#000000",
      grayb2: "#E0D0BC",
      red: "#db2727",
      yellow: "#e8ef23",
      blueL_bank: "#2697FF",
      nav_blue: "#7ED5FE",
      nav_gray: "#CFCFD0",
      nav_gray_offwhite: "#CFCFD0",
    },

    borderColor: {
      "custom-blue": "#4B6DCF",
    },
    extend: {
      backgroundImage: {
        zebra: "url('/zebra.png')",
        my_affirmations: "url('/my_affirmations.png')",
        google: "url('/google.png')",
        altshuler_commitions: "url('/altshuler_commitions.png')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
}
