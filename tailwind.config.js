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
        "accent-secondary": "rgb(var(--accent-secondary) / <alpha-value>)",
        aura: "rgb(var(--aura) / <alpha-value>)"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(ellipse at 70% 10%, rgba(212, 175, 85, 0.08), transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(99, 140, 220, 0.06), transparent 50%), linear-gradient(180deg, rgba(8, 10, 18, 0.99), rgba(12, 15, 26, 0.99))"
      },
      boxShadow: {
        glow: "0 20px 60px rgba(212, 175, 85, 0.12)",
        glass: "0 24px 68px rgba(0, 0, 0, 0.4)"
      }
    }
  },
  plugins: []
};

module.exports = config;
