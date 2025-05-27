import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        orbitone: {
          "0%": { transform: "rotate(0deg) translateX(4rem) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(4rem) rotate(-360deg)",
          },
        },
        orbittwo: {
          "0%": { transform: "rotate(0deg) translateX(6rem) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(6rem) rotate(-360deg)",
          },
        },
      },
      animation: {
        orbitone: "orbitone 7s linear infinite",
        "orbitone-delay1": "orbitone 7s linear infinite 3.5s",
        orbittwo: "orbittwo 10s linear infinite",
        "orbittwo-delay1": "orbittwo 10s linear infinite 3.33s",
        "orbittwo-delay2": "orbittwo 10s linear infinite 6.66s",
      },
    },
  },
  plugins: [],
};

export default config;
