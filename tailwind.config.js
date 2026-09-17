/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F6F4EE",
        ink: "#1B1E23",
        primary: {
          DEFAULT: "#2E5339",
          light: "#3E6B4C",
          dark: "#20392A",
        },
        accent: {
          DEFAULT: "#3B5BDB",
          light: "#5C79E8",
        },
        muted: "#8B8578",
        line: "#E4E0D4",
      },
      fontFamily: {
        sans: ["Pretendard", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
};
