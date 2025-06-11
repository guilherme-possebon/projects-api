export const theme = {
  extend: {
    colors: {
      text: "#7D57D0",
      placeholder: "#A29EA8",
      background: "#121212",
      primary: "#6A4BC7",
      secondary: "#2D195C",
      border: "#6F3DE4",
      cardBackground: "#1A1A1A",
      link: "#8AB4F8",
      error: "#EF5350",
      success: "#66BB6A",
      danger: "#F44336",
      divider: "#4D2D9D",
      toastText: "#FFFFFF",
      white: "#FFFFFF",
      black: "#000000",
      themeColor: "#000000",
      gray: "#7A7A7A",
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
};
