# Compatibilidad y movimiento reducido · 5 de noviembre de 2026

Pruebas locales sobre build estático, sin publicación. Tres flujos: menú/FAQ, buscador y guía de demo. No son pruebas con teléfonos físicos ni certificación de versiones comerciales de Safari, Firefox o Chrome.

| Motor | Disponibilidad local | Resultado | Alcance |
| --- | --- | --- | --- |
| Chromium 155.0.8059.79 | Binario del sistema instalado | Cinco escenarios aprobados | 390/1440 px × movimiento normal/reducido; fallback móvil sin JS |
| Firefox de Playwright | No instalado | No ejecutado | CI preparada; resultado real pendiente |
| WebKit de Playwright | No instalado | No ejecutado | CI preparada; no equivale a Safari físico |

Los binarios Firefox/WebKit no están instalados; sus destinos de descarga no figuran en la política de red vigente. No se intentó sortear esa política ni se modificó el entorno. El informe conserva unavailable y allEnginesTested false, nunca «aprobado». Una cuenta/entorno con esos navegadores puede ejecutar la misma prueba. La disponibilidad no demuestra por sí sola compatibilidad: se registra la versión ejecutada y cada caso.

## Casos ejecutados

- Movimiento normal y reducido, a 390 y 1440 px: enlace de salto por teclado, menú móvil y Escape/devolución del foco, nav de escritorio y FAQ nativa.
- En modo reducido: matchMedia coincide, la FAQ no aplica animación y el botón no aplica transiciones. El contenido y los controles permanecen accesibles.
- Búsqueda con coincidencias, cero resultados y recuperación por enlace de área; recuento/catálogo conservado.
- Guía: validación vacía/foco, generación/foco del resultado, descarga TXT y contenido exacto, invalidación al cambiar y reset/foco.
- La guía no modifica el enlace de WhatsApp ni envía mensajes; las solicitudes fuera del origen local se bloquean y se consideran fallo. Sin almacenamiento persistente ni errores JS en los flujos probados.
- Sin JavaScript a 390/reduce: enlaces de menú visibles, buscador oculto con todo el catálogo disponible, guía interactiva oculta y contacto voluntario accesible.

No se requirieron cambios de frontend. Informe: qa/compatibility-report.json, con identidad del build y resultados. La instantánea validada puede indicar cambios locales por scripts; no se reasigna al SHA posterior al commit.

## Ejecución y CI estricta

```sh
ASTRO_TELEMETRY_DISABLED=1 npm run build
CHROMIUM_PATH=/usr/bin/chromium npm run test:compatibility
# En un entorno donde estén permitidos/instalados los tres motores:
npx --no-install playwright install --with-deps chromium firefox webkit
COMPAT_REQUIRED_ENGINES=chromium,firefox,webkit npm run test:compatibility
```

Chromium es obligatorio localmente por defecto. En CI se instalan los tres y se exigen mediante COMPAT_REQUIRED_ENGINES; un motor obligatorio ausente o que no arranque produce fallo y no un skip verde. La prueba está incluida en test:ci y el JSON se guarda como artefacto. Antes de instalar/medir, el workflow elimina evidencia antigua de todas las salidas de esa suite para no subir un informe heredado si falla la preparación.

Control negativo local: con los tres obligatorios, Chromium pasó y faltaron Firefox/WebKit; el comando terminó con código 1 como debía. qa/compatibility-required-guard.json registra ese resultado esperado. Después se ejecutó la suite local normal, que vuelve a registrar los motores ausentes sin adjudicarles aprobación. Este control no afirma que la CI remota haya pasado ni sustituye sus resultados reales.

## Pendientes y siguiente paso

Verificar Actions y su artefacto para el SHA final con Firefox/WebKit; no inferir ese resultado desde este entorno. Si falla un caso, corregir la causa y repetir los afectados. Mantener pendientes los dispositivos físicos, lector de pantalla y variantes de navegador no ejecutadas.

Siguiente paso de desarrollo: preparar el paquete final de revisión con los recorridos terminados y las decisiones comerciales/legales pendientes, e incorporar evidencia real de CI cuando esté disponible. La web sigue en borrador/noindex; producto parcial y autorizaciones se rigen por PROGRESS.md/LEGAL_REVIEW.md. Solo feat/feature-catalog; Worker intacto. Codex principal, sin subagentes.
