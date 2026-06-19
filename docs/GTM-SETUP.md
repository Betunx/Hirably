# Hirably — Configuración de GTM (reconciliada con el código)

> Este documento reemplaza los Pasos 3–7 del `Data Layer.docx`. Está ajustado a lo que
> el sitio **realmente** emite hoy (no a la plantilla genérica). Container real:
> **`GTM-57R63H9H`** (ya instalado en [src/index.html](../src/index.html)).
>
> Toda la instrumentación de código (Pasos 1–2 del doc) ya está hecha vía
> [analytics.service.ts](../src/app/services/analytics.service.ts) +
> [engagement-tracker.service.ts](../src/app/services/engagement-tracker.service.ts).
> Este archivo es la guía para configurar el **panel de GTM/GA4** (lado del dueño).

## Diferencias clave vs. el Data Layer.docx (leer primero)

1. **El formulario = la reserva = el lead.** El form de `/contact/:type` no tiene botón
   de enviar; solo se manda al **completar una reserva en Cal.com**. Por eso:
   - **`form_submit` se eliminó** (era idéntico a `generate_lead`, mismo instante → doble conteo).
   - **No hay `booking_confirmed`**: la reserva confirmada **es** el `generate_lead`
     (`lead.source = 'cal_booking'`).
   - **La única conversión "de lead" es `generate_lead`.** No marques otra cosa como
     conversión de lead o contarás la misma acción dos veces.
2. **`button_click` se eliminó** (no se emitía en ninguna parte).
3. **`page_data` se dispara en cada navegación SPA** (no solo en la carga inicial), porque
   es una single-page app de Angular.
4. **Nombres de sección reales** (abajo) — el doc asumía `testimonials/about/contact`, que
   este sitio no tiene.

## Eventos que el sitio emite hoy (10)

| Evento | Cuándo | Dónde |
|---|---|---|
| `page_data` | cada navegación SPA | [app.component.ts](../src/app/app.component.ts) |
| `cta_click` | clic en CTAs (navbar, hero, pricing) | navbar / hero / pricing |
| `contact_click` | clic en email o teléfono | footer + contact-form |
| `outbound_click` | clic en LinkedIn (externo) | footer |
| `form_start` | primer campo tocado del form | contact-form |
| `generate_lead` | **reserva confirmada + Formspree OK (CONVERSIÓN)** | contact-form |
| `scroll_depth` | scroll 25/50/75/90/100 % | engagement-tracker |
| `time_on_page` | 30/60/120/180 s | engagement-tracker |
| `section_view` | sección ≥30 % visible | engagement-tracker |
| `page_not_found` | carga de la página 404 | not-found |

**Nombres de `section.name` reales:** `hero`, `trust_bar`, `services`, `why_nearshore`,
`how_it_works`, `why_hirably`, `roles`, `pricing` (+ `all_included`, hoy pausado).

---

## Paso 1 — Variables de capa de datos (GTM › Variables)

Crear como **"Variable de capa de datos"**, versión **v2** (notación con punto):

| Nombre en GTM | Variable de capa de datos |
|---|---|
| DL - Page Type | `page.type` |
| DL - Page Path | `page.path` |
| DL - Traffic Source | `user.traffic_source` |
| DL - UTM Source | `user.utm_source` |
| DL - UTM Medium | `user.utm_medium` |
| DL - UTM Campaign | `user.utm_campaign` |
| DL - Device | `user.device` |
| DL - CTA Text | `cta.text` |
| DL - CTA Type | `cta.type` |
| DL - Contact Method | `contact.method` |
| DL - Outbound URL | `link.url` |
| DL - Form ID | `form.id` |
| DL - Lead Source | `lead.source` |
| DL - Lead Service | `lead.service_type` |
| DL - Scroll Percent | `scroll.percent` |
| DL - Time Seconds | `engagement.seconds` |
| DL - Section Name | `section.name` |

