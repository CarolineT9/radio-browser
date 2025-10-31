/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#09090bbf',
        surface: '#221f1f63',
        primary: '#ffffff80',
        secondary: '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      spacing: {
        'space-16': 'var(--space-16)',
        'space-32': 'var(--space-32)',
        'space-48': 'var(--space-48)',
        'space-64': 'var(--space-64)',
        'space-80': 'var(--space-80)',
        'space-96': 'var(--space-96)',
        'space-112': 'var(--space-112)',
        'space-128': 'var(--space-128)',
        'space-144': 'var(--space-144)',
        'space-160': 'var(--space-160)',
      },
    },
  },
  plugins: [],
}