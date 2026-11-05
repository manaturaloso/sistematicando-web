# Sistematicando Web

Web comercial estática con Astro + TypeScript y CSS nativo. 41 páginas HTML, contacto WhatsApp, guía local descargable, catálogo conceptual, recursos, recorrido de implementación y CMS conectado a GitHub. Sin integración operativa del SaaS ni receptor propio de leads. Privacidad y contenido comercial pendientes de revisión final; noindex activo.

## Continuidad

Leer [AGENTS.md](AGENTS.md), [HANDOFF.md](docs/HANDOFF.md), [PROGRESS.md](docs/PROGRESS.md) y [DECISIONS.md](docs/DECISIONS.md). El brief en docs/PROJECT_BRIEF.md es referencia, no autorización de despliegue. Historial íntegro en docs/PROGRESS_HISTORY.md y docs/DECISIONS_HISTORY.md.

Rama de desarrollo/CMS: feat/feature-catalog. Rama seguida por Cloudflare: feat/brand-foundation, último envío anterior 557222e. Última identidad pública aportada por el propietario: af35674; no se ha confirmado el envío posterior desde el entorno. **La web de lanzamiento de 41 páginas no se publica ahora.** Preparación y capturas en [LAUNCH_PREVIEW.md](docs/LAUNCH_PREVIEW.md).

## Desarrollo y pruebas

Node 24.22.1, fijado en .nvmrc; dependencias desde lockfile:

```sh
npm ci --include=dev
ASTRO_TELEMETRY_DISABLED=1 npm run check
ASTRO_TELEMETRY_DISABLED=1 npm run build
ASTRO_TELEMETRY_DISABLED=1 npm run dev -- --port 4321
```

`npm run test:ci` usa un servidor efímero y navegador Playwright instalado. En esta máquina: `CHROMIUM_PATH=/usr/bin/chromium npm run test:ci`. Instalación y permisos en [HANDOFF.md](docs/HANDOFF.md). Recompilar tras cambiar HEAD para que el identificador del build coincida. Scripts Python antiguos son comprobaciones auxiliares históricas; el flujo principal y actualizado es test:ci.

Resultado local registrado: 41 rutas/152 destinos internos; marca a seis anchos DPR1/2; contactos/editorial/descarga; identificación Git; axe 86 comprobaciones sin infracciones detectadas. Incomplete y límites en [QUALITY.md](docs/QUALITY.md); no certificación WCAG ni métricas de producción.

## Editar contenido

/admin abre Pages CMS externo con autenticación GitHub: 32 editores, medios y guardados reales verificados. Fuente editable content/*.json; src/data son adaptadores. [ADMIN.md](docs/ADMIN.md) describe textos por página, logos, contactos y guía/buscador. Estructura y lógica requieren desarrollo; no es constructor visual arbitrario.

- `npm run content:check`: referencias y campos; también antes de build.
- `npm run cms:config`: regenera .pages.yml cuando cambia el esquema, no con cada edición.
- `npm run docs:features`: regenera la matriz conceptual, sin convertir estados en evidencia.
- public/fonts: originales y licencias Gluten/Manrope. public/media: logos originales; Astro genera derivados en dist/_astro sin sobrescribirlos.

## Worker y versión

[DEPLOYMENT.md](docs/DEPLOYMENT.md) explica Wrangler fijado, assets solo dist, build obligatorio, barra final y 404 real. `WRANGLER_SEND_METRICS=false npm run worker:check` es dry-run y no publica. Runtime local con worker:dev/test:worker; detener al terminar. /version.json y /admin identifican commit/fecha/sourceModified de los archivos compilados, no estado de despliegue.

Cloudflare puede desplegar al recibir commits en feat/brand-foundation. No integrar, cambiar DNS o retirar noindex sin autorización concreta. Preparar ZIP con `python3 scripts/package-preview.py` tampoco publica: salida fuera del checkout y solo assets de dist. No desplegar el repositorio completo ni confundir Workers con Pages.

## Pendientes

Versión activa identificada; quedan CI remoto, revisión manual con dispositivos/lector; evidencia real de módulos SaaS, tarifas y revisión/adopción de privacidad; dominio/SEO/indexación aprobados. Contactos confirmados en content/contact.json. No inventar precios, capacidades, testimonios ni envíos.

## Preparación de lanzamiento (directiva vigente)

Producto parcialmente desarrollado: se trabaja la web objetivo como plataforma completa, sin publicar nuevas versiones hasta confirmación del propietario de producto/web al 100% y autorización final. Borrador identificado por launchDraft; noindex intacto. Las 14 páginas /funcionalidades/<id>/ usan copy comercial editable, con matriz operativa separada. El catálogo y los sectores enlazan los módulos. Precios presenta consulta personalizada, sin cifras ni contratos inventados.

Esta entrega solo se guarda en feat/feature-catalog. No enviar a feat/brand-foundation ni interpretar un siguiente «sigamos» de desarrollo como autorización de lanzamiento.
