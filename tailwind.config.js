/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'charcoalDark': '#14181c',
        'charcoalMedium': '#2C2C2C',
        'charcoalLighter': '#1b2025',
        'charcoalLight': '#484848',
        'charcoalLightest': '#2f2f30'
      },
      textColor: {
        'charcoalLight': '#B0B0B0',
      }
    }
  },
  variants: {},
  plugins: []
}