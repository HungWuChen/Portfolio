/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'tech-base': 'var(--bg-base)',
        'tech-surface': 'var(--bg-surface)',
        'tech-highlight': 'var(--bg-highlight)',
        'tech-border': 'var(--border)',
        'tech-text-main': 'var(--text-main)',
        'tech-text-sub': 'var(--text-sub)',
        'tech-blue': '#3b82f6', // Blue 500
        'engineering-orange': '#f97316', // Orange 500
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}