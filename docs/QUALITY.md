# Calidad local · 2026-11-05

## Alcance

Build estático local, no Worker público. 42 páginas con originales del logo seleccionados mediante guardado real del propietario en Pages CMS. Sin despliegue de esta rama.

## Correcciones

- Menú móvil sin JavaScript: ahora los enlaces permanecen visibles y el botón solo aparece cuando su comportamiento está inicializado.
- Salto al contenido: el destino main acepta foco programático; probado con teclado.
- Texto al 200%: navegación puede envolver líneas y el adorno del hero permanece dentro de sus límites; sin overflow en 31 rutas a 390 y 1280 px con texto 200%, tras corregir el caso móvil.
- Enlace de marca: usa el nombre visible o alt del logo como nombre accesible, evitando un aria-label que omitía la leyenda visible.
- Favicon: si aún no se ha cargado uno, referencia vacía explícita para evitar una petición automática fallida a /favicon.ico. No se inventó un isotipo.

## Accesibilidad automática

`npm run audit:a11y`: 84 combinaciones (42 páginas × móvil/escritorio) y cuatro estados interactivos: menú/FAQ abiertos, FAQ a un cuarto de su animación, guía generada y búsqueda sin resultados. **88 comprobaciones, cero reglas con infracciones detectadas**, incluidas etiquetas WCAG 2 A/AA, 2.1 A/AA, 2.2 AA y best-practice disponibles en axe.

Axe dejó color-contrast como incompleto en la home. No se cuentan esos resultados como aprobaciones automáticas. Evidencia en qa/contrast-review.json: flechas decorativas aria-hidden y etiquetas del mockup cuya transformación/fondo no pudo resolver. Revisión de estilos y captura desktop: tinta/superficie 11.59:1, tinta/blanco 13.15:1, tinta/líneas del gráfico 11.31:1 y texto claro/tinta 12.58:1. No se observó ocultación del texto en la captura revisada.

Esto no certifica WCAG completo. Faltan lectores de pantalla, dispositivos físicos y una revisión manual exhaustiva con el contenido/logo final.

## Lighthouse actual · cinco rutas y repeticiones

Medición secuencial móvil simulada del 5/11/2026. Valores completos y límites en PERFORMANCE.md. No hay cambios frontend ni optimización aplicada en esta entrega; no se repitió la suite funcional/axe/Worker porque solo cambió el auditor. Check final 59 archivos sin errores/advertencias/hints y build 42 páginas / 34 editores.

| Ruta | Rendimiento inicial | LCP inicial | TBT | CLS |
| --- | --- | --- | --- | --- |
| / | 100 | 0.906 s | 0.0 ms | 0.000000 |
| /funcionalidades/ | 100 | 0.905 s | 0.0 ms | 0.000000 |
| /solicitar-demo/ | 100 | 1.055 s | 0.0 ms | 0.000000 |
| /funcionalidades/punto-de-venta/ | 86 | 4.204 s | 0.0 ms | 0.000225 |
| /blog/elegir-que-ordenar-primero/ | 100 | 0.902 s | 0.0 ms | 0.000000 |

Módulo: 86 inicial/LCP 4.204 s; dos repeticiones sin cambios dieron 100, LCP 0.906/0.903 s, TBT 0 y CLS 0. La muestra lenta se conserva en qa/performance-report.json; repeticiones en qa/performance-module-repeat-report.json. No se declara causa resuelta ni estabilidad de producción. Accesibilidad y buenas prácticas Lighthouse: 100 en las siete ejecuciones; SEO 66 por noindex, que permanece.

La tabla siguiente conserva historia; no es la medición actual. Repetir solo ante cambios, fallos o necesidad concreta de contrastar la variación. Siguiente paso: compatibilidad/movimiento reducido y matriz de navegadores; no retirar bloqueos de lanzamiento.

## Lighthouse histórico · tres rutas (medición anterior)

