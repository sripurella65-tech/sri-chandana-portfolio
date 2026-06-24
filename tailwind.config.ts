import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07111f",
        panel: "#0d1b2d",
        cyan: "#54d6ff",
        mint: "#65f5bd",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 50px rgba(84,214,255,.16)",
      },
    },
  },
  plugins: [],
} satisfies Config;
