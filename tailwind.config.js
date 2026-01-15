/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jet-black': '#0E0E0E',
        'champagne-gold': '#E4B169',
        'rich-bronze': '#A66A2F',
        'soft-warm-gray': '#FAF8F6',
        'whatsapp-green': '#25D366'
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif']
      },
      fontSize: {
        'h1-desktop': '56px',
        'h1-mobile': '48px',
        'h2': '40px',
        'h3': '28px'
      },
      lineHeight: {
        'body': '1.5'
      },
      letterSpacing: {
        'heading': '0.02em'
      }
    },
  },
  plugins: [],
}