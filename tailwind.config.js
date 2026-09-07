/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#0d0c14',
          soft: '#15131f',
          card: '#1b1926',
        },
        cream: '#faf7f2',
        // vibrant palette
        grape: { light: '#a78bfa', DEFAULT: '#7c3aed', dark: '#5b21b6' },
        candy: { light: '#f9a8d4', DEFAULT: '#ec4899', dark: '#be185d' },
        sun: { light: '#fcd34d', DEFAULT: '#f59e0b', dark: '#b45309' },
        mint: { light: '#6ee7b7', DEFAULT: '#10b981', dark: '#047857' },
        sky2: { light: '#7dd3fc', DEFAULT: '#0ea5e9', dark: '#0369a1' },
        primary: {
          50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc',
          400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca',
          800: '#3730a3', 900: '#312e81', 950: '#1e1b4b',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        blob: '42% 58% 63% 37% / 41% 44% 56% 59%',
      },
      boxShadow: {
        pop: '0 18px 40px -12px rgba(124, 58, 237, 0.28)',
        'pop-candy': '0 18px 40px -12px rgba(236, 72, 153, 0.30)',
        'pop-sun': '0 18px 40px -12px rgba(245, 158, 11, 0.30)',
        'pop-mint': '0 18px 40px -12px rgba(16, 185, 129, 0.28)',
        'pop-sky': '0 18px 40px -12px rgba(14, 165, 233, 0.28)',
      },
      animation: {
        blob: 'blob 16s ease-in-out infinite',
        'blob-slow': 'blob 24s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        marquee: 'marquee 32s linear infinite',
        wiggle: 'wiggle 2.5s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out both',
      },
      keyframes: {
        blob: {
          '0%, 100%': { borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%', transform: 'translate(0,0) rotate(0deg)' },
          '33%': { borderRadius: '60% 40% 33% 67% / 63% 58% 42% 37%', transform: 'translate(20px,-24px) rotate(8deg)' },
          '66%': { borderRadius: '35% 65% 57% 43% / 48% 34% 66% 52%', transform: 'translate(-16px,16px) rotate(-6deg)' },
        },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        wiggle: { '0%, 100%': { transform: 'rotate(-4deg)' }, '50%': { transform: 'rotate(4deg)' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
