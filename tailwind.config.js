module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {

        // PRIMARY COLORS
        'primary-blue': '#2291ea',
        'navy-dark': '#111f78',
        'bright-amber': '#FFCF25',
        'amber-dark': '#e7ae00',
        'amber-gold': '#fccb37',

        // TEXT COLORS
        'carbon-black': '#1B1B1B',
        'dark-purple': '#201148',

        // BACKGROUND COLORS
        'floral-white': '#FFFBF4',
        'cream-light': '#fff1cf',

        // ACCENT COLORS
        'sky-blue': '#bbe2fd',
        'light-sky': '#c2e7ff',
        'mint-green': '#d1f9e5',
        'lavender': '#e3e1ff',
        'emerald': '#10b981',
        'purple-accent': '#6c59d8',

        // UI COLORS
        'blue-soft': '#77bbf2',
        'blue-light': '#e0eeff',
        'green-teal': '#7fd4b8',
        'green-soft': '#d7fbe4',
        'gray-neutral': '#d9d9d9',
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],  // Títulos
        body: ['DM Sans', 'sans-serif'],      // Texto
      },
      fontSize: {
        'hero': ['50px', { lineHeight: '65px', fontWeight: '500' }],
        'hero-sub': ['25px', { lineHeight: '40px', fontWeight: '400' }],
        'section-title': ['50px', { lineHeight: '60px', fontWeight: '500' }],
        'section-title-sm': ['36px', { lineHeight: '43px', fontWeight: '500' }],
        'section-title-md': ['44px', { lineHeight: '53px', fontWeight: '500' }],
        'card-title': ['28px', { lineHeight: '42px', fontWeight: '500' }],
        'card-title-sm': ['24px', { lineHeight: '32px', fontWeight: '500' }],
        'step-number': ['128px', { lineHeight: '154px', fontWeight: '500', letterSpacing: '-8.96px' }],
        'nav': ['14px', { lineHeight: '21px', fontWeight: '500' }],
        'body-lg': ['20px', { lineHeight: '28px', fontWeight: '300' }],
        'body-md': ['18px', { lineHeight: '27px', fontWeight: '400' }],
        'body-sm': ['16px', { lineHeight: '21px', fontWeight: '400' }],
        'body-xs': ['14px', { lineHeight: '21px', fontWeight: '300' }],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float-delayed 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'marquee': 'marquee 28s linear infinite',
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
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
