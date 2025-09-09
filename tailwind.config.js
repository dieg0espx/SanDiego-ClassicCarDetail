/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-delay-3': 'fadeIn 0.8s ease-out 0.3s both',
        'fade-in-delay-8': 'fadeIn 0.8s ease-out 0.8s both',
        'fade-in-delay-10': 'fadeIn 0.8s ease-out 1s both',
        'fade-in-delay-12': 'fadeIn 0.8s ease-out 1.2s both',
        'slide-up-delay-1': 'slideUp 0.8s ease-out 0.1s both',
        'slide-up-delay-2': 'slideUp 0.8s ease-out 0.2s both',
        'slide-up-delay-3': 'slideUp 0.8s ease-out 0.3s both',
        'slide-up-delay-4': 'slideUp 0.8s ease-out 0.4s both',
        'slide-up-delay-8': 'slideUp 0.8s ease-out 0.8s both',
        'slide-up-delay-9': 'slideUp 0.8s ease-out 0.9s both',
        'slide-up-delay-10': 'slideUp 0.8s ease-out 1s both',
        'slide-up-delay-11': 'slideUp 0.8s ease-out 1.1s both',
        'bounce-in-delay-5': 'bounceIn 0.6s ease-out 0.5s both',
        'bounce-in-delay-6': 'bounceIn 0.6s ease-out 0.6s both',
        'bounce-in-delay-7': 'bounceIn 0.6s ease-out 0.7s both',
        'float-delay-12': 'float 3s ease-in-out 1.2s infinite',
        'float-delay-13': 'float 3s ease-in-out 1.3s infinite',
        'float-delay-14': 'float 3s ease-in-out 1.4s infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
