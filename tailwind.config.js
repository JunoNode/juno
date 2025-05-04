/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        jungle: {
          DEFAULT: "#0a0f0d",       // Deep jungle black
          mist: "#1e2d2b",          // Soft muted background
          glow: "#00ff88",          // Emerald glow accent
          warning: "#ffc857",       // Alert/warning highlight
          danger: "#ff5c5c",        // High-risk indicator
        },
        glass: "rgba(255, 255, 255, 0.06)", // Glassmorphism base
      },
      fontFamily: {
        sans: ["Inter", "Nunito", "sans-serif"],
      },
      boxShadow: {
        jungle: "0 4px 30px rgba(0, 255, 136, 0.1)",
        soft: "0 6px 20px rgba(0, 0, 0, 0.2)",
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        fade: 'fadeIn 1s ease-in-out',
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        drift: 'drift 20s ease-in-out infinite',
        sonar: 'sonar 3s ease-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 255, 136, 0.5)' },
          '70%': { boxShadow: '0 0 0 10px rgba(0, 255, 136, 0)' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10px, -10px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        sonar: {
          '0%': {
            transform: 'scale(0.9)',
            opacity: 0.9
          },
          '100%': {
            transform: 'scale(1.4)',
            opacity: 0
          }
        }
      },
    },
  },
  plugins: [],
}
