/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf1dd',
          500: '#2C5F2D',
          600: '#1f4a20',
          700: '#193b1a',
          800: '#132e14',
          900: '#0e220f',
        },
        secondary: {
          50: '#f5f9f0',
          100: '#e8f0dc',
          500: '#97BC62',
          600: '#7da050',
          700: '#648040',
          800: '#4c6030',
          900: '#344020',
        },
        accent: {
          50: '#fef9f0',
          100: '#fef0dc',
          500: '#EDC253',
          600: '#e6b043',
          700: '#d49a33',
          800: '#b8862d',
          900: '#9c7226',
        },
        neutral: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e8eaed',
          300: '#dadce0',
          400: '#9aa0a6',
          500: '#5f6368',
          600: '#3c4043',
          700: '#202124',
          800: '#171717',
          900: '#0d0d0d',
        },
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 8px -2px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevation': '0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 4px 8px -2px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}