import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chime: {
          mint: "#00D4AA",
          "mint-light": "#00A896", // Base color for primary buttons (swapped with teal)
          teal: "#33DFB8", // Hover color (swapped with mint-light)
          "deep-teal": "#00796B",
          "light-mint": "#E0F7F4",
          background: "#FAFBFC",
          text: "#1A1A1A",
        },
      },
      backgroundImage: {
        "gradient-chime": "linear-gradient(135deg, #00A896 0%, #33DFB8 100%)",
      },
      fontFamily: {
        sans: ["var(--font-darker-grotesque)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Custom 8px increment scale starting from 16px
        'base': '16px',      // Body text
        'lg': '24px',        // Large text
        'xl': '32px',        // Small headings
        '2xl': '40px',       // Medium headings
        '3xl': '48px',       // Large headings
        '4xl': '56px',       // XL headings
        '5xl': '64px',       // XXL headings / Hero
        '6xl': '72px',       // Hero large
        '7xl': '80px',       // Hero XL
        'sm': '16px',        // Small (same as base)
        'xs': '16px',        // Extra small (same as base)
      },
    },
  },
  plugins: [],
};
export default config;

