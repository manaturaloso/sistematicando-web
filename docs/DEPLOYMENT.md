# Despliegue

No se ha desplegado. Producción requiere autorización explícita.

## Build real

Node 24.22.1; `npm ci`; `ASTRO_TELEMETRY_DISABLED=1 npm run check`; `ASTRO_TELEMETRY_DISABLED=1 npm run build`. Salida estática: dist. Probar con `ASTRO_TELEMETRY_DISABLED=1 npm run preview`. Publicar solo dist, nunca el checkout completo.

## Cloudflare pendiente

Cloudflare Pages con build npm run build, variable ASTRO_TELEMETRY_DISABLED=1 y salida dist es una opción para evaluar cuando se autorice. No se creó proyecto, pipeline, Worker ni DNS. No hay hostname confirmado; pages.dev y workers.dev no son intercambiables. Configurar comportamiento 404 y comprobar rutas en el hosting elegido.

## Antes de indexar o publicar

Resolver identidad y contenido comercial, canal de contacto y privacidad. Aprobar dominio real; entonces añadir canonical/sitemap/metadatos absolutos y retirar noindex/Disallow únicamente con autorización. El build actual bloquea indexación deliberadamente y no contiene formulario ni rastreadores.
