/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-strong': 'var(--color-surface-strong)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        'accent-soft': 'var(--color-accent-soft)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(115, 216, 255, 0.18), 0 18px 60px rgba(6, 182, 212, 0.18)',
        card: '0 20px 80px rgba(5, 10, 22, 0.45)',
      },
      backgroundImage: {
        'hero-grid':
          'linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseLine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(180%)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        pulseLine: 'pulseLine 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

