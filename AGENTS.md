# AGENTS.md — Hirably

Guía para personas y agentes de IA que trabajan en este repositorio.
Léela completa **antes** de editar. El objetivo es que puedas hacer cambios
(sobre todo de texto y contenido) sin romper lo que ya funciona.

---

## 1. Qué es este proyecto

Landing page de **Hirably** (nearshore staffing / EOR en México).
Sitio estático de marketing con formularios de captación de leads.

- **Framework:** Angular 17 (módulos + componentes standalone mezclados).
- **Estilos:** TailwindCSS 3 (utilidades en el HTML) + tokens de color/tipografía
  en [tailwind.config.js](tailwind.config.js).
- **Hosting:** Vercel (SPA, ver [vercel.json](vercel.json)).
- **Leads:** los formularios se envían a **Formspree**; el agendado de llamadas
  usa el **embed de Cal.com**.
- **Idioma del producto:** todo el texto visible está en **inglés** (la audiencia
  es EE. UU.). Esta guía está en español para el equipo.

---

## 2. Arranque rápido

El gestor de paquetes es **pnpm** (más rápido y estricto que npm). No uses `npm`.

```bash
pnpm install
pnpm start          # ng serve en http://localhost:4200
pnpm run build      # build de producción (lo que se despliega)
pnpm run lint       # ESLint
```

Requisitos: Node 20+ y `pnpm` (`npm i -g pnpm`). No hay tests automatizados (ver §8).

> Nota pnpm: los build scripts nativos (`esbuild`, `sharp`) están aprobados en
> [pnpm-workspace.yaml](pnpm-workspace.yaml) (`allowBuilds`). Si tras un `pnpm install`
> el build falla por esbuild/sharp, corre `pnpm rebuild esbuild sharp`.

---

## 3. Mapa del código (dónde tocar qué)

```
src/
├─ app/
│  ├─ pages/
│  │  ├─ home/              ← arma la landing (orden de secciones)
│  │  ├─ department/        ← páginas por departamento (/roles/:departmentId)
│  │  ├─ contact-form/      ← formularios + embed de Cal.com (/contact/:type)
│  │  └─ not-found/
│  ├─ components/           ← secciones de la landing (hero, pricing, roles, etc.)
│  ├─ core/                 ← navbar y footer
│  ├─ services/
│  │  └─ data.service.ts    ← ★ TODO el contenido de las secciones y departamentos
│  ├─ models/index.ts       ← interfaces TypeScript del contenido
│  └─ app-routing.module.ts ← rutas
├─ environments/            ← endpoint de Formspree
└─ assets/img/              ← imágenes
```

### Dónde vive el texto que normalmente querrás editar
- **Secciones de la home, pricing, roles, pasos:** [src/app/services/data.service.ts](src/app/services/data.service.ts)
- **Páginas de departamento (Technology, Finance, Sales, Marketing, Operations):**
  el objeto `departmentsData` en el mismo [data.service.ts](src/app/services/data.service.ts)
- **Formularios (títulos, bullets, campos, opciones de selects):**
  [src/app/pages/contact-form/contact-form.config.ts](src/app/pages/contact-form/contact-form.config.ts)
- **Navbar / Footer:** [src/app/core/navbar/navbar.component.html](src/app/core/navbar/navbar.component.html) y [src/app/core/footer/footer.component.html](src/app/core/footer/footer.component.html)

> Regla general: **el contenido vive en archivos `.ts` de datos/config, no en el HTML.**
> El HTML solo dibuja; los textos casi siempre salen de `data.service.ts` o
> `contact-form.config.ts`.

---

## 4. Reglas para editar sin romper nada

Estas son las que más importan para un Jr o un agente que solo cambia textos.

1. **Solo cambia lo que está entre comillas.**
   En `data.service.ts` / `contact-form.config.ts`, edita el texto dentro de
   `'...'` o `"..."`. **No** toques los nombres de campo a la izquierda
   (`title:`, `description:`, `icon:`, `value:`, etc.).

