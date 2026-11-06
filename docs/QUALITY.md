# Calidad local · 2026-11-05

## Actualización vigente: planes propuestos (5/11/2026)

El propietario delegó elegir precios y funciones. Implementada la propuesta Esencial S/99, Gestión S/199 y Multisede S/399 al mes por cuenta, con puesta en marcha S/199, S/399 y S/699 respectivamente. [PRICING_STRATEGY.md](PRICING_STRATEGY.md) contiene módulos, límites, extras, criterios y condiciones pendientes. Sustituye referencias anteriores a no diseñar tarifas o esperar elección entre planes y propuesta personalizada. Sigue siendo borrador sin publicación y sin validar disponibilidad del SaaS. 42 páginas y 34 editores conservados. Fuente única content/pricing.json; editor de planes en /admin. CI añade verify-pricing.mjs y pricing-report.json, incluidos en artefactos.

Siguiente paso: revisar viabilidad económica/tributaria y condiciones de contratación de esta propuesta; incorporar evidencia real de CI y pruebas humanas cuando esté disponible. No pedir otra vez diseñar los planes ni publicar. Agente principal únicamente.

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

## 5 de noviembre de 2026 · Compatibilidad de flujos

Check/build: 60 archivos limpios, 42 páginas / 34 editores. test:ci completo aprobado localmente: 42 rutas/162 destinos, navegación/reflujo, marca/editorial/módulos/recursos/legal/versión, nueva matriz y axe 88 comprobaciones sin infracciones, checklist y pruebas de evidencia. Chromium 155.0.8059.79: cinco escenarios aprobados (390/1440 × movimiento normal/reducido + móvil no-JS). Tabla/casos en COMPATIBILITY.md; JSON asociado al build.

Firefox/WebKit no instalados ni ejecutados; no se simula un resultado. Modo estricto local rechazó su ausencia con exit 1 esperado, tras pasar Chromium. CI se configura para instalar/exigir los tres; esto no acredita su ejecución remota. Limpieza temprana ampliada para evitar informes heredados en fallos de setup. No se cambió frontend/CMS/dependencias; sin repetición Lighthouse/Worker ni publicación. Pendientes lectores/dispositivos y resultado real de los motores adicionales.

## 5 de noviembre de 2026 · Paquete de revisión

Sin cambios frontend/dependencias. Build/content de 42 páginas, compilación Python y enlaces de los documentos nuevos aprobados. package-review valida ZIP interno/anidado, CRC, hashes y nombres únicos; la versión del sitio coincide con dist/version.json y su ZIP excluye docs/review/src/.git. Los documentos internos quedan fuera del sitio; el manifiesto no reasigna informes históricos al SHA empaquetado. Se regenera tras el commit/build final.

CI d52bccc: consulta read-only Forbidden; no hay conclusión observada, resultado real de Firefox/WebKit pendiente. No se repiten suites previas por un empaquetador aislado; sus resultados siguen ligados a sus instantáneas. REVIEW_PACKAGE.md y LAUNCH_DECISIONS.md ordenan revisión y pendientes. No hay nueva publicación.

## 5 de noviembre de 2026 · Coherencia editorial y guías

Copy de demo/guía de evaluación y etiquetas editables corregidos; guías enlazan directamente al módulo y usan su nombre. Check 60 archivos limpio y build 42 páginas/34 editores. test:ci aprobado: 42 rutas/159 destinos, seis nuevos recorridos guía→ficha (tres con/sin JS), cinco escenarios Chromium, marca/editorial/legal/versión y axe 88 sin infracciones; checklist/controles de evidencia aprobados. Los tres destinos menos corresponden a anclas del catálogo sustituidas por fichas ya enlazadas, no a páginas eliminadas.

No se repite Lighthouse ni Worker sin cambio relevante de carga/routing; no se afirma verificación nueva de Firefox/WebKit o CI remoto. Estados reales del SaaS, precios/contactos y términos sin modificar. EDITORIAL_REVIEW.md y paquete de revisión actualizados; no publicación.

## Verificación de esta propuesta (5/11/2026)

Check: 62 archivos, cero errores/avisos/hints. Build: 42 páginas. test:ci local final aprobado: 42 rutas, 162 destinos internos, navegación/200%/marca/editorial/módulos/recursos/versión/legales y pruebas nuevas de precios con/sin JS; 88 comprobaciones axe, cero infracciones. Compatibilidad: cinco escenarios Chromium aprobados; Firefox/WebKit no disponibles localmente, CI remota no confirmada. No se enviaron mensajes ni se efectuaron compras. Revisadas capturas de tarjetas a 390/1440 px y viewport móvil. Lighthouse no repetido en esta entrega. Informes conservan la identidad del build probado (6765801 con cambios de fuente), no se reetiquetan con el commit documental posterior.

Agentes: solo Codex principal. Pendientes: validación de margen/costes, tributación, condiciones finales y operación real; CI remota/pruebas humanas y otros siete bloqueos de lanzamiento conservados. Siguiente paso exacto: revisar PRICING_STRATEGY.md contra costes/capacidad y registrar ajustes en LAUNCH_DECISIONS.md; no publicar.

Worker dry-run de esta entrega aprobado: build de 42 páginas y 106 archivos estáticos; `--dry-run: exiting now`, sin subir ni desplegar. No se repitió runtime Worker; evidencia anterior claramente separada.

## Escenarios económicos internos · continuación del 5/11/2026

Implementados scripts/pricing-economics.py, plantilla sin supuestos inventados en docs/commercial/cost-assumptions.example.json y guía docs/commercial/README.md. Lee cuotas actuales; calcula margen de contribución, umbral por cartera de un solo plan, cuota de referencia para objetivo y puesta en marcha separada, con Decimal. Datos desconocidos producen missing-inputs, sin resultados económicos ficticios. No cambia precios ni permite aprobación financiera/publicación automática. Escenarios reales deben permanecer fuera de Git.

Seis pruebas sintéticas aprobadas; ejecución con plantilla vigente detecta 21 entradas pendientes y cero planes calculados. CI incorpora pruebas Python, resultado remoto no confirmado. Sin cambios frontend/CMS, sin repetir navegación/axe/Lighthouse ya aprobados en la entrega anterior. 42 páginas/34 editores terminados como borrador siguen intactos. Solo Codex principal, sin subagentes.

Siguiente paso exacto: completar una copia privada con costos reales por cuenta y de puesta en marcha, costos fijos, margen objetivo e impuesto indirecto confirmado; ejecutar el calculador y revisar viabilidad antes de ajustar/adoptar precios. No se presume impuesto ni se requiere rediseñar planes. Bloqueos operativos/legales/CI/manuales/dominio y autorización final conservados.

## 6/11/2026 · Fichas conectadas a planes y complementos

Las 14 fichas de /funcionalidades/<id>/ incluyen una sección de distribución comercial: planes base que contienen el módulo y complementos relacionados, con nombre, precio, unidad y planes aplicables. Cada enlace llega a la tarjeta concreta en /precios/. Si no hay plan base, se explica; no se presenta el complemento como incluido. La comparación completa y la guía de consulta siguen accesibles. Funciona sin JS, sin formularios ni almacenamiento/transmisión nuevos.

Fuente única content/pricing.json; sin nuevas tarifas ni cambios de alcance. Textos comunes en Página: feature-detail de content/pages.json, con esquema .pages.yml regenerado: 34 editores y 42 páginas conservados. Ajuste de scroll-margin para que anclas de planes/complementos no queden ocultas tras la cabecera. Estados y evidencia real de content/features.json intactos. No se afirma disponibilidad operativa del SaaS.

