module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // PRIMARY COLOR PALETTE
        'bright-amber': '#FFCF25', // Bright Amber - identificadores y elementos destacados
        'periwinkle': '#D6C9FD', // Periwinkle - acentos secundarios
        'carbon-black': '#1B1B1B', // Carbon Black - texto principal
        'dark-amethyst': '#201148', // Dark Amethyst - fondos oscuros y contraste
        'icy-blue': '#B1D8FC', // Icy Blue - acentos suaves
        'floral-white': '#FFFBF4', // Floral White - fondos claros
        'white': '#FFFFFF', // White - fondos y elementos puros
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
