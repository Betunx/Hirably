# PLAN DE MIGRACIÓN DE DISEÑO - HIRABLY

## RESUMEN EJECUTIVO

**Objetivo:** Migrar el diseño actual al nuevo diseño de Figma, reutilizando componentes existentes y minimizando trabajo duplicado.

**Estrategia:** Migración por capas (tokens → componentes base → secciones → responsive)

---

## FASE 0: PREPARACIÓN (Hacer primero - ahorra tiempo en todo lo demás)

### 0.1 Actualizar Design Tokens (tailwind.config.js)

**COLORES - Mapeo Actual → Nuevo:**

| Actual | Hex Actual | Nuevo Figma | Hex Nuevo | Acción |
|--------|------------|-------------|-----------|--------|
| bright-amber | #FFCF25 | bright-amber | #FFCF25 | ✅ Mantener |
| dark-amethyst | #201148 | navy-dark | #111f78 | 🔄 Cambiar |
| floral-white | #FFFBF4 | floral-white | #FFFBF4 | ✅ Mantener |
| icy-blue | #B1D8FC | primary-blue | #2291ea | 🔄 Cambiar |
| periwinkle | #D6C9FD | lavender | #e3e1ff | 🔄 Ajustar |
| carbon-black | #1B1B1B | carbon-black | #1B1B1B | ✅ Mantener |
| — | — | mint-green | #d1f9e5 | ➕ Añadir |
| — | — | sky-blue | #bbe2fd | ➕ Añadir |
| — | — | emerald | #10b981 | ➕ Añadir |
| — | — | purple-accent | #6c59d8 | ➕ Añadir |

**TIPOGRAFÍAS:**

| Actual | Nuevo Figma | Acción |
|--------|-------------|--------|
| Poppins | Poppins | ✅ Mantener |
| Inter | DM Sans | 🔄 Cambiar body font |

### 0.2 Crear archivo de variables CSS (opcional pero recomendado)

```scss
// src/styles/_variables.scss
:root {
  // Colores primarios
  --color-primary: #2291ea;
  --color-navy: #111f78;
  --color-amber: #FFCF25;

  // Colores secundarios
  --color-mint: #d1f9e5;
  --color-lavender: #e3e1ff;
  --color-sky: #bbe2fd;

  // Neutrales
  --color-white: #ffffff;
  --color-cream: #fffbf4;
  --color-carbon: #1b1b1b;

  // Gradientes (del Figma)
  --gradient-hero: linear-gradient(180deg, #2291ea 0%, #2291ea 39%, #46a1ea 62%, #c7e3f9 89%, #ffffff 100%);
}
```

---

## FASE 1: COMPONENTES BASE (Reutilizables)

### 1.1 Actualizar `cta-button`
**Archivo:** `src/app/shared/components/cta-button/`

**Cambios:**
- Variante primary: `#2291ea` (nuevo azul)
- Añadir variante "navy": `#111f78`
- Border radius: mantener `rounded-lg`

### 1.2 Actualizar `section-header`
**Archivo:** `src/app/shared/components/section-header/`

**Cambios:**
- Tag color: `#2291ea` (primary-blue)
- Title: Poppins 500 (ya está)
- Description: DM Sans 300

### 1.3 Crear componente `step-number` (NUEVO)
**Para:** Sección "The Hirably Way" con números 01, 02, 03

```typescript
// Inputs: number, color ('blue' | 'mint' | 'lavender')
// Output: Número grande (128px) con color correspondiente
```

---

## FASE 2: SECCIONES - Orden de migración

### PRIORIDAD ALTA (Impacto visual máximo)

#### 2.1 NAVBAR
**Estado actual:** Funcional, necesita ajustes de color
**Cambios:**
- Logo: Verificar que coincida con Figma
- Links: Poppins 500 14px UPPERCASE
- Background: blanco con sombra sutil
- Items: "How it works", "Why nearshore?", "Our roles", "Pricing", "Get started" (CTA)

#### 2.2 HERO SECTION
**Estado actual:** Tiene gradiente y estructura similar
**Cambios MAYORES:**
- Fondo: Gradiente azul vertical (del Figma)
- Titular: "Hire Mexicobased talent..." → "Hiring Mexico based talent..."
- Subtítulo: DM Sans 300
- CTA buttons: "Get Started" (primary) + "Watch video" (outline)
- Remover dashboard mockup actual
- Añadir decoración: formas orgánicas/blobs azules

#### 2.3 FOOTER
**Estado actual:** Básico
**Cambios:**
- Background: `#111f78` (navy)
- Logo: versión blanca
- Links: Contact us, teléfono, email
- Copyright: DM Sans 12px

### PRIORIDAD MEDIA

