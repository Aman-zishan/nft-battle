/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        siteblack: "#131519",
        siteDimBlack: "#191d23",
        siteViolet: "#7f46f0",
        siteWhite: "#9eacc7",
      },
      backgroundImage: {
        astral: "url('/src/assets/background/astral.gif')",
        saiman: "url('/src/assets/background/saiman.gif')",
        eoaalien: "url('/src/assets/background/eoaalien.gif')",
        cusat: "url('/src/assets/background/cusat.jpg')",
        heroImg: "url('/src/assets/background/hero-img.gif')",
        landing: "url('/src/assets/background/landing.jpg')",
      },
      fontFamily: {
        rajdhani: ["Rajdhani", "sans-serif"],
      },
    },
  },
  plugins: [],
};
