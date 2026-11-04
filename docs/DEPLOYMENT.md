# Worker estático: preparación y despliegue

## Estado real

El usuario desplegó una versión anterior desde `feat/brand-foundation` en **https://sistematicando-web.manaturaloso.workers.dev** y confirmó que la web aparecía. La captura mostraba Workers (no Pages), build command None y deploy `npx wrangler deploy`.

El usuario autorizó integrar `feat/feature-catalog` en `feat/brand-foundation` para actualizar el Worker. Se integró ec19bb7 sobre ed7227d sin conflictos y se envía por Git a la rama seguida. No se cambió DNS ni indexación. El push permite a Workers Builds iniciar el despliegue; su éxito no está confirmado: el proxy bloquea el hostname con CONNECT 403 y la API GitHub devuelve Forbidden. Consultar el commit final con git log -1 en feat/brand-foundation.

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

El build de Astro genera 20 páginas actualmente, incluida /contacto/. El CMS puede añadir guías/soluciones y el empaquetado deriva las rutas esperadas desde sus slugs.

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

/admin es un acceso estático al editor externo de Pages CMS. El propietario ya autorizó su GitHub App y guardó tres logos y su selección de marca (commits 1206881–55f79ee). Los commits del CMS requieren un nuevo build desde la rama que se quiera publicar. La web no almacena credenciales de GitHub ni Cloudflare.

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

## 2026-11-04 · Integración autorizada para Worker

El usuario respondió «Sí. autorizo.» a integrar ec19bb7 en feat/brand-foundation para actualizar el Worker público. Fetch confirmó ambas puntas sin cambios nuevos; merge sin conflictos sobre ed7227d conserva el .pages.yml completo, originales y commits del propietario. Integración directa mediante push normal; sin force-push, DNS, secretos nuevos ni retirada de noindex. No se crea PR. Solo Codex principal.

Pruebas funcionales de ec19bb7 siguen vigentes porque no cambia el árbol de aplicación integrado; se repite worker:check del merge como comprobación de paquete. Comprobación remota: curl al Worker bloqueado por proxy (CONNECT 403), consulta Actions por gh bloqueada (Forbidden). No afirmar publicación exitosa ni CI remoto verde. Siguiente paso exacto: comprobar build de este commit en Cloudflare Deployments y recorrer rutas/logo/admin en el hostname; después continuar desarrollo en feat/feature-catalog sincronizada, sin más publicaciones implícitas.

## 2026-11-04 · Identidad Git y despliegue confirmado por captura

El propietario solicita usar siempre Joel Alejandro Yañez Caballero. Configuración local del repositorio aplicada: user.name con ese nombre, user.email joel.yc23@gmail.com (correo previamente confirmado). Verificados autor y committer efectivos con git var; ambos correctos. La configuración local prevalece sobre la identidad global heredada del entorno. AGENTS.md registra cómo replicarla en futuros checkouts; .git/config no se versiona. No se reescribe el historial publicado.

La captura aportada por el propietario muestra build Cloudflare #7b8076e1 exitoso, rama feat/brand-foundation, commit 9a017af, mensaje de integración y todas las etapas verdes. Confirma el build/despliegue en el dashboard, sin afirmar recorrido funcional remoto por el agente. ID de versión de la captura anterior: f53f452e; diferente del SHA Git.

Entrega solo de configuración/documentación en feat/feature-catalog, sin nueva publicación. Verificación: identidad efectiva y git diff --check; no se repiten pruebas de aplicación porque su código no cambia. Agente: Codex principal, sin subagentes. Siguiente paso exacto: recorrer el Worker publicado (logo, /admin, catálogo, demo, privacidad y 404); luego resolver CLS del catálogo y revisión comercial/legal. Consultar git log -1 para el commit documental y git ls-remote para persistencia. No se creó PR; PR existentes sin verificar por limitación API ya documentada.

## 2026-11-04 · Entrega preparada para integración, sin publicación

Revisión concreta en RELEASE_REVIEW.md: aplicación cfad1a7 contra Worker 9a017af, contacto/CMS/marca/estabilidad/accesibilidad acumulados. Fetch sin cambios nuevos; destino antecesor e integración simulada sin conflictos. Worker dry-run repetido y aprobado (20 páginas, 59 archivos, sin carga); wrangler.jsonc idéntico. Se mantienen los resultados locales previos del mismo código: 20 rutas/68 destinos y axe 44 comprobaciones. No se repite toda la suite para una entrega solo documental.

Consulta Actions del candidato cfad1a7 bloqueada por Forbidden; verde de 296dc05 confirmado por el propietario no prueba este último. Candidato de entrega añade solo este registro y revisión sobre cfad1a7. Rama feat/feature-catalog; objetivo feat/brand-foundation sigue 9a017af, sin merge/push/deploy a esa rama. Sin PR creada, existentes sin verificar. Autor Joel Alejandro Yañez Caballero; agente Codex principal, sin subagentes.

Siguiente paso exacto: autorización explícita para integrar la entrega descrita y actualizar el Worker público; después fetch, integración segura, push y verificación de build/SHA/versión activa y rutas. Esta confirmación se necesita por la instrucción del propietario de no publicar sin autorización; la aprobación anterior correspondía a 9a017af. Mantener DNS/noindex y pendientes comerciales/legales/dispositivos.

## 2026-11-04 · Actualización del Worker autorizada

El propietario respondió «Sí, autorizo.» a integrar la entrega 0041ff9 de feat/feature-catalog en feat/brand-foundation y actualizar el Worker público. Fetch confirmó origen 0041ff9 y destino 9a017af sin cambios concurrentes. Aplicación idéntica a cfad1a7 (comparadas rutas de código, contenido, scripts, recursos, dependencias, configuración CMS/Worker/CI); solo documentación añadida. Se integra mediante fast-forward, sin reescribir historial ni crear PR.

Validaciones vigentes del código aprobado: check/build y dry-run (20 páginas, 59 assets); suite 20 rutas/68 destinos, marca/editorial/contactos y axe 44 comprobaciones sin infracciones. No se repiten pruebas para registrar la autorización. Identidad efectiva autor/committer Joel Alejandro Yañez Caballero. Solo Codex principal, sin subagentes. No se cambian DNS/noindex ni se añaden bindings/secretos.

El push de feat/brand-foundation permite activar Workers Builds. Resultado de despliegue/versión activa pendiente de verificar; no equivale a éxito por guardar Git. Revisar el SHA final con git log -1 en ambas ramas y git ls-remote. No se creó PR; existentes y Actions remoto no verificables por API Forbidden. Siguiente paso: comprobar en Cloudflare el build de ese SHA, Ready y versión activa; recorrer home/contacto/admin/catálogo/demo/privacidad/404. Mantener las ediciones futuras en feat/feature-catalog; esta autorización es para esta entrega concreta.