Una ejecución final por ruta en Chromium local. Valores de laboratorio, variables entre ejecuciones; no son métricas de usuarios ni Core Web Vitals de producción.

| Ruta | Rendimiento | Accesibilidad automática | Buenas prácticas | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| / | 100 | 100 | 100 | 66 | 0.91 s | 13.5 ms | 0.0000 |
| /funcionalidades/ | 100 | 100 | 100 | 66 | 0.91 s | 0 ms | 0.0000 |
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

CI incluye ahora test:brand automáticamente dentro de test:ci; permite las variantes y campos opcionales del CMS y contrasta cada logo con su original. Artefacto de Actions incluye brand-report.json. Esta ampliación no cambia el producto ni sus métricas Lighthouse.

/contacto/ añadido a pruebas de todas las rutas/axe; canales comerciales y privacidad comprobados sin enviar mensajes, JS/no-JS y cinco anchos. Tabla Lighthouse corresponde a la medición anterior de tres rutas; no se presenta como medición del nuevo contacto.

Revisión asistida actual: capturas y teclado en los cuatro flujos; datos antes/después en qa/reflow-review.json. Se corrigió reflujo a 200% en móvil y se añadieron regresiones para foco de validación/generación/reset y salto desde búsqueda vacía. Dispositivos físicos y lectores de pantalla siguen pendientes. Lighthouse de la tabla repetido tras la corrección; no métricas de campo.

Entrega de lanzamiento: 41 rutas/152 destinos, 14 fichas CMS y 86 comprobaciones axe aprobadas. Navegación/texto 200% incluye los 14 módulos. Worker local 45 rutas, cabeceras y JSON aprobados; capturas de módulo, catálogo, sector y precios revisadas. Lighthouse de la tabla repetido con la vista previa global activa. No se publica.

## Empresa, Ayuda y Blog

Check final: 53 archivos, sin errores, advertencias ni hints. Build: 40 páginas más version.json; sitio: 146 destinos internos. Reflujo 200% en 26 rutas a 390/1280. Recorridos de Ayuda (FAQ nativa por teclado), descubrimiento de artículos, TOC y enlaces relacionados con/sin JavaScript aprobados. Worker local: 51 rutas y cabeceras/assets/JSON/query/405/navegador aprobados. Paquete ZIP de 40 páginas validado fuera del checkout. No se repitió Lighthouse; la tabla anterior corresponde a la entrega anterior.

Incidencia del ejecutor: la auditoría inicial coincidió con un rebuild de dist al iniciar Worker y produjo cinco reglas sobre una respuesta transitoria de error de punto-de-venta, no sobre su HTML. Repetición aislada tras detener Worker; el auditor exige respuesta HTTP 200 desde ahora. Ver PROGRESS.md para detalle. No publicar ni retirar noindex.

Revisión visual de Nosotros móvil, Ayuda escritorio y artículo móvil/escritorio completada; capturas de referencia en LAUNCH_PREVIEW.md. No sustituye prueba con dispositivos físicos/lector de pantalla.

## 5 de noviembre de 2026 · Implementación y recorrido comercial

Check 54 archivos sin errores/advertencias/hints; build 41 páginas y 32 editores CMS. Suite completa test:ci aprobada en secuencia sobre build estable: sitio 41 rutas/152 destinos, reflujo 200% en 28 rutas a 390/1280, marca, editorial/comercial, módulos, recursos, versión y axe 86 comprobaciones sin infracciones detectadas. Sin recompilar dist durante la auditoría. Pruebas específicas: precios → última etapa por teclado → demo con/sin JS; teléfono desde CMS y guía sin adjuntos/datos añadidos al enlace WhatsApp.

La evidencia Lighthouse anterior no se repitió: no son métricas de esta página ni de producción. Revisión manual con lectores/dispositivos sigue pendiente. Sin nueva publicación.

