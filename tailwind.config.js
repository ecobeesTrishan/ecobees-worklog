export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Montserrat"]
      },
      animation: {
        "slide-in": "slide-in 1.5s cubic-bezier(.41,.73,.51,1.02)"
      },
      keyframes: {
        "slide-in": {
          "0%": {
            transform: "translateX(100%)"
          },
          "100%": {
            transform: "translateX(0)"
          }
        }

      }
    }
  },
  plugins: []
};