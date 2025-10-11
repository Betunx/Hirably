# 🚀 HIRABLY LANDING PAGE - ANGULAR

## 📋 DESCRIPCIÓN DEL PROYECTO

Landing page moderna y completamente funcional para **Hirably**, plataforma de contratación de talento mexicano para empresas de US y Canadá. Desarrollada en **Angular** con **Tailwind CSS**, incluye componentes reutilizables, carruseles interactivos, y un diseño responsive optimizado.

---

## ✨ CARACTERÍSTICAS PRINCIPALES

### Componentes Implementados:
1. **Hero Section** - Sección principal con CTA dual y animaciones
2. **Stats Bar** - Barra de estadísticas destacadas
3. **Why Hirably** - Grid de ventajas y beneficios
4. **How It Works** - Timeline interactivo (desktop y mobile)
5. **Roles Carousel** - Carrusel automático de roles
6. **Testimonials Carousel** - Carrusel de testimonios con ratings
7. **Final CTA** - Llamado a la acción final
8. **Footer Completo** - Footer con 4 columnas

### Funcionalidades:
- ✅ Carruseles automáticos con controles manuales
- ✅ Responsive design (mobile-first)
- ✅ Animaciones suaves y transiciones
- ✅ Sistema de datos centralizado (Service)
- ✅ Componentes reutilizables
- ✅ Scroll suave entre secciones
- ✅ Hover effects y interactividad

---

## 📁 ESTRUCTURA DEL PROYECTO

```
angular-hirably/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── hero-section/
│   │   │   │   ├── hero-section.component.ts
│   │   │   │   ├── hero-section.component.html
│   │   │   │   └── hero-section.component.css
│   │   │   ├── stats-bar/
│   │   │   │   ├── stats-bar.component.ts
│   │   │   │   ├── stats-bar.component.html
│   │   │   │   └── stats-bar.component.css
│   │   │   ├── roles-carousel/
│   │   │   │   ├── roles-carousel.component.ts
│   │   │   │   ├── roles-carousel.component.html
│   │   │   │   └── roles-carousel.component.css
│   │   │   ├── testimonials-carousel/
│   │   │   │   ├── testimonials-carousel.component.ts
│   │   │   │   ├── testimonials-carousel.component.html
│   │   │   │   └── testimonials-carousel.component.css
│   │   │   ├── how-it-works/
│   │   │   │   ├── how-it-works.component.ts
│   │   │   │   ├── how-it-works.component.html
│   │   │   │   └── how-it-works.component.css
│   │   │   └── why-hirably/
│   │   │       ├── why-hirably.component.ts
│   │   │       ├── why-hirably.component.html
│   │   │       └── why-hirably.component.css
│   │   ├── models/
│   │   │   └── people.model.ts
│   │   ├── services/
│   │   │   └── data.service.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   └── app.module.ts
│   ├── assets/
│   │   └── images/
│   │       ├── people/
│   │       └── testimonials/
│   ├── styles.css
│   └── index.html
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🚀 INSTALACIÓN Y CONFIGURACIÓN

### Prerequisitos:
- Node.js (v14 o superior)
- Angular CLI (v15 o superior)
- npm o yarn

### Pasos de instalación:

1. **Clonar o crear el proyecto:**
```bash
ng new hirably-landing
cd hirably-landing
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Instalar Tailwind CSS:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

4. **Copiar los archivos del proyecto:**
   - Copiar todos los componentes a `src/app/components/`
   - Copiar models a `src/app/models/`
   - Copiar services a `src/app/services/`
   - Reemplazar `app.module.ts`, `app.component.*`
   - Reemplazar `styles.css`
   - Reemplazar `tailwind.config.js`

5. **Agregar imágenes:**
   - Colocar las 6 imágenes de personas en `src/assets/images/people/`
   - Colocar imágenes de testimonios en `src/assets/images/testimonials/`

6. **Iniciar el servidor de desarrollo:**
```bash
ng serve
```

7. **Abrir en el navegador:**
```
http://localhost:4200
```

---

## 🎨 PERSONALIZACIÓN

### Cambiar Colores:

Edita `tailwind.config.js`:
```javascript
colors: {
  'hirably-blue': {
    // Personaliza tus colores aquí
    500: '#3b82f6',
    600: '#2563eb',
    // ...
  }
}
```

### Modificar Datos:

Edita `src/app/services/data.service.ts`:
```typescript
// Actualiza:
- peopleData (información de candidatos)
- rolesData (roles disponibles)
- testimonialsData (testimonios de clientes)
- statsData (estadísticas)
- timelineData (pasos del proceso)
- benefitsData (beneficios de Why Mexico)
- advantageData (ventajas de Hirably)
```

### Agregar Nuevos Componentes:

```bash
ng generate component components/nombre-componente
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
sm: 640px   (Tablets verticales)
md: 768px   (Tablets horizontales)
lg: 1024px  (Laptops)
xl: 1280px  (Desktops)
```

---

## 🎯 COMPONENTES PRINCIPALES

### 1. Hero Section
**Archivo:** `components/hero-section/`

**Características:**
- Background con patrón
- Headline principal con gradiente
- Trust badges
- CTA dual (primario y secundario)
- Visualización de red de talentos
- Stats flotantes animados
- Wave divider

**Métodos:**
- `onBookConsultation()` - Navega a booking
- `onSeeHowItWorks()` - Scroll a sección

---

### 2. Stats Bar
**Archivo:** `components/stats-bar/`

**Características:**
- 5 estadísticas destacadas
- Iconos personalizados
- Hover effects
- Responsive grid (2 cols mobile, 5 desktop)

**Datos mostrados:**
- Empleados colocados
- Compañías servidas
- Ahorro de costos
- Tasa de éxito
- Días para contratar

---

### 3. Roles Carousel
**Archivo:** `components/roles-carousel/`

**Características:**
- Carrusel automático (4 segundos)
- 5 categorías de roles
- Navegación con flechas
- Dots de navegación
- Auto-play pausable
- Imágenes con overlay gradient
- Lista de roles por categoría
- CTA por categoría

**Métodos:**
- `nextSlide()` - Slide siguiente
- `prevSlide()` - Slide anterior
- `goToSlide(index)` - Ir a slide específico
- `getTransform()` - Calcular posición

---

### 4. Testimonials Carousel
**Archivo:** `components/testimonials-carousel/`

**Características:**
- Carrusel automático (5 segundos)
- 3 tarjetas visibles (desktop)
- Responsive (1-3 cards según pantalla)
- Ratings con estrellas
- Industry badges
- LinkedIn verification
- Avatar circular con ring
- Navegación completa

**Métodos:**
- `getVisibleTestimonials()` - Cards visibles
- `updateVisibleCards()` - Ajusta por pantalla
- `getStarArray(rating)` - Array de estrellas

---

### 5. How It Works Timeline
**Archivo:** `components/how-it-works/`

**Características:**
- Timeline horizontal (desktop)
- Timeline vertical (mobile)
- 4 pasos del proceso
- Day badges con gradientes
- Iconos por item
- Línea conectora animada
- CTA al final

**Estructura:**
- Day 1-2: Discovery & Planning
- Day 3-5: Candidate Sourcing
- Day 5-7: Interview & Selection
- Day 7+: Onboarding & Success

---

### 6. Why Hirably
**Archivo:** `components/why-hirably/`

**Características:**
- Grid 3 columnas (desktop)
- 6 ventajas principales
- Iconos grandes
- Lista de items por ventaja
- Hover effect con elevación
- CTA final

**Ventajas:**
- Zero-Risk Hiring
- Lightning Fast
- White Glove Service
- Full Compliance
- Pre-Vetted Talent Pool
- Transparent Pricing

---

## 🔧 DATA SERVICE

El `DataService` centraliza todos los datos de la aplicación:

```typescript
// Métodos disponibles:
getPerson(personId: string): Person
getAllPeople(): Person[]
getRoles(): Role[]
getTestimonials(): Testimonial[]
getStats(): Stat[]
getTimeline(): TimelineStep[]
getBenefits(): Benefit[]
getAdvantages(): Benefit[]
```

---

## 🎨 SISTEMA DE COLORES

