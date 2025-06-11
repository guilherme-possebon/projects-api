/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "var(--color-text, #7D57D0)",
        placeholder: "var(--color-placeholder, #A29EA8)",
        background: "var(--color-background, #121212)",
        primary: "var(--color-primary, #6A4BC7)",
        secondary: "var(--color-secondary, #2D195C)",
        border: "var(--color-border, #6F3DE4)",
        cardBackground: "var(--color-cardBackground, #1A1A1A)",
        link: "var(--color-link, #8AB4F8)",
        error: "var(--color-error, #EF5350)",
        success: "var(--color-success, #66BB6A)",
        danger: "var(--color-danger, #F44336)",
        divider: "var(--color-divider, #4D2D9D)",
        toastText: "var(--color-toastText, #FFFFFF)",
        white: "var(--color-white, #FFFFFF)",
        black: "var(--color-black, #000000)",
        themeColor: "var(--color-themeColor, #000000)",
        gray: "var(--color-gray, #7A7A7A)",
      },
      animation: {
        slideDown: "slideDown 0.5s ease-in-out",
        fadeIn: "fadeIn 0.3s ease-in-out",
      },
      keyframes: {
        slideDown: {
          "0%": { maxHeight: "0", opacity: "0" },
          "100%": { maxHeight: "500px", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
