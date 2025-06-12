module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // outros caminhos conforme seu projeto
  ],
  theme: {
    extend: {
      colors: {
        text: "var(--color-text)",
        placeholder: "var(--color-placeholder)",
        background: "var(--color-background)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        border: "var(--color-border)",
        cardBackground: "var(--color-cardBackground)",
        link: "var(--color-link)",
        error: "var(--color-error)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",
        divider: "var(--color-divider)",
        toastText: "var(--color-toastText)",
        white: "var(--color-white)",
        black: "var(--color-black)",
        themeColor: "var(--color-themeColor)",
        gray: "var(--color-gray)",
      },
    },
  },
  plugins: [],
};