verify-pricing.mjs amplía pricing-report.json con recorridos de las 14 fichas, con/sin JS: incluidos/complementos contrastados con contenido, precios y enlaces activados por teclado hacia su destino. Capturas locales de punto de venta (1440), facturación y multisede (390) revisadas. Check 62 archivos, cero errores/avisos/hints; build 42 páginas. Suite test:ci completa aprobada: 42 rutas/166 destinos internos, reflujo 200% en 31 rutas, recorridos/editorial/marca/legales/versión y 88 comprobaciones axe sin infracciones. Nuevas pruebas: 28 recorridos (14 fichas × con/sin JS), 30 activaciones por teclado. Chromium cinco escenarios aprobados; Firefox/WebKit no disponibles localmente. Seis pruebas Python del calculador económico también pasan. No se repitió Lighthouse ni runtime Worker. Informes conservan identidad del build aa806cb con fuentes modificadas, sin reasignarla al commit posterior.

Agentes: Codex principal, sin subagentes. Sin publicación, DNS ni cambio de rama Worker. No se creó PR; existentes y CI remoto sin verificar por restricciones previas. Próximo paso exacto: revisar el recorrido funcionalidad → plan → consulta en el paquete actualizado y completar en privado costos/impuesto para evaluar viabilidad con docs/commercial/README.md. Adopción legal/operativa, pruebas humanas/otros motores, dominio y autorización final siguen pendientes.

## 6/11/2026 · Panel administrativo visual

Rediseñado /admin con logo original, navegación por tareas, resumen de inventario, tarjetas de marca/portada/planes desde datos reales y directorio buscable de los 34 editores con Editar/Ver página. Fuente del inventario .pages.yml vía src/data/admin.ts, sin eliminar editores. Móvil/escritorio, teclado, recuentos y vacío; sin JS todos los editores visibles. ADMIN_DESIGN.md explica alcance, reglas y límites.

Se conserva Pages CMS: editor de campos, medios, autenticación y guardado externos, rama feat/feature-catalog. No se ha cambiado el tema del editor externo ni implementado edición embebida/WYSIWYG. Muestras del último build, sin estado de guardado ficticio o actualización en vivo. Sin tokens, backend ni nuevos servicios. 42 páginas / 34 editores; precios y evidencia SaaS intactos.

Check final: 64 archivos sin errores/avisos/hints; build de 42 páginas. verify-admin aprobado con/sin JS, cinco anchos, enlaces de rama, búsqueda/reset/teclado y sin peticiones externas. Capturas 390/1440 revisadas. CI incorpora admin-report.json y la prueba; cierre aprobado: 42 rutas y 176 destinos internos; navegación/200%, marca, editorial, módulos, recursos, versión, legales, precios, panel y compatibilidad Chromium aprobados. Axe inicial detectó nombres no únicos de zonas laterales; corregidas sus etiquetas y repetidas las 88 comprobaciones completas: cero infracciones detectadas. Inventario y guardas de lanzamiento aprobados. Firefox/WebKit siguen no disponibles localmente y CI remota no confirmada. No se repitieron Lighthouse ni runtime Worker. No se guardaron cambios en el servicio externo ni se enviaron mensajes.

Agente: Codex principal sin subagentes; skill digital-design-excellence aplicada. No se publica. Próximo paso exacto: revisar el nuevo /admin y concretar si también se quiere reemplazar el editor externo; no confundir este panel con un reemplazo ya realizado. Continúan costos reales, validación operativa/legal, dispositivos/lectores, CI remoto y autorización de lanzamiento pendientes.

## 6/11/2026 · Edición visual funcional en desarrollo

Autorización expresa del propietario: seleccionar textos/imágenes en una vista previa y ver cambios inmediatamente. Implementado /admin/editor/ con iframe de páginas reales, selección vinculada a JSON, inspector, borrador inmediato, descarte, selección de logos existentes, guardado validado/hash/rollback y revisión explícita de commit/push a feat/feature-catalog. VISUAL_EDITOR.md contiene uso, arquitectura y límites. 43 páginas HTML, 34 editores CMS conservados; sin migrar contenido ni alterar evidencia SaaS.