> Quitadas vs. el doc: `DL - Form Service` (`form.service_type`) ya no se usa (vivía en el
> `form_submit` eliminado).

---

## Paso 2 — Triggers (GTM › Activadores)

Uno por evento, tipo **"Evento personalizado"**, con el nombre exacto del evento:

| Trigger | Nombre del evento |
|---|---|
| CTA Click | `cta_click` |
| Contact Click | `contact_click` |
| Outbound Click | `outbound_click` |
| Form Start | `form_start` |
| **Generate Lead (CONVERSIÓN)** | `generate_lead` |
| Scroll Depth | `scroll_depth` |
| Time on Page | `time_on_page` |
| Section View | `section_view` |
| Error 404 | `page_not_found` |

> `page_data` normalmente no necesita un tag propio; sirve para poblar las variables de
> página/usuario que leen los demás tags. Si quieres un pageview GA4 explícito por
> navegación SPA, crea un trigger de evento personalizado `page_data`.

---

## Paso 3 — Tags GA4 (GTM › Etiquetas)

Todas tipo **"Evento de Google Analytics: GA4"**, usando tu tag de configuración GA4.

| Tag (Nombre del evento GA4) | Parámetros → Variable | Trigger |
|---|---|---|
| `cta_click` | `cta_text`→{{DL - CTA Text}}, `cta_type`→{{DL - CTA Type}}, `page_path`→{{DL - Page Path}}, `traffic_source`→{{DL - Traffic Source}} | CTA Click |
| `contact_click` | `contact_method`→{{DL - Contact Method}}, `page_path`→{{DL - Page Path}} | Contact Click |
| `outbound_click` | `link_url`→{{DL - Outbound URL}}, `page_path`→{{DL - Page Path}} | Outbound Click |
| `form_start` | `form_id`→{{DL - Form ID}}, `page_type`→{{DL - Page Type}} | Form Start |
| **`generate_lead`** | `lead_source`→{{DL - Lead Source}}, `service_type`→{{DL - Lead Service}}, `utm_source`→{{DL - UTM Source}}, `utm_medium`→{{DL - UTM Medium}}, `utm_campaign`→{{DL - UTM Campaign}} | Generate Lead |
| `scroll` | `percent_scrolled`→{{DL - Scroll Percent}}, `page_path`→{{DL - Page Path}} | Scroll Depth |
| `time_on_page` | `seconds`→{{DL - Time Seconds}}, `page_path`→{{DL - Page Path}} | Time on Page |
| `section_view` | `section_name`→{{DL - Section Name}}, `page_path`→{{DL - Page Path}} | Section View |
| `page_not_found` | `page_path`→{{DL - Page Path}} | Error 404 |

---

## Paso 4 — Marcar conversiones en GA4 (Configurar › Eventos)

Marcar como conversión **solo**:

| Evento | Prioridad |
|---|---|
| `generate_lead` | ⭐⭐⭐ Principal (= reserva de llamada) |
| `contact_click` | ⭐⭐ |
| `cta_click` | ⭐ |

> **No** marcar `form_submit` ni `booking_confirmed`: no existen en este sitio. La reserva
> ya está contada por `generate_lead`.

---

## Paso 5 — Verificar (GTM Preview / GA4 DebugView)

1. Activa **Preview** en GTM y abre el sitio.
2. Confirma en el panel:
   - `page_data` al cargar y al navegar entre páginas (home → /roles/... → /contact/...).
   - `cta_click` al hacer clic en "Start Hiring" / "Book a call".
   - `form_start` al tocar el primer campo del formulario.
   - `scroll_depth` (25/50/75/90/100) al hacer scroll; `section_view` al ver cada sección.
   - `generate_lead` al completar una reserva de prueba en Cal.com.
3. En **GA4 DebugView**, verifica que los eventos lleguen con sus parámetros.
4. En consola: `window.dataLayer` debe ir acumulando los `push`.
