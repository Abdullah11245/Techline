module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
          50: '#e6f2f7',
          100: '#cce5ef',
          200: '#99cbde',
          300: '#66b1ce',
          400: '#3397bd',
          500: '#004b6a',
          600: '#003d56',
          700: '#002f42',
          800: '#00212e',
          900: '#00131a',
        },
        accent: {
          DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)',
          50: '#ecf8ed',
          100: '#d9f0db',
          200: '#b3e1b7',
          300: '#8dd393',
          400: '#67c46f',
          500: '#3eaf47',
          600: '#328c3a',
          700: '#26692d',
          800: '#1a4620',
          900: '#0e2313',
        },
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
};
