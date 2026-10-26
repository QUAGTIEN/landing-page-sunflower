import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--background)",
          pure: "var(--background-pure)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          elevated: "var(--surface-elevated)",
          muted: "var(--surface-muted)",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          soft: "var(--foreground-soft)",
        },
        muted: {
          foreground: "var(--muted-foreground)",
        },
        border: "var(--border)",
        accent: "var(--accent)",
        "on-dark": "var(--on-dark)",
        focus: "var(--focus)",
        error: "var(--error)",
        success: "var(--success)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        container: "1320px",
      },
      borderRadius: {
        btn: "4px",
        frame: "6px",
        stage: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