2. **No borres comas, llaves `{}` ni corchetes `[]`.**
   Si quitas una coma o desbalanceas una llave, la app deja de compilar.
   Cada objeto va separado por coma; cada lista va entre `[ ]`.

3. **Comillas dentro del texto:** si el texto lleva un apóstrofo (`it's`), el
   string usa comillas dobles `"It's..."` o se escapa `'It\'s...'`.
   Respeta el estilo que ya tenga la línea; no mezcles.

4. **Saltos de línea:** un `\n` dentro de un string es un salto de línea
   intencional (p. ej. en `heroSubtitle`). No lo borres salvo que quieras unir
   las líneas.

5. **No inventes `value:` en los selects.** En
   [contact-form.config.ts](src/app/pages/contact-form/contact-form.config.ts)
   cada opción tiene `value` (lo que se envía) y `label` (lo que se ve). Cambia
   el `label` libremente; cambia el `value` solo si sabes lo que haces.

6. **Imágenes:** usa rutas existentes en `assets/img/...`. Si referencias una
   imagen que no existe, saldrá rota. Sube primero el archivo a `src/assets/img/`.

7. **Colores y clases:** usa los tokens ya definidos en
   [tailwind.config.js](tailwind.config.js) (p. ej. `text-navy-dark`,
   `bg-bright-amber`). No metas hex sueltos salvo siguiendo el patrón existente.

8. **Antes de terminar:** corre `pnpm run build`. Si compila, no rompiste la
   estructura. `pnpm run lint` para el estilo.

### Lo que NO debe tocar quien solo edita contenido
- Lógica del formulario y del embed de Cal: [contact-form.component.ts](src/app/pages/contact-form/contact-form.component.ts)
- Rutas: [app-routing.module.ts](src/app/app-routing.module.ts)
- Cabeceras de seguridad / CSP: [vercel.json](vercel.json) (ver §6)
- Interfaces de [models/index.ts](src/app/models/index.ts)

---

## 5. Cómo funcionan los formularios (contexto)

Ruta: `/contact/:type` con `type` ∈
`book-a-call | start-hiring | eor-services | get-a-quote`.

- La apariencia y los campos de cada formulario salen de `FORM_CONFIGS` en
  [contact-form.config.ts](src/app/pages/contact-form/contact-form.config.ts).
- El usuario llena el formulario y **agenda en el widget embebido de Cal.com**
  (`calLink: 'hirably/30min'`).
- Al confirmar la reserva (`bookingSuccessful`), el componente envía los datos
  del formulario **+** los de la reserva a **Formspree**
  (`environment.formspreeEndpoint`).
- Al enviarse a Formspree con éxito se disparan los eventos de analítica
  `form_submit` y `generate_lead` (ver §6.1).

Si cambias el `calLink` o el endpoint de Formspree, actualiza también §6 (CSP).

---

## 6. Integraciones externas (cuidado al cambiarlas)

| Servicio   | Dónde se configura                                   | Nota |
|------------|------------------------------------------------------|------|
| Formspree  | `formspreeEndpoint` en `src/environments/*.ts`       | Recibe los leads |
| Cal.com    | `calLink` en `contact-form.component.ts` + script en `index.html` | Agendado |
| GTM / GA4  | `index.html` (`GTM-57R63H9H`) + `analytics.service.ts`           | Tracking (ver §6.1) |
| CSP        | `Content-Security-Policy` en [vercel.json](vercel.json) | Lista blanca de dominios |

⚠️ **CSP:** si agregas un script, iframe o llamada a un dominio nuevo
(analytics, chat, otro proveedor), **debes** añadir ese dominio a la
`Content-Security-Policy` en [vercel.json](vercel.json) o el navegador lo
bloqueará en producción (en local puede que no se note).

### 6.1 Analítica / Data Layer (Google Tag Manager)

