# Calidad local · 2026-11-04

## Alcance

Build estático local, no Worker público. 19 páginas con originales del logo seleccionados mediante guardado real del propietario en Pages CMS. Sin despliegue de esta rama.

## Correcciones

- Menú móvil sin JavaScript: ahora los enlaces permanecen visibles y el botón solo aparece cuando su comportamiento está inicializado.
- Salto al contenido: el destino main acepta foco programático; probado con teclado.
- Texto al 200%: navegación puede envolver líneas y el adorno del hero permanece dentro de sus límites; sin overflow en las cinco rutas representativas probadas.
- Enlace de marca: usa el nombre visible o alt del logo como nombre accesible, evitando un aria-label que omitía la leyenda visible.
- Favicon: si aún no se ha cargado uno, referencia vacía explícita para evitar una petición automática fallida a /favicon.ico. No se inventó un isotipo.

## Accesibilidad automática

`npm run audit:a11y`: 38 combinaciones (19 páginas × móvil/escritorio) y cuatro estados interactivos: menú/FAQ abiertos, FAQ a un cuarto de su animación, guía generada y búsqueda sin resultados. **42 comprobaciones, cero reglas con infracciones detectadas**, incluidas etiquetas WCAG 2 A/AA, 2.1 A/AA, 2.2 AA y best-practice disponibles en axe.

Axe dejó color-contrast como incompleto en la home. No se cuentan esos resultados como aprobaciones automáticas. Evidencia en qa/contrast-review.json: flechas decorativas aria-hidden y etiquetas del mockup cuya transformación/fondo no pudo resolver. Revisión de estilos y captura desktop: tinta/superficie 11.59:1, tinta/blanco 13.15:1, tinta/líneas del gráfico 11.31:1 y texto claro/tinta 12.58:1. No se observó ocultación del texto en la captura revisada.

Esto no certifica WCAG completo. Faltan lectores de pantalla, dispositivos físicos y una revisión manual exhaustiva con el contenido/logo final.

## Lighthouse móvil simulado

Una ejecución final por ruta en Chromium local. Valores de laboratorio, variables entre ejecuciones; no son métricas de usuarios ni Core Web Vitals de producción.

| Ruta | Rendimiento | Accesibilidad automática | Buenas prácticas | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| / | 100 | 100 | 100 | 66 | 0.91 s | 0 ms | 0.0000 |
| /funcionalidades/ | 100 | 100 | 100 | 66 | 0.90 s | 4 ms | 0.0000 |
| /solicitar-demo/ | 100 | 100 | 100 | 66 | 0.91 s | 0 ms | 0.0000 |

SEO se penaliza por bloqueo de indexación deliberado. Se conservan noindex y robots; no se retiran para aumentar una puntuación. No se ha medido INP de usuarios. CSS compartido y dependencias de carga aparecen como oportunidades informativas; se precargan las dos fuentes locales para evitar descubrimiento tardío y variación de la composición.

## Repetir

```sh
npm ci
ASTRO_TELEMETRY_DISABLED=1 npm run check
ASTRO_TELEMETRY_DISABLED=1 npm run build
npm run test:navigation
npm run audit:a11y
npm run audit:performance
```

Requiere Chromium en /usr/bin/chromium (o adaptar la ruta al entorno). Herramientas fijadas en package-lock.json. Los scripts abren un servidor efímero solo en 127.0.0.1, sirven dist y cierran navegador/servidor en finally. No hacen login, envíos de datos ni despliegues. El entorno restringido necesita permiso para sockets y Chromium.

Resúmenes versionados en docs/qa; los JSON completos de Lighthouse se generan temporalmente en /tmp. La ejecución sobrescribe los resúmenes; revisar el diff antes de guardar. La revisión manual de contraste está separada del reporte automático y debe repetirse si cambia el contenido o estilo.

Última medición con logos originales, menú inicializado durante parsing y fuentes precargadas: CLS 0 en las tres rutas de laboratorio (catálogo anterior 0.119). Entrega responsive PNG ya implementada; originales preservados. test:brand verifica seis anchos e integridad.

El menú se inicializa con un script inline pequeño, encapsulado y colocado tras la cabecera. Evita que el nav móvil completo aparezca antes de ocultarse al cargar un módulo. Sin JS siguen visibles los enlaces; con scripts externos bloqueados el menú y Escape funcionan. No depende de una clase global que pueda ocultar enlaces sin instalar sus eventos. La web actual permite scripts inline; cualquier futura CSP deberá incluir hash/nonce apropiado.

Corrección FAQ: texto siempre opaco durante appear, animación de posición conservada. Caso congelado al 25% detecta el bajo contraste de la versión anterior y pasa con la corregida. Detalles y evidencia del fallo alojado en CI.md y QA.md. Resultado alojado del nuevo commit pendiente de observar.

Logo: originales intactos (hashes) y derivados de build; prueba de seis anchos a DPR1/2, 13651/31241 bytes frente a 301321. Última medición Lighthouse con derivados responsive en las tres rutas: rendimiento/accesibilidad/buenas prácticas 100, SEO 66 (noindex). Resumen completo en qa/performance-report.json; no son datos de producción.
