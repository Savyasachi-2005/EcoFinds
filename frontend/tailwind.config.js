/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Libre Baskerville"', "serif"],
      },
      colors: {
        border: "var(--color-border)", // gray-200
        input: "var(--color-input)", // slate-50
        ring: "var(--color-ring)", // emerald-500
        background: "var(--color-background)", // slate-50
        foreground: "var(--color-foreground)", // gray-800
        primary: {
          DEFAULT: "var(--color-primary)", // emerald-500
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // emerald-600
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-600
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // slate-100
          foreground: "var(--color-muted-foreground)", // gray-500
        },
        accent: {
          DEFAULT: "var(--color-accent)", // amber-800
          foreground: "var(--color-accent-foreground)", // white
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // gray-800
        },
        card: {
          DEFAULT: "var(--color-card)", // white
          foreground: "var(--color-card-foreground)", // gray-800
        },
        success: {
          DEFAULT: "var(--color-success)", // emerald-800
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // amber-600
          foreground: "var(--color-warning-foreground)", // white
        },
        error: {
          DEFAULT: "var(--color-error)", // red-600
          foreground: "var(--color-error-foreground)", // white
        },
      },
      boxShadow: {
        "eco-card": "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        "eco-cta": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      },
      transitionDuration: {
        200: "200ms",
        300: "300ms",
      },
      transitionTimingFunction: {
        eco: "ease-in-out",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      zIndex: {
        100: "100",
        110: "110",
        150: "150",
        200: "200",
        300: "300",
        400: "400",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
