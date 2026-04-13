import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Organic / Earthy color scheme for farmer trust & visibility
        'brand-primary': '#2D5016',    // Deep Forest
        'brand-success': '#4A7C2F',    // Leaf Green
        'brand-secondary': '#8B5E3C',  // Warm Earth
        'brand-warning': '#D4A853',    // Golden Wheat
        'brand-surface': '#F5F0E8',    // Cream Base
        'brand-info': '#2C4A8C',       // Trust Blue
        'brand-danger': '#C0392B',     // Alert Red
      },
      fontFamily: {
        sans: ['"Noto Sans"', 'sans-serif'], // Native 11 languages support
      }
    },
  },
  plugins: [],
};
export default config;
