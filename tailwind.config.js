module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // ==========================================
        // COLORES EXACTOS DEL FIGMA (2025)
        // Extraídos via Figma API
        // ==========================================

        // PRIMARY COLORS
        'primary-blue': '#2291ea',     // Botones, links, acentos principales
        'navy-dark': '#111f78',        // Títulos, footer, texto oscuro
        'bright-amber': '#FFCF25',     // CTA principal (Book a call)
        'amber-dark': '#e7ae00',       // Amber alternativo
        'amber-gold': '#fccb37',       // Badges amarillos

        // TEXT COLORS
        'carbon-black': '#1B1B1B',     // Texto principal
        'dark-purple': '#201148',      // Texto secundario/subtítulos

        // BACKGROUND COLORS
        'floral-white': '#FFFBF4',     // Fondo crema claro
        'cream-light': '#fff1cf',      // Fondo crema más claro

        // ACCENT COLORS
        'sky-blue': '#bbe2fd',         // Backgrounds suaves
        'light-sky': '#c2e7ff',        // Step 01 / Light Sky Blue
        'mint-green': '#d1f9e5',       // Step 02 / Mint Green
        'lavender': '#e3e1ff',         // Step 03 / Lavender
        'emerald': '#10b981',          // Success, checks
        'purple-accent': '#6c59d8',    // Badge morado (Recruitment)

        // UI COLORS
        'blue-soft': '#77bbf2',        // Azul suave
        'blue-light': '#e0eeff',       // Azul muy claro
        'green-teal': '#7fd4b8',       // Verde teal
        'green-soft': '#d7fbe4',       // Verde suave
        'gray-neutral': '#d9d9d9',     // Gris neutral
      },
      fontFamily: {
        // Fuentes del Figma
        sans: ['DM Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],  // Títulos
        body: ['DM Sans', 'sans-serif'],      // Texto
      },
      fontSize: {
        // Tamaños exactos del Figma
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
