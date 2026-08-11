const c = (v) => `rgb(var(${v}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: c('--accent-rgb'),
          strong: c('--accent-strong-rgb'),
          muted: 'rgb(var(--accent-rgb) / 0.10)',
        },
        accent2: {
          DEFAULT: c('--accent2-rgb'),
          strong: c('--accent2-strong-rgb'),
          muted: 'rgb(var(--accent2-rgb) / 0.10)',
        },
        bg: c('--bg-rgb'),
        'bg-subtle': c('--bg-subtle-rgb'),
        'bg-elev': c('--bg-elev-rgb'),
        ink: c('--ink-rgb'),
        'ink-muted': c('--ink-muted-rgb'),
        line: c('--line-rgb'),
      },
      fontFamily: {
        sans: ['Geist Variable', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono Variable', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
