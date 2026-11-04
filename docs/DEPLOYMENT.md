# Worker estático: preparación y despliegue

## Estado real

El usuario desplegó una versión anterior desde `feat/brand-foundation` en **https://sistematicando-web.manaturaloso.workers.dev** y confirmó que la web aparecía. La captura mostraba Workers (no Pages), build command None y deploy `npx wrangler deploy`.

La rama actual `feat/feature-catalog` tiene la configuración reproducible de esta guía. **No se ha desplegado ni integrado a la rama seguida por Cloudflare.** No se consultó ni modificó la cuenta/DNS. La verificación remota sigue pendiente: el proxy del entorno negó el acceso al hostname con 403 en la última consulta.

## Configuración versionada

`wrangler.jsonc`:

- Nombre: sistematicando-web, coincidente con el Worker indicado por el usuario.
- Wrangler 4.157.0 fijado como devDependency y en package-lock.json; Node 24.22.1 usado.
- compatibility_date fija: 2026-01-01. No se actualiza automáticamente con cada build.
- Assets: **solo ./dist**. Sin main, APIs, D1, R2, secretos, rutas de dominio personalizado o código SSR.
- html_handling force-trailing-slash: normaliza /soluciones a /soluciones/ e index.html a la ruta limpia.
- not_found_handling 404-page: sirve la página 404 con estado HTTP 404; no usa fallback SPA.
- Build previo: `node scripts/build-worker.mjs`, que ejecuta npm run build con ASTRO_TELEMETRY_DISABLED=1 y propaga el código de salida. Incluye content:check. Así Wrangler no depende de un dist antiguo ni de un build manual olvidado.
- Watch local de src/content/public; outputs .wrangler y archivos .dev.vars ignorados por Git.

El build de Astro publica 19 páginas actualmente. El CMS puede añadir guías/soluciones y el empaquetado deriva las rutas esperadas desde sus slugs.

## Instalar y validar sin publicar

```sh
npm ci --include=dev
ASTRO_TELEMETRY_DISABLED=1 npm run check
WRANGLER_SEND_METRICS=false npm run worker:check
```

`worker:check` usa **wrangler deploy --dry-run**, reconstruye y valida el paquete en .wrangler/dry-run. No sube archivos, no requiere token ni cambia un Worker. No confundir el texto «Total Upload» del resumen de Wrangler con una carga real: el comando termina con --dry-run: exiting now.

## Probar el runtime local

Terminal 1:

```sh
WRANGLER_SEND_METRICS=false npm run worker:dev
```

Terminal 2:

```sh
npm run test:worker
```

Runtime local en 127.0.0.1:8787. Cerrar con Ctrl+C cuando termine. No es un preview público. En esta máquina requiere permiso para sockets y runtime local. No se inicia sesión ni se usa despliegue remoto.

La prueba comprueba 19 páginas, siete rutas inexistentes/internas, cuatro redirecciones (30 comprobaciones de rutas), query string, bytes de fuentes, robots/noindex, POST rechazado con 405 y cuatro páginas en Chromium móvil. Resumen en docs/qa/worker-report.json.

El runtime local avisó que no podía obtener Request.cf y usó metadatos predeterminados. El Worker es puramente estático y no lee esos metadatos; sus rutas y assets sí se comprobaron. Esto no prueba red, caché, permisos o configuración de la cuenta real.

## Actualización futura en Cloudflare: requiere autorización

Antes de integrar esta rama:

1. Confirmar permisos de la cuenta, Worker objetivo y rama seguida. No asumir que guardar contenido desde CMS está libre de disparar builds.
2. Revisar el diff y los pendientes de ADMIN.md, PRIVACY_REVIEW.md y LAUNCH_CHECKLIST.md.
3. Confirmar instalación con dependencias de desarrollo (npm ci --include=dev), Node 24.22.1 y uso del lockfile.
4. En Workers Builds, el deploy puede usar `npx --no-install wrangler deploy` **solo tras autorización**. La versión local se resuelve desde el lockfile. El custom build versionado genera dist aunque el build command del dashboard esté vacío; si se configura un build separado habrá un rebuild adicional deliberado al desplegar.
5. Verificar después el hostname real, rutas limpias, 404, /admin, fuentes, privacidad y noindex. No añadir dominio oficial, DNS o indexación por el solo hecho de actualizar una vista de revisión.

No se incluye script npm de despliegue ni workflow que publique automáticamente. La configuración está lista para revisión, no constituye autorización de producción ni prueba de despliegue real.

## CMS

/admin es un acceso estático al editor externo de Pages CMS. El propietario debe autorizar su GitHub App para este repositorio y probar un guardado real. Los commits del CMS requieren un nuevo build desde la rama que se quiera publicar. La web no almacena credenciales de GitHub ni Cloudflare.

## Alternativa de carga directa

El ZIP generado por `python3 scripts/package-preview.py` contiene solo assets públicos de dist; no se versiona. Las instrucciones antiguas de Pages eran una alternativa evaluada antes de conocer el Worker actual. Este proyecto prepara **Workers**; no confundir hostname workers.dev con pages.dev ni crear otro proyecto como parte de esta tarea.

## Indexación

Se mantienen noindex y robots Disallow: /. Para un lanzamiento oficial se necesitan dominio aprobado, canonicals/sitemap adecuados y aprobación del contenido y privacidad. Noindex no hace privado el sitio.

## Validación continua

.github/workflows/quality.yml valida pushes de la rama de edición y PR sin ejecutar deploy. Los artefactos no son publicación. Ver CI.md; antes de actualizar el Worker, comprobar el resultado del SHA que se vaya a integrar. No se ha confirmado aún la primera ejecución alojada.

## 2026-11-04 · Guardado real de CMS y marca oficial

El propietario guardó tres imágenes originales y su selección de marca en cuatro commits (1206881, a3803b7, 222f48b, 55f79ee). Se incorporaron con fast-forward, sin sobrescribir trabajo. Dimensiones horizontales corregidas a 7958 × 2005; bytes originales preservados. Cabecera/pie/fav probados en seis anchos con test:brand; hashes versionados. /admin deja de afirmar conexión pendiente. Adorno del hero desplazado 1.5rem para corregir overflow a 900 px.

Check 40 archivos y build 19 páginas aprobados; test:ci local 19 rutas/66 destinos, navegación y axe 41 comprobaciones sin infracciones automáticas. Lighthouse local 100/96/100 rendimiento y SEO 66 por noindex; CLS catálogo 0.119 y peso de PNG quedan pendientes. No certificación WCAG ni métricas de producción. Guardado CMS comprobado mediante Git, sin login del agente. Solo Codex principal.

Rama seguida feat/brand-foundation observada en ed7227d con .pages.yml vacío agregado por el propietario. Simulación de integración sin conflictos conserva el esquema completo; no se hizo integración, push a esa rama, deploy ni cambio DNS. Siguiente paso: autorización explícita para integrar versión validada; antes fetch/revisar cambios concurrentes. Actions alojado y PR existentes sin verificar por API Forbidden.