#### 2.4 "THE HIRABLY WAY" (Nueva sección - reemplaza How It Works)
**Estado actual:** Timeline vertical con 7 pasos
**Cambios:**
- Simplificar a 3 pasos: "We Scout & Screen" → "You Interview & Select" → "We Onboard Instantly"
- Layout: Cards horizontales con números grandes (01, 02, 03)
- Colores números: Azul (#c2e7ff), Verde (#d1f9e5), Lavanda (#e3e1ff)
- Imagen decorativa a la derecha

#### 2.5 "ALL-IN-ONE PLATFORM" (Actualizar existing)
**Archivo:** `all-included-platform`
**Cambios:**
- Titular: "Your hiring chaos, organized into one happy place."
- Subtítulo: Mencionar recruitment, payroll, legal
- Imagen/mockup de plataforma

#### 2.6 "WHY NEARSHORE" (Nueva sección o actualizar feature-carousel)
**Cambios:**
- Titular: "Why top companies are moving from offshore to nearshore."
- Destacar "nearshore" en azul
- Contenido sobre ventajas de México

#### 2.7 "WORLD-CLASS TALENT" (Actualizar roles-carousel)
**Cambios:**
- Titular: "World-Class Talent Across All Functions"
- Imagen de persona recortada
- Lista de roles disponibles

### PRIORIDAD BAJA

#### 2.8 "WHY TEAMS LOVE HIRABLY"
**Estado actual:** why-hirably component
**Cambios:**
- Fondo: mantener oscuro o cambiar según Figma
- Cards de testimonios/beneficios

#### 2.9 "SIMPLE PRICING"
**Estado actual:** pricing-section
**Cambios:**
- Titular: "Simple Pricing. No Surprises."
- Estructura de precios según Figma
- Nota sobre fees y garantías

---

## FASE 3: RESPONSIVE / MÓVIL

### 3.1 Breakpoints a considerar
```
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
```

### 3.2 Ajustes móviles por sección
- **Navbar:** Hamburger menu (ya existe)
- **Hero:** Stack vertical, texto centrado
- **Steps:** Cards apiladas verticalmente
- **Pricing:** Cards apiladas
- **Footer:** Stack vertical

---

## FASE 4: ASSETS Y RECURSOS

### 4.1 Imágenes a exportar de Figma
- [ ] Logo versión azul
- [ ] Logo versión blanca
- [ ] Imagen persona "World-Class Talent"
- [ ] Iconos de pasos (si son custom)
- [ ] Formas decorativas/blobs

### 4.2 Fuentes a añadir
```html
<!-- En index.html o styles.scss -->
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## ORDEN DE EJECUCIÓN RECOMENDADO

```
SESIÓN 1: Fundamentos
├── 0.1 Actualizar tailwind.config.js (colores)
├── 0.2 Añadir DM Sans font
├── 1.1 Actualizar cta-button
└── 1.2 Actualizar section-header

SESIÓN 2: Header y Hero
├── 2.1 Migrar Navbar
└── 2.2 Migrar Hero Section

SESIÓN 3: Contenido Principal
├── 2.4 Crear/migrar "The Hirably Way"
├── 2.5 Actualizar All-in-One Platform
└── 2.6 Crear "Why Nearshore"

SESIÓN 4: Roles y Social Proof
├── 2.7 Actualizar Roles section
└── 2.8 Actualizar Why Teams Love

SESIÓN 5: Pricing y Footer
├── 2.9 Migrar Pricing
└── 2.3 Migrar Footer

SESIÓN 6: Responsive
├── 3.1 Mobile adjustments
└── 3.2 Tablet adjustments

SESIÓN 7: Polish
├── Animaciones
├── Transiciones
└── QA final
```

---

## COMPONENTES A REUTILIZAR VS CREAR

### REUTILIZAR (Adaptar)
| Componente | Cambios necesarios |
|------------|-------------------|
| `cta-button` | Colores |
| `section-header` | Colores, font |
| `navbar` | Colores, items |
| `footer` | Colores, layout |
| `pricing-section` | Colores, contenido |

### CREAR NUEVO
| Componente | Descripción |
|------------|-------------|
| `step-card` | Card para pasos 01, 02, 03 |
| `blob-decoration` | Formas decorativas SVG |

### ELIMINAR/SIMPLIFICAR
| Componente | Razón |
|------------|-------|
| `how-it-works-steps` | Reemplazar por nueva versión simplificada |
| `feature-carousel` | Simplificar o integrar en otra sección |
| Secciones contenedoras | Posiblemente no necesarias |

---

## COMANDOS ÚTILES

```bash
# Exportar imágenes de Figma vía API
curl -H "X-Figma-Token: TOKEN" \
  "https://api.figma.com/v1/images/2ihVZcaS30oRl5GyusLEDX?ids=NODE_ID&format=png&scale=2"

# Servidor de desarrollo
ng serve

# Build de producción
ng build --configuration=production
```

---

## NOTAS IMPORTANTES

1. **No borrar código actual** hasta validar el nuevo
2. **Hacer commits frecuentes** por cada sección migrada
3. **Probar responsive** después de cada cambio mayor
4. **El token de Figma expira** el 4 de febrero 2026

---

## CHECKLIST PRE-MIGRACIÓN

- [ ] Backup del proyecto actual
- [ ] Exportar assets de Figma
- [ ] Confirmar fuentes en Google Fonts
- [ ] Revisar que todos los colores del Figma estén mapeados
- [ ] Definir breakpoints finales