Worker local final: 52 verificaciones de rutas más cabeceras/JSON/assets/query/405 y navegador; servidor detenido tras las pruebas. Paquete de 41 páginas validado fuera del checkout. Capturas de implementación móvil y precios escritorio revisadas; referencia en LAUNCH_PREVIEW.md. Sin nueva ejecución Lighthouse.

## 5 de noviembre de 2026 · Revisión legal informativa

Check 56 archivos sin errores/advertencias/hints; build 42 páginas y 34 editores. Suite completa aprobada: sitio 42 rutas/162 destinos, reflujo 200% en 30 rutas a 390/1280, marca, editorial, módulos, recursos, versión, prueba legal y axe 88 comprobaciones sin infracciones detectadas. Worker local 53 verificaciones de rutas más assets/JSON/cabeceras/query/405/navegador, servidor detenido. Lighthouse conserva evidencia histórica, sin repetir.

verify-legal prueba identidad confirmada, vínculos legales, TOC por teclado, contactos diferenciados, navegación y guía local sin peticiones externas, cookies ni persistencia, con/sin JS. No cubre configuración de Cloudflare, servicios externos abiertos voluntariamente ni adopción legal. Tras revisar la captura se quitó la numeración visual duplicada del índice conservando la lista semántica; se repitieron navegación/reflujo y pruebas legales sobre el build final. No se omiten reglas de accesibilidad ni se retira noindex.

Comprobación final del ajuste del índice: cuatro análisis axe focales (privacidad/términos a 390/1440) sin infracciones; evidencia adicional en qa/legal-report.json. Para axe usar browser.newContext() explícito: la comprobación puntual inicial con browser.newPage() fue rechazada por la API antes del análisis y se corrigió. Check final: 56 archivos, cero errores/advertencias/hints.

## 5 de noviembre de 2026 · Cierre técnico por página

Check final 58 archivos sin errores/advertencias/hints; build 42 páginas / 34 editores. Suite: 42 rutas/162 destinos, metadata única/coherente por ruta, seis OG article, reflujo 200% en 31 rutas a 390/1280 y axe 88 comprobaciones sin infracciones detectadas; marca/editorial/módulos/recursos/legal/versión aprobados. Checklist generado con coincidencia de build y cobertura exacta; siete pendientes de lanzamiento conservados. Negativos: versión obsoleta, ruta ausente e infracción simulada rechazados, informes originales restaurados y salida válida intacta.

Worker local: 53 verificaciones y regreso desde URL inexistente (HTTP 404) hacia Ayuda por teclado con/sin JS. Captura móvil revisada; servidor detenido. ZIP local de 42 páginas verificado. Sin nueva ejecución Lighthouse ni publicación. La evidencia guardada registra una instantánea con cambios locales; no se reasigna al commit posterior. CI vuelve a generar evidencias del build que ejecute. Consultar RELEASE_CHECKLIST.md y qa/release-report.json.

## 5 de noviembre de 2026 · Visual y ampliación en más anchos

Captura/revisión de primeras pantallas: 42 rutas × 390/1440, once estados y cuerpos representativos; alcance y límites en VISUAL_REVIEW.md. Capturas/galería reproducibles con review:visual, fuera de Git bajo /tmp; JSON de referencia y dos imágenes en docs/qa. No hay comparación automática de píxeles ni aprobación humana asignada por el capturador.

Pie móvil compacto conserva enlaces/áreas táctiles. Pruebas nuevas detectaron home FAQ a 320/200% y adorno a 900/200%; ambos corregidos sin clipping. Navegación ahora comprueba home/pie a cinco anchos (320/390/768/900/1440) y texto 100/200%, además de 31 rutas a dos anchos. Check final 59 archivos limpio; suite completa aprobada con 42 rutas/162 destinos y axe 88 comprobaciones sin infracciones. Worker local 53 aprobado/detenido y paquete de 42 páginas validado; Lighthouse histórico sin repetir. Mantener pendientes físicos/lector/motores y legales/comerciales/producto. Sin deploy.