```css
Primary Blue: #1E40AF (azul oscuro del logo)
Accent Blue: #3B82F6 (azul claro para CTAs)
Dark Navy: #0F172A (fondos oscuros)
Success Green: #10B981
White: #FFFFFF
Gray Scale: #F3F4F6, #E5E7EB, #9CA3AF, #6B7280
```

---

## 📸 IMÁGENES NECESARIAS

Coloca estas imágenes en `/assets/images/`:

### People (6 imágenes):
1. `people/maria-perez.jpg` - Marketing & Creative
2. `people/juan-contreras.jpg` - Engineering
3. `people/blonde-woman.jpg` - Operations & Admin
4. `people/tablet-woman.jpg` - Customer Support
5. `people/blue-shirt-man.jpg` - Finance & Accounting
6. `people/carlos-ramirez.jpg` - Accounting

### Testimonials (6 imágenes):
1. `testimonials/diego-parra.jpg`
2. `testimonials/laura-martinez.jpg`
3. `testimonials/maria-lopez.jpg`
4. `testimonials/ana-torres.jpg`
5. `testimonials/juan-sanchez.jpg`
6. (Puedes reutilizar carlos-ramirez de people/)

---

## 🚀 DEPLOY

### Build para producción:
```bash
ng build --configuration production
```

Los archivos se generarán en `dist/hirably-landing/`

### Deploy en Vercel:
```bash
npm install -g vercel
vercel
```

### Deploy en Netlify:
1. Conecta tu repositorio
2. Build command: `ng build --configuration production`
3. Publish directory: `dist/hirably-landing`

### Deploy en Firebase:
```bash
npm install -g firebase-tools
firebase init
firebase deploy
```

---

## 🔄 MEJORAS FUTURAS

### Fase 2:
- [ ] Formulario de contacto funcional
- [ ] Integración con calendario (Calendly)
- [ ] Chat en vivo
- [ ] Blog section
- [ ] Case studies detallados
- [ ] Portal de candidatos
- [ ] Dashboard de clientes

### Fase 3:
- [ ] Animaciones con GSAP
- [ ] Scroll reveal animations
- [ ] Video backgrounds
- [ ] Testimonials en video
- [ ] Live stats from API
- [ ] Multi-idioma (EN/ES)

---

## 🐛 TROUBLESHOOTING

### Problema: Tailwind no funciona
**Solución:**
1. Verifica que `tailwind.config.js` esté en la raíz
2. Asegúrate de que `styles.css` tenga los imports de Tailwind
3. Reinicia el servidor: `ng serve`

### Problema: Componentes no se muestran
**Solución:**
1. Verifica que todos los componentes estén declarados en `app.module.ts`
2. Revisa la consola del navegador para errores
3. Verifica las rutas de los imports

### Problema: Imágenes no cargan
**Solución:**
1. Asegúrate de que las imágenes estén en `/assets/images/`
2. Verifica que los nombres coincidan exactamente
3. Usa rutas relativas: `/assets/images/people/maria-perez.jpg`

### Problema: Carruseles no funcionan
**Solución:**
1. Verifica que `CommonModule` esté importado en el módulo
2. Revisa la consola para errores de TypeScript
3. Asegúrate de que los datos se cargan correctamente

---

## 📞 CONTACTO Y SOPORTE

**Equipo de desarrollo:**
- Email: info@hirably.com
- Website: hirablystaffing.com

**Para reportar bugs:**
Crea un issue en el repositorio con:
- Descripción del problema
- Pasos para reproducirlo
- Screenshots si es posible
- Versión de Angular y navegador

---

## 📄 LICENCIA

© 2025 Hirably. Todos los derechos reservados.
Design by 3DC

---

## 🎉 ¡LISTO!

Tu landing page de Hirably está lista para usarse. Los componentes son completamente funcionales y reutilizables.

**Próximos pasos:**
1. Personaliza los datos en `data.service.ts`
2. Agrega tus propias imágenes
3. Ajusta los colores en `tailwind.config.js`
4. Conecta los formularios a tu backend
5. Deploy a producción

**¡Mucho éxito con tu proyecto! 🚀**
