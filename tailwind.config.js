/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#d4af37',
        'gold-dark': '#b8941f',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      animation: {
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #d4af37, 0 0 10px #d4af37, 0 0 15px #d4af37' },
          '100%': { textShadow: '0 0 10px #d4af37, 0 0 20px #d4af37, 0 0 30px #d4af37' },
        }
      },
      cursor: {
        'film-blade': 'crosshair',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};