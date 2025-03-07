import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        myOrange: "#ff6144",
      },
      keyframes: {
        headShake: {
          "0%": { transform: "translateX(0)" },
          "6.5%": { transform: "translateX(-6px) rotateY(-9deg)" },
          "18.5%": { transform: "translateX(5px) rotateY(7deg)" },
          "31.5%": { transform: "translateX(-3px) rotateY(-5deg)" },
          "43.5%": { transform: "translateX(2px) rotateY(3deg)" },
          "50%": { transform: "translateX(0)" },
        },
      },
      animation: {
        headShake: "headShake 500ms ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
