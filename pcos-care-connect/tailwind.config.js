/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#FF6B9D',
          dark: '#E84B7A',
          50: '#FFF0F5',
          100: '#FFE0EB',
          200: '#FFB8D0',
          300: '#FF8FB6',
          400: '#FF6B9D',
          500: '#FF4785',
          600: '#E84B7A',
          700: '#C93060',
          800: '#A01847',
          900: '#7A0D33',
        },
        secondary: {
          DEFAULT: '#6B5FFF',
          50: '#F0EEFF',
          100: '#E0DCFF',
          200: '#C2BAFF',
          300: '#A397FF',
          400: '#8578FF',
          500: '#6B5FFF',
          600: '#5A4FEF',
          700: '#4A3FD9',
          800: '#3A30B3',
          900: '#2A208D',
        },
        accent: {
          DEFAULT: '#FF9F1C',
          50: '#FFF8ED',
          100: '#FFF0D4',
          200: '#FFE0A8',
          300: '#FFD07D',
          400: '#FFBF51',
          500: '#FF9F1C',
          600: '#E88C0E',
          700: '#C27508',
          800: '#9C5D04',
          900: '#764702',
        },
        'health-pink': '#FFB4D6',
        'health-purple': '#E0C3FC',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'blob': 'blob 8s ease-in-out infinite',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite ease-in-out',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'count-up': 'countUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 107, 157, 0.7)' },
          '50%': { boxShadow: '0 0 0 10px rgba(255, 107, 157, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 60% 70% 40%' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': 'radial-gradient(circle at 20% 50%, rgba(255, 107, 157, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(107, 95, 255, 0.1) 0%, transparent 50%)',
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'premium': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'premium-lg': '0 20px 60px rgba(0, 0, 0, 0.12)',
        'glow-primary': '0 0 30px rgba(255, 107, 157, 0.3)',
        'glow-secondary': '0 0 30px rgba(107, 95, 255, 0.3)',
      },
    },
  },
  plugins: [],
};
