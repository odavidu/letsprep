import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        "instrument-sans": ['Instrument Sans', 'sans-serif'],
        "cormorant-infant": ['Cormorant Infant', 'sans-serif'],
        "gloock": ['Gloock', 'sans-serif'],
        "ibm": ['IBM Plex Sans JP', 'sans-serif'],
      },
      backgroundImage: {
        one: "url('images/wp-one.jpg')",
        two: "url('images/wp-two.jpg')",
        three: "url('images/wp-three.jpg')",
        four: "url('images/wp-four.jpg')",
        five: "url('images/wp-five.jpg')",
        six: "url('images/wp-six.jpg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
