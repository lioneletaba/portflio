/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}
export const darkMode = ["class"];
export const content = [
  "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
];
export const prefix = "";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  fontFamily: {
    display: ['"Gilda Display"', "sans-serif"],
    jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
    manrope: ["Manrope", "sans-serif"],
  },
  extend: {
    fontFamily: {
      sans: [
        "Manrope",
        '"Plus Jakarta Sans"',
        "sans-serif",
        ...defaultTheme.fontFamily.sans,
      ],
    },
    textColor: {
      skin: {
        base: withOpacity("--color-text-base"),
        muted: withOpacity("--color-text-muted"),
        inverted: withOpacity("--color-text-inverted"),
      },
    },
    backgroundColor: {
      skin: {
        fill: withOpacity("--color-fill"),
        "button-accent": withOpacity("--color-button-accent"),
        "button-accent-hover": withOpacity("--color-button-accent-hover"),
        "button-muted": withOpacity("--color-button-muted"),
      },
    },
    ringColor: {
      skin: {
        fill: withOpacity("--color-fill"),
      },
    },
    gradientColorStops: {
      skin: {
        hue: withOpacity("--color-fill"),
      },
    },
    colors: {
      skin: {
        hue: withOpacity("--color"),
        muted: withOpacity("--muted"),
      },
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
};
export const plugins = [require("tailwindcss-animate")];
