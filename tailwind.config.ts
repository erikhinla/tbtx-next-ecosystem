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
        tbtx: {
          bg: "#0A0A0A",
          text: "#EAEAE6",
          accent: "#C8A96A",
          divider: "rgba(234,234,230,0.12)",
        },
        bbai: {
          bg: "#0A0A0A",
          text: "#F2F2EE",
          secondary: "#8A8A84",
          accent: "#6E8FB3",
          divider: "rgba(255,255,255,0.10)",
        },
        bbm: {
          bg: "#0B0B0B",
          text: "#FFFFFF",
          secondary: "#8A8A8A",
          accent: "#4DA3FF",
          divider: "rgba(255,255,255,0.10)",
        },
      },
      fontFamily: {
        display: ["var(--font-archivo-black)", "sans-serif"],
        body: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