GTM ya está instalado en [src/index.html](src/index.html) (contenedor `GTM-57R63H9H`).
Todo el tracking del sitio pasa por **un solo servicio**:

- [src/app/services/analytics.service.ts](src/app/services/analytics.service.ts) —
  wrapper de `window.dataLayer`. **Nunca llames a `window.dataLayer.push` directo;**
  usa un método del servicio (`ctaClick`, `formSubmit`, `generateLead`, etc.).
- [src/app/services/engagement-tracker.service.ts](src/app/services/engagement-tracker.service.ts) —
  scroll depth, time on page y `section_view` (IntersectionObserver). Se reinicia
  en cada navegación desde [app.component.ts](src/app/app.component.ts).

Eventos que emite el data layer: `page_data`, `cta_click`, `contact_click`,
`outbound_click`, `form_start`, `form_submit`, `generate_lead`, `scroll_depth`,
`time_on_page`, `section_view`, `page_not_found`.

Notas para no romper el tracking:
- Las secciones de la home llevan `data-section="..."` en su `<section>` raíz —
  **no lo borres** o se pierde `section_view`.
- Los CTAs (navbar, hero, pricing) llaman al servicio dentro de sus handlers.
- La **config del panel de GTM** (variables, triggers, tags, conversiones GA4) la
  hace el dueño del proyecto en la web de GTM/GA4, no en el código (ver `docs/Data Layer.docx`).
- La CSP de `vercel.json` ya permite `googletagmanager.com` y `google-analytics.com`.

---

## 7. Estado del proyecto — Pendientes

> Última actualización: **2026-06-16**. Mantén esta sección al día al cerrar tareas.

**Hecho recientemente**
- Migración del selector de horario propio al **embed de Cal.com** en todos los
  formularios (commit `a9d9928`).
- Migración de gestor de paquetes **npm → pnpm**.
- **FASE A — Data Layer / GTM completa** (todos los eventos en código). Ver Bitácora §10.

**Pendiente / por trabajar**
- [ ] **FASE B — Cambios Página** (doc `Cambios Pagina.docx`): pricing, headline del
      hero, renombres de pillars, arreglos de copy y, **al final**, reorden de
      secciones + Trust bar. Plan: `~/.claude/plans/docs-aqui-meti-2-quiet-globe.md`.
- [ ] **Decisiones abiertas de Fase B:** posición de Services/All-included en el nuevo
      orden; qué hacer con la mención de "90 days" del card Risk-Free Trial; logos de
      la Trust bar (los entrega el dueño).
- [ ] **Validar Fase A en GTM Preview / GA4 DebugView** y configurar variables/triggers/
      tags/conversiones en el panel de GTM (lado no-código, lo hace el dueño).
- [ ] Revisar el flujo de los 4 formularios en móvil tras el cambio a Cal.com.
- [ ] No hay tests automatizados — la verificación es manual (ver §8).

**Conocido / deuda técnica**
- El contenido está hardcodeado en TS (no hay CMS). Cualquier cambio de texto
  pasa por código + redeploy.
- `home.component.html` define el orden de las secciones; cambiar orden = mover bloques.

---

## 8. Checklist antes de commit / desplegar

1. `pnpm run build` compila sin errores.
2. `pnpm run lint` sin errores nuevos.
3. Revisión visual en `pnpm start` (desktop **y** móvil).
4. Si tocaste formularios: probar el agendado y que llegue el lead a Formspree.
5. Si tocaste analítica: verificar eventos en GTM Preview / consola (`window.dataLayer`).
6. Si agregaste un dominio externo: actualizar la CSP en `vercel.json`.
7. Deploy: lo hace el dueño del proyecto cuando está listo (`vercel --prod`).

---

## 9. Para agentes de IA — convenciones

- **Localiza antes de editar.** Casi todo el texto está en `data.service.ts` o
  `contact-form.config.ts`. Busca ahí primero en vez de adivinar en el HTML.
