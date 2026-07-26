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
          DEFAULT: 'var(--accent)',
          strong: 'var(--accent-strong)',
          muted: 'var(--accent-muted)',
        },
        bg: 'var(--bg)',
        'bg-subtle': 'var(--bg-subtle)',
        'bg-elev': 'var(--bg-elev)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        line: 'var(--line)',
      },
      fontFamily: {
        display: ['Geist Variable', 'system-ui', 'sans-serif'],
        sans: ['Geist Variable', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono Variable', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
