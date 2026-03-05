/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        aura: "rgb(var(--aura) / <alpha-value>)"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top right, rgba(57, 189, 255, 0.18), transparent 35%), radial-gradient(circle at 20% 20%, rgba(84, 128, 255, 0.16), transparent 40%), linear-gradient(135deg, rgba(8, 15, 36, 0.98), rgba(4, 10, 26, 0.98))"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(15, 118, 255, 0.22)",
        glass: "0 30px 90px rgba(3, 8, 20, 0.45)"
      }
    }
  },
  plugins: []
};

module.exports = config;
