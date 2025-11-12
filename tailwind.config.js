module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'hirably-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#93c5fd', // Changed from #2563eb to match muted-blue
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#0f172a',
        },
        // PRIMARY COLORS
        'taupe-dark': '#4c4a47', // Deep, warm gray/brown for text & footer
        'gray-medium': '#747775', // Medium gray for backgrounds
        'gray-light': '#C4C7C5', // Light gray for subtle backgrounds

        // ACCENT COLOR
        'muted-blue': '#93c5fd', // Soft, light blue for CTA and accents (Primary Accent)
        'light-blue-bg': '#C2E7FF', // Very light blue for backgrounds

        // SECONDARY PASTEL COLORS (For visual variety in cards/timeline)
        'pastel-purple': '#c4b5fd', // Secondary accent 1
        'pastel-yellow': '#fde047', // Secondary accent 2
        'pastel-green-soft': '#a7f3d0', // Secondary accent 3 (A different, softer green)

        // BACKGROUND COLORS (Soft, creamy pastels)
        'cream-soft': '#f8f5f2', // Soft background for process section & cards (The 'Beige')
        'beige-offwhite': '#fcfcfc', // Main body/header background (The lighter 'Beige')
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float-delayed 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
