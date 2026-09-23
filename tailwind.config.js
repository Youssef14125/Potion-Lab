/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cinzel'", "serif"],
        body: ["'EB Garamond'", "serif"],
      },
      colors: {
        cauldron: {
          950: "#0a0710",
          900: "#120c1e",
          800: "#1c1430",
          700: "#2a1f45",
          600: "#3b2b5e",
        },
        potion: {
          purple: "#8b5cf6",
          gold: "#d4af37",
          ember: "#e8672c",
          teal: "#2dd4bf",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(139, 92, 246, 0.45)",
        goldGlow: "0 0 16px rgba(212, 175, 55, 0.55)",
      },
      backgroundImage: {
        "radial-fade": "radial-gradient(circle at top, rgba(139,92,246,0.15), transparent 60%)",
      },
      animation: {
        "bubble": "bubble 3s ease-in-out infinite",
        "flicker": "flicker 2.5s ease-in-out infinite",
      },
      keyframes: {
        bubble: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        flicker: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
      },
    },
  },
  plugins: [],
};
