# AeroTAMLatam (Demo) — Genesys Web Messaging + Digital Bot Flow

Sitio demo estático (HTML/CSS/JS) listo para publicar en **GitHub Pages**.
Pensado para laboratorio de **Genesys Cloud Web Messaging** con **Digital Bot Flow**.

## 1) ¿Qué incluye?
- Landing de aerolínea con paleta **gris + amarillo**
- Botones y formulario para gatillar interacciones
- Sección lista para pegar snippets:
  - (Opcional) **Predictive Engagement/Journey** (ac.js)
  - (Obligatorio) **Web Messaging** (genesys.min.js)
- Página `knowledge.html` con contenedor requerido:
  - `<div id="genesys-support-center"></div>`

## 2) Reemplazos obligatorios (snippets)
Abre `index.html` y reemplaza:
- `REEMPLAZAR_REGION`  
  Ej: `usw2`, `use1`, `euw2`, etc.
- `REEMPLAZAR_DEPLOYMENT_ID`  
  Pega tu deploymentId real de Web Messaging.

Si usarás Journey (opcional), también reemplaza:
- `REEMPLAZAR_JOURNEY_WEBSITE_ID`
- `REEMPLAZAR_REGION` (de Journey, normalmente coincide con tu región)

> Recomendación: para lab de **Digital Bot Flow**, el mínimo es tener **Web Messaging** configurado y el deployment apuntando al bot/flow correspondiente.

## 3) Publicar en GitHub Pages
1. Crea un repo y sube estos archivos al root.
2. En GitHub: **Settings → Pages**
3. Source: `Deploy from a branch`
4. Branch: `main` / folder `/root`
5. Guarda y abre la URL que entrega Pages.

## 4) Checklist de pruebas (LAB)
### Carga y navegación
- [ ] El sitio abre correctamente en GitHub Pages
- [ ] `Knowledge Portal` abre `knowledge.html`
- [ ] `Volver` regresa a `index.html`

### Web Messaging + Digital Bot Flow
- [ ] El messenger carga (widget visible o disponible)
- [ ] “Abrir chat” abre el messenger
- [ ] El bot responde a intenciones básicas:
  - “estado de vuelo”
  - “cambiar vuelo”
  - “equipaje”
- [ ] Handoff a agente (si aplica) funciona

### (Opcional) Journey / Predictive Engagement
> Solo si pegaste ac.js y configuraste el websiteId.
- [ ] Se registra `pageview`
- [ ] Evento `click_cta_hero` al presionar “Buscar vuelos”
- [ ] Evento `click_paquete` al presionar “Cotizar este vuelo”
- [ ] Evento `form_submit` al enviar el formulario

## 5) Instrumentación (eventos)
Los eventos se disparan desde `script.js` usando:
- `ac('record', 'click_cta_hero', {...})`
- `ac('record', 'click_paquete', {...})`
- `ac('record', 'form_submit', {...})`

Si `ac()` no existe (no pegaste Journey), el sitio sigue funcionando sin errores.

## 6) Imágenes
Se usan imágenes genéricas desde Unsplash vía `source.unsplash.com` (hotlink).
Si tu política requiere no hotlinkear, puedes descargar y subirlas al repo, y luego actualizar los `src`.

