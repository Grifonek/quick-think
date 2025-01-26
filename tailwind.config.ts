import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      animation: {
        gradient: "gradient 8s linear infinite",
        glow: "glow 3s infinite",
        "neon-glow": "neon-glow 3s linear infinite",
      },
      keyframes: {
        gradient: {
          to: { "background-position": "200% center" },
        },
        glow: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.8" },
        },
        "neon-glow": {
          "0%, 100%": {
            boxShadow: "0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF",
          },
          "50%": {
            boxShadow: "0 0 20px #FF00FF, 0 0 30px #FF00FF, 0 0 40px #FF00FF",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
