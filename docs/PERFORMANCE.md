# Rendimiento local · 5 de noviembre de 2026

Lighthouse 13.6.0 en Chromium, móvil y throttling simulado; ejecuciones secuenciales sobre servidor estático local, sin trabajo de navegador concurrente. Se midieron cinco rutas y se repitió dos veces la ficha que presentó una anomalía. No son datos de usuarios, del Worker público ni una certificación WCAG.

Build base: 43645c02da1eda979c8b5c9b09d2dca9ab826614; sourceModified True. Se modificó el auditor, no el código de la web durante estas mediciones. Informes: qa/performance-report.json (cinco rutas originales, sin descartar la muestra 86) y qa/performance-module-repeat-report.json (dos repeticiones sin cambios frontend). Un commit posterior no cambia la identidad de esta instantánea.

| Ruta | Rendimiento inicial | Accesibilidad LH | Buenas prácticas | SEO | LCP inicial | TBT | CLS inicial |
| --- | --- | --- | --- | --- | --- | --- | --- |
| / | 100 | 100 | 100 | 66 | 0.906 s | 0.0 ms | 0.000000 |
| /funcionalidades/ | 100 | 100 | 100 | 66 | 0.905 s | 0.0 ms | 0.000000 |
| /solicitar-demo/ | 100 | 100 | 100 | 66 | 1.055 s | 0.0 ms | 0.000000 |
| /funcionalidades/punto-de-venta/ | 86 | 100 | 100 | 66 | 4.204 s | 0.0 ms | 0.000225 |
| /blog/elegir-que-ordenar-primero/ | 100 | 100 | 100 | 66 | 0.902 s | 0.0 ms | 0.000000 |

## Anomalía y repeticiones

Punto de venta registró 86 y LCP simulado 4.204 s en la primera ejecución. El JSON completo identificó como elemento LCP el párrafo introductorio; el LCP observado en la traza era unos 69 ms, distinto de la estimación simulada. Esto justifica contrastar la muestra, pero no demuestra por sí solo una causa. No se atribuye automáticamente a CSS, fuentes, hosting ni red.

| Muestra adicional | Rendimiento | LCP | TBT | CLS |
| --- | --- | --- | --- | --- |
| 1 | 100 | 0.906 s | 0.0 ms | 0.000000 |
| 2 | 100 | 0.903 s | 0.0 ms | 0.000000 |

Las dos repeticiones dieron 100 y no reprodujeron el LCP alto, sin cambios de la web. Se conserva el rango 86–100; tres muestras no permiten prometer estabilidad o rendimiento de producción. No se aplicaron optimizaciones visuales ni de carga sin una causa reproducible. Revisar la variación cuando exista un entorno público autorizado para medir.

## Observaciones conservadas

- SEO 66: noindex deliberado; no se retira para mejorar una puntuación.
- Lighthouse sugiere revisar CSS compartido (aprox. 12 KiB de CSS no utilizado en algunas rutas), entrega de imágenes (27 KiB estimados) y peticiones bloqueantes (60–270 ms estimados). Son oportunidades de laboratorio, no ahorros medidos ni fallos demostrados.
- El servidor de prueba sirve sin compresión/caché de producción; las sugerencias de latencia/BFCache deben contrastarse con la infraestructura real antes de cambiar cabeceras.
- Logos originales y variantes responsive permanecen intactos; no se convierten fuentes ni se modifica imagen/calidad para perseguir una puntuación.
- Las transferencias del informe corresponden a este servidor local; no se extrapolan al Worker. No se ha medido INP de usuarios.

## Reproducir

```sh
ASTRO_TELEMETRY_DISABLED=1 npm run build
CHROMIUM_PATH=/usr/bin/chromium npm run audit:performance
# Repetición focal, sin sustituir el informe principal:
CHROMIUM_PATH=/usr/bin/chromium npm run audit:performance -- --route=/funcionalidades/punto-de-venta/ --runs=2 --output=/tmp/modulo-performance.json
```

Rutas: inicio, catálogo, demo, primer módulo y primer artículo existentes en contenido. Las opciones admiten 1–3 repeticiones y un JSON alternativo bajo /tmp. No compilar ni ejecutar otros navegadores/Worker al mismo tiempo. Los JSON completos se guardan en una carpeta /tmp única que se indica en la salida; los resúmenes versionados permiten continuar desde otra cuenta. Si falla una medición no se conserva un informe anterior como si hubiera pasado.

Pruebas de esta entrega: check/build y siete ejecuciones Lighthouse. No se repite suite de navegación/axe/Worker por ampliar el auditor sin modificar frontend, contenido o dependencias; resultados anteriores siguen identificados en PROGRESS.md. No se infiere CI remoto verde. Agente Codex principal, sin subagentes. Sin publicación; el Worker sigue intacto.

Siguiente paso exacto: revisar compatibilidad de menú/buscador/guía con movimiento reducido y preparar la matriz de navegadores; probar Firefox/WebKit cuando estén disponibles, sin presentarlos como probados de antemano. Mantener pendientes físicos/lector, producto/comercial/legal y autorización final.
