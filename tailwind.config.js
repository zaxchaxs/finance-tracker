/** @type {import('tailwindcss').Config} */
module.exports = {
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
        "primary": "#E1FAEE",
        "secondary": "#047857",
        "secondary-hover": "#049669",
        'third': '#CCFBF1',
        'third-hover': '#F0FDFA',
        "danger": "#FF1D48",
        "danger-hover": "#F43F5E",
      },
      textColor: {
        "primary": "#052E16",
        // "secondary": "#15803D",
        "secondary": "#2E2E2E",
        "lightGreen": "#BBF7D0",
        "lightWhite": "#F1F5F9"
      },
      fontFamily: {
        'header': ['var(--font-blinker)'],
        'title': ['var(--font-encodeSans)'],
        'paragraf': ['var(--font-roboto)']
      },
      borderRadius: {
        '5xl': '3rem'
      }
    },
  },
  plugins: [],
};
