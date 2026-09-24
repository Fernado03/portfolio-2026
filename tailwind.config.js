const c = (v) => `rgb(var(${v}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // The social-card source (scripts/og.*) uses a few classes nothing in src/ does.
    "./scripts/**/*.{html,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: c('--bg'),
        surface: c('--surface'),
        'surface-2': c('--surface-2'),
        line: c('--line'),
        ink: c('--ink'),
        muted: c('--muted'),
        accent: c('--accent'),
        // One colour per model family in the thesis figures.
        series: {
          classical: c('--series-classical'),
          statistical: c('--series-statistical'),
          contextual: c('--series-contextual'),
          ensemble: c('--accent'),
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '76rem',
      },
      keyframes: {
        'dash-flow': {
          to: { strokeDashoffset: '-40' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(2.6)', opacity: '0' },
        },
        'dialog-in': {
          from: { opacity: '0', transform: 'translateY(12px) scale(0.98)' },
          to: { opacity: '1', transform: 'none' },
        },
        marquee: {
          to: { transform: 'translateX(-50%)' },
        },
        // Illustration motion; distances are in the 480×300 SVG viewBox units.
        flow: {
          to: { strokeDashoffset: '-24' },
        },
        stream: {
          '0%': { transform: 'scaleX(0)' },
          '60%, 100%': { transform: 'scaleX(1)' },
        },
        scan: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(196px)' },
        },
        playhead: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(428px)' },
        },
      },
      animation: {
        'dash-flow': 'dash-flow 1.6s linear infinite',
        'pulse-ring': 'pulse-ring 1.8s cubic-bezier(0.2, 0.6, 0.3, 1) infinite',
        'dialog-in': 'dialog-in 0.28s cubic-bezier(0.2, 0.7, 0.2, 1)',
        marquee: 'marquee 60s linear infinite',
        flow: 'flow 1.2s linear infinite',
        stream: 'stream 2.6s ease-out infinite',
        scan: 'scan 2.4s ease-in-out infinite alternate',
        playhead: 'playhead 4s linear infinite',
      },
    },
  },
  plugins: [],
}
