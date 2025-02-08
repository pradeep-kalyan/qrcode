/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dancing: ["Dancing Script", "cursive"],
        great: ["Great Vibes", "cursive"],
        ly: ["Lavishly Yours", "cursive"],
        audio: ["Audiowide", "cursive"],
        electro: ["Electrolize", "cursive"],
      },
    },
  },
  plugins: [],
};
