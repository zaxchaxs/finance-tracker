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
        "primary": "#BBF7D0",
        "secondary": "#059669",
        "danger": "#EF4444",
        "danger-hover": "#DC2626",
        "secondary-hover": "#34D399"
      },
      textColor: {
        "primary": "#052E16",
        // "secondary": "#15803D",
        "secondary": "#2E2E2E",
        "lightGreen": "#BBF7D0"
      },
      fontFamily: {
        'passionOne': ['var(--font-passion-one)'],
        'lilitaOne': ['var(--font-lilita-one)']
      }
    },
  },
  plugins: [],
};
