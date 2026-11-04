# Sistematicando Web

Web comercial en desarrollo, construida con Astro + TypeScript y CSS nativo. Home, soluciones con seis páginas sectoriales catálogo de 14 módulos, precios informativos y guía local de demo, sin integración SaaS ni recepción propia de formularios. Contacto voluntario por WhatsApp en la página de demo. El usuario reportó una versión anterior desplegada en un Worker; esta rama de catálogo no se ha desplegado.

## Continuidad entre cuentas

Leer `AGENTS.md`, `docs/PROGRESS.md`, `docs/DECISIONS.md` y `docs/BRAND.md` antes de trabajar. Revisar rama e historial remoto. `docs/PROJECT_BRIEF.md` conserva el brief como referencia; no autoriza despliegues ni acciones externas.

## Desarrollo

Node 24.22.1 (pin en .nvmrc), npm 11.9.0 usados en esta entrega.

```sh
npm ci
ASTRO_TELEMETRY_DISABLED=1 npm run dev -- --port 4321
ASTRO_TELEMETRY_DISABLED=1 npm run check
ASTRO_TELEMETRY_DISABLED=1 npm run build
ASTRO_TELEMETRY_DISABLED=1 npm run preview -- --port 4321
```

`ASTRO_TELEMETRY_DISABLED=1` evita que Astro intente guardar configuración fuera del workspace. En PowerShell establecer `$env:ASTRO_TELEMETRY_DISABLED="1"` antes de ejecutar npm. Servicios y procesos no sobreviven necesariamente a una nueva sesión: iniciarlos cuando se necesiten.

## Estructura

- `src/pages/index.astro`: home. `404.astro`: página de error.
- `src/pages/soluciones/`: índice y plantilla sectorial; contenido tipado en `src/data/solutions.ts`.
- `src/pages/precios/` y `src/pages/solicitar-demo/`: alcance sin tarifas y guía local descargable, sin receptor propio.
- `src/pages/funcionalidades/`: catálogo y búsqueda; fuente de módulos en `src/data/features.ts`. Regenerar la matriz con `npm run docs:features` al editarla.
- `src/pages/legal/privacidad.astro`: política en revisión. Datos confirmados en `src/data/contact.ts`; actualizar ahí el correo o WhatsApp si cambian.
- `src/components/`: cabecera, pie, mockup conceptual e iconos SVG.
- `src/layouts/Layout.astro`: documento, metadatos y noindex.
- `src/styles/home.css`: estilos responsive y fuentes en /fonts.
- `public/fonts/`: fuentes originales y licencias. `public/robots.txt`: bloquea rastreo mientras esté en desarrollo.
- `docs/`: continuidad y referencia de marca; no se incluye en dist.

La referencia anterior `docs/brand-preview.html` permanece independiente. Para verla, servir la raíz con `python3 -m http.server 4321 --bind 127.0.0.1`; esto es solo una herramienta local, nunca un despliegue de todo el repositorio. La home Astro usa /fonts, mientras esa referencia conserva /public/fonts para el servidor independiente.

## QA del build

Tras compilar, iniciar `python3 -m http.server 4322 --bind 127.0.0.1 --directory dist`. En otra terminal ejecutar `python3 scripts/verify-home.py` , `python3 scripts/verify-solutions.py` , `python3 scripts/verify-features.py` , `python3 scripts/verify-commercial.py` y `python3 scripts/verify-privacy.py`. Requiere Playwright Python y Chromium en /usr/bin/chromium, disponibles en el entorno usado; no son dependencias de ejecución del sitio. Resultados y límites en docs/QA.md.

Producción: subir únicamente dist después de autorización. No desplegar aún: faltan logos, validación comercial, contacto real y revisión legal. Ver docs/DEPLOYMENT.md.

## ZIP para revisión compartible

Tras el build: `python3 scripts/package-preview.py`. El archivo queda fuera del checkout en `/workspace/sistematicando-preview.zip`. La guía de carga directa en un proyecto de revisión de Cloudflare Pages está en docs/DEPLOYMENT.md. Preparar el ZIP no publica el sitio.

Rama actual de trabajo: feat/feature-catalog. Cloudflare sigue la rama anterior feat/brand-foundation según la configuración compartida; revisar sus triggers antes de integrar. No actualizar la rama desplegada sin autorización.
