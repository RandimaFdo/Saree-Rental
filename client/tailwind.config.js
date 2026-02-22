/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'luxury-display': ['Playfair Display', 'serif'],
        'luxury-body': ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-up-delay-1': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '60%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-up-delay-2': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '80%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-up-delay-1': 'fade-in-up-delay-1 0.6s ease-out',
        'fade-in-up-delay-2': 'fade-in-up-delay-2 0.6s ease-out',
      },
    },
  },
  plugins: [],
}