La API existe solo en el servidor Astro de desarrollo y exige acceso local, Origin y CSRF; no se añade escritura al build estático ni al Worker. Commit bloquea rama distinta, archivos con cambios previos, conflictos e índice ajeno; no hay autocommit al escribir. Pages CMS mantiene edición estructurada y subida de medios. El editor visual alojado con OAuth público sigue pendiente; no presentarlo como servicio ya conectado.

Pruebas funcionales aprobadas: ocho grupos en proyecto/remoto Git bare temporales; UI real de selección/texto/imagen/descarte/guardado/recuperación/diálogo Git/vista móvil, con content/pages.json restaurado exactamente y sin commits/push de prueba al repositorio real. Check 70 archivos sin errores/avisos/hints; build 43 páginas. Cierre estático aprobado: 43 rutas/178 destinos internos, navegación y texto 200% en 32 rutas, marca/editorial/módulos/recursos/versión/legales/precios/admin y Chromium cinco escenarios. Axe inicial detectó zonas de nombres repetidos entre editor e iframe; etiquetas diferenciadas y auditoría completa repetida: 90 comprobaciones, cero infracciones detectadas. Inventario y guardas de lanzamiento aprobados, ocho bloqueos reales conservados (incluye CMS visual alojado). Ajuste posterior solo del inspector activo comprobado con UI real a 320/390/1440; fuente restaurada. Firefox/WebKit no ejecutados localmente. Seis pruebas del calculador económico también aprobadas. No se repitieron Lighthouse ni runtime Worker. CI incorpora ambos recorridos y artefactos; resultado remoto no confirmado.

Siguiente paso exacto: revisar el editor local y configurar una integración alojada con autenticación y permisos GitHub antes de usar escritura desde una URL pública. Los secretos se configuran fuera del chat. No publicar para probar. Agentes: Codex principal, sin subagentes; precios, estados reales y congelación de producción intactos. Sin PR nueva; existentes sin verificar.

## 6/11/2026 · Base de autenticación para edición alojada

Implementados workers/visual-auth.mjs y wrangler.editor-auth.jsonc separados del Worker público: flujo GitHub App, estado OAuth cifrado, sesión AES-GCM HttpOnly/Secure con duración máxima de una hora, comprobación de usuario manaturaloso y permiso push en el repositorio exacto, CSRF/logout y rechazo por defecto. Sin secretos/configuración devuelve 503. No hay endpoints de escritura ni integración todavía con el inspector alojado; contentWritesEnabled false. HOSTED_VISUAL_AUTH.md registra configuración y alcance.

Ocho grupos sintéticos de autenticación/criptografía/permisos aprobados. No hay login GitHub real, App registrada, credenciales configuradas o despliegue. CI incorpora prueba e informe visual-auth-report.json. Web estática, 43 páginas/34 editores, editor local y Pages CMS conservados. No se repite navegación/axe/Lighthouse por código servidor separado sin cambios frontend; la evidencia anterior conserva su identidad.

Siguiente paso exacto: elegir origen HTTPS, registrar/instalar GitHub App solo para sistematicando-web y configurar variables/secretos fuera del chat; revisar y autorizar despliegue de prueba por separado, probar login real y después conectar identidad con guardado remoto validado. El bloqueo visual-cms sigue abierto. Solo Codex principal, sin subagentes; sin publicación, DNS, PR nueva ni cambio en rama Worker. PR existentes y CI remoto sin verificar.

Cierre técnico: check 72 archivos, cero errores/avisos/hints; ocho grupos sintéticos aprobados; Wrangler 4.157.0 dry-run de la configuración separada aprobado (8.58 KiB sin subir/desplegar, origen/client ID vacíos, sin secretos). Solo cambian servidor/QA/documentos y seguimiento de procedencia; UI estática intacta. Recompilar/verificar versión tras commit; conservar identidades previas de QA sin reasignarlas a este SHA.
