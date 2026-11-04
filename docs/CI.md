# Validación automática de ediciones del CMS

## Implementado

Workflow `.github/workflows/quality.yml`, nombre **Site and CMS quality**.

- Push a feat/feature-catalog: comprueba los commits, incluidos los que guarde Pages CMS en esa rama.
- Pull requests: ejecuta la misma validación.
- workflow_dispatch declarado; la disponibilidad del botón manual depende de que GitHub reconozca el workflow en la rama predeterminada.
- Permisos contents:read, sin secretos, tokens de Cloudflare, publicación, merges ni commits automáticos.
- Tiempo máximo 20 minutos; nuevas ejecuciones sustituyen las anteriores del mismo ref.

## Pasos

1. Checkout sin conservar credenciales.
2. Eliminar informes de ejecuciones anteriores para no adjuntarlos como si fueran evidencia actual.
3. Node de .nvmrc y npm ci --include=dev desde el lockfile.
4. Astro check y Worker dry-run; este último incluye el build y content:check.
5. Instalación del Chromium de Playwright en el runner.
6. npm run test:ci: todas las rutas/enlaces, navegación y auditoría axe.
7. Guardar dist y los informes de esta ejecución como artefacto con retención de siete días. Descargar un artefacto no publica una web. Un artefacto de un job fallido no significa que el build esté aprobado.

Las acciones oficiales checkout/setup-node/upload-artifact usan v7 según sus README públicos consultados durante la implementación. No se usan pull_request_target ni tareas de despliegue.

## Pruebas

- verify-site.mjs recorre las rutas compiladas de forma dinámica: títulos únicos, H1, descripción, noindex, IDs, overflow móvil, imágenes y destinos internos/anclas. No visita servicios externos ni inicia sesiones.
- verify-navigation.mjs comprueba menú sin JS, foco, Escape y texto al 200%.
- audit-accessibility.mjs cubre 19 páginas a dos anchos y tres estados interactivos actualmente. Los resultados incomplete se conservan y necesitan revisión aparte.
- CHROMIUM_PATH selecciona un navegador explícito. En Actions, test:ci utiliza el browser descargado por Playwright; en la validación local se usó /usr/bin/chromium.

Para repetir localmente, con dist construido:

```sh
CHROMIUM_PATH=/usr/bin/chromium npm run test:ci
```

El wrapper borra y regenera site-report.json/accessibility-report.json. Revisar su diff antes de guardar. No tocar esos archivos durante otra auditoría. Lighthouse no corre en cada edición: sus resultados históricos son de laboratorio y la variabilidad no se usa como puerta artificial de aprobación.

## Estado comprobado y pendiente

Instalación limpia, check, dry-run y suite equivalente **aprobados localmente**. YAML parseado y estructura/acciones/permisos comprobados; no se ha confirmado todavía una ejecución exitosa del workflow alojado. GitHub puede requerir que el propietario habilite Actions o apruebe una ejecución de un colaborador.

Después de guardar el workflow, revisar **Actions → Site and CMS quality** y comprobar el SHA concreto y el resultado. La API GitHub no está disponible para consultar esos resultados desde esta sesión. No dar por aprobado un job solo porque existe el archivo.

El CMS sigue pendiente de conexión por el propietario (confirmado por él en esta entrega). La primera edición real, autorización GitHub App y subida del logo siguen sin verificar. La rama del Worker se mantiene intacta.
