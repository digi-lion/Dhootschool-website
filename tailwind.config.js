/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50:  '#fff8ed',
          100: '#ffefd4',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        navy: {
          700: '#1e3a5f',
          800: '#162d4a',
          900: '#0f1e33',
        },
      },
      fontFamily: {
        display: ['"Tiro Devanagari Hindi"', 'serif'],
        body:    ['"Hind"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
