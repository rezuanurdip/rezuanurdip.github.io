/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        graphite: 'var(--graphite)',
        mist: 'var(--mist)',
        rule: 'var(--rule)',
        accent: 'var(--accent)',
        viz: {
          1: 'var(--viz-1)',
          2: 'var(--viz-2)',
          3: 'var(--viz-3)',
          4: 'var(--viz-4)',
          5: 'var(--viz-5)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['clamp(56px, 8.5vw, 128px)', { lineHeight: '0.92', letterSpacing: '-0.04em', fontWeight: '300' }],
        h2: ['clamp(32px, 4vw, 48px)', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '300' }],
        h3: ['clamp(20px, 1.1rem + 0.4vw, 24px)', { lineHeight: '1.25', fontWeight: '500' }],
        statement: ['clamp(32px, 4.5vw, 56px)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '300' }],
        meta: ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.12em', fontWeight: '400' }],
      },
      maxWidth: {
        page: '1280px',
        prose: '60ch',
      },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        reveal: 'reveal 400ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards',
      },
      borderRadius: {
        none: '0px',
        DEFAULT: '0px',
      },
    },
  },
  plugins: [],
};
