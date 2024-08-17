import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        darkgray: "#111111",
        gray: "#222222",
        lightergray: "#262626",
        lightgray: "#303030",
        lightestgray: "#494949",
        whitegray: "#C8C8C8",
        lightorange: "#902B1A",
        dijon: "#966823",
        lightbrown: "#785441",
        cloud: "#5B4946",
        grape: "#392A39",
      },
    },
  },
  plugins: [],
};
export default config;
