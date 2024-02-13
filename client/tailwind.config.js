/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0fb6fb",
        secondary: "#112159",
        inputBg: "#bee9fd",
        text: "#f7f7f5",
        textSecondary: "#a5a5a5",
        additional: "#6155ae",
        backgroundFrom: "#165a87",
        backgroundTo: "#051c3b",
      },
    },
  },
  plugins: [],
};