- **No cambies la forma de los datos.** Respeta las interfaces de
  [models/index.ts](src/app/models/index.ts) y los tipos de
  [contact-form.config.ts](src/app/pages/contact-form/contact-form.config.ts).
  Añadir/quitar campos requiere actualizar la interfaz **y** la plantilla.
- **Cambios mínimos y enfocados.** No reformatees archivos enteros ni reordenes
  imports/datos si solo te pidieron un texto.
- **Verifica con build, no por inspección.** Tras editar, corre `pnpm run build`.
- **Idioma del sitio = inglés.** El texto visible para el usuario va en inglés,
  aunque la conversación sea en español.
- **Actualiza la §7 y la Bitácora §10** cuando completes o agregues trabajo.

---

## 10. Bitácora de implementación

Registro cronológico para validar que lo planeado se implementó y dónde quedó.
Una entrada por bloque de trabajo. Más reciente arriba.

### 2026-06-16 — FASE A: Data Layer / GTM (todos los eventos en código) ✅

**Qué se hizo:** se instrumentó el sitio para Google Tag Manager poblando
`window.dataLayer`, de forma idiomática para SPA Angular (servicio + router events +
IntersectionObserver), en vez del `hirably-datalayer.js` global que sugería el doc.
**Build de producción: OK.** Pendiente: validación en GTM Preview/GA4 y config del panel (dueño).

| Evento | Disparador | Dónde quedó |
|--------|-----------|-------------|
| `page_data` | cada `NavigationEnd` (incl. carga inicial) | [app.component.ts](src/app/app.component.ts) → `AnalyticsService.pageData` |
| `cta_click` | handlers de CTAs | [navbar](src/app/core/navbar/navbar.component.ts), [hero](src/app/components/hero-section/hero-section.component.ts), [pricing](src/app/components/pricing-section/pricing-section.component.ts) |
| `contact_click` | clic en `tel:` / `mailto:` | [footer.component.html](src/app/core/footer/footer.component.html) + [contact-form](src/app/pages/contact-form/contact-form.component.ts) |
| `outbound_click` | clic en LinkedIn (externo) | [footer.component.html](src/app/core/footer/footer.component.html) |
| `form_start` | primer `focusin` del formulario | [contact-form.component.ts](src/app/pages/contact-form/contact-form.component.ts) (`onFormStart`) |
| `form_submit` | éxito de envío a Formspree | [contact-form.component.ts](src/app/pages/contact-form/contact-form.component.ts) |
| `generate_lead` | éxito de envío (conversión) | [contact-form.component.ts](src/app/pages/contact-form/contact-form.component.ts) |
| `scroll_depth` | 25/50/75/90/100 % | [engagement-tracker.service.ts](src/app/services/engagement-tracker.service.ts) |
| `time_on_page` | 30/60/120/180 s | [engagement-tracker.service.ts](src/app/services/engagement-tracker.service.ts) |
| `section_view` | sección ≥30 % visible | observer sobre `[data-section]` (raíces de secciones) |
| `page_not_found` | `ngOnInit` de la 404 | [not-found.component.ts](src/app/pages/not-found/not-found.component.ts) |

**Archivos nuevos:** `analytics.service.ts`, `engagement-tracker.service.ts`.
**Refactor:** se eliminó el `pushGtmEvent` y el `declare dataLayer` duplicado del
contact-form; ahora todo pasa por `AnalyticsService`.
**Cómo validar:** `pnpm start` → consola → `window.dataLayer` debe ir recibiendo los
eventos al navegar, hacer clic en CTAs, enfocar el formulario, hacer scroll y completar
una reserva. Luego confirmar en GTM Preview / GA4 DebugView.

### 2026-06-16 — Migración npm → pnpm ✅
Se cambió el gestor de paquetes a pnpm. Se aprobaron los build scripts nativos
(`esbuild`, `sharp`) en [pnpm-workspace.yaml](pnpm-workspace.yaml). `package-lock.json`
eliminado; lockfile ahora es `pnpm-lock.yaml`.
