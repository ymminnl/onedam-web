/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hytale-dark': '#0a0c10',
        'hytale-blue': '#0e1826',
        'hytale-gold': '#cdb075',
        'hytale-gold-hover': '#e6c88b',
        'border-gold': '#cdb075',
        'hytale-text': '#cfd8e3',
        'hytale-accent': '#0070dd',
        'hytale-darkest': '#05070a',
        'gaming-surface': '#1b2a3c',
        'gaming-bg': '#0a0c10',
      },
      boxShadow: {
        'gaming': '0 0 10px rgba(205, 176, 117, 0.2), 0 0 20px rgba(0, 112, 221, 0.1)',
        'gold': '0 0 8px rgba(205, 176, 117, 0.8), 0 0 15px rgba(205, 176, 117, 0.4)',
      },
      fontFamily: {
        serif: ['"Cinzel"', 'serif'],
        sans: ['"Open Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },

      backgroundImage: {
        'hero-pattern': "url('/hero-bg.jpg')",
        'gradient-button': "linear-gradient(180deg, #1f3d61 0%, #0e1826 100%)",
        'gradient-ip-panel': "linear-gradient(180deg, #2a3c5a 0%, #1a2a44 100%)",
        'gradient-galaxy': "linear-gradient(180deg, #1A1A2E 0%, #301934 100%)",
        'gradient-gaming': "radial-gradient(circle at center, #1f3d61 0%, #0e1826 60%, #0a0c10 100%)",
        'hero-gold-button-gradient': "linear-gradient(180deg, #cdb075 0%, #b89b5f 100%)",
      }
    },
  },
  plugins: [],
}