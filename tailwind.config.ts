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
        primary: {
          DEFAULT: "#6991DC",
          100: "#6991DC",
          200: "#4869BD",
        },
        secondary: "#FFF99E",
      },
      animation: {
        "spin-slow": "spin 10s linear infinite",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#6991DC",
          secondary: "#FFF99E",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
