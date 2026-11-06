# Paquete final de revisión · 5 de noviembre de 2026

## Actualización vigente: planes propuestos (5/11/2026)

El propietario delegó elegir precios y funciones. Implementada la propuesta Esencial S/99, Gestión S/199 y Multisede S/399 al mes por cuenta, con puesta en marcha S/199, S/399 y S/699 respectivamente. [PRICING_STRATEGY.md](PRICING_STRATEGY.md) contiene módulos, límites, extras, criterios y condiciones pendientes. Sustituye referencias anteriores a no diseñar tarifas o esperar elección entre planes y propuesta personalizada. Sigue siendo borrador sin publicación y sin validar disponibilidad del SaaS. 42 páginas y 34 editores conservados. Fuente única content/pricing.json; editor de planes en /admin. CI añade verify-pricing.mjs y pricing-report.json, incluidos en artefactos.

Siguiente paso: revisar viabilidad económica/tributaria y condiciones de contratación de esta propuesta; incorporar evidencia real de CI y pruebas humanas cuando esté disponible. No pedir otra vez diseñar los planes ni publicar. Agente principal únicamente.

La web objetivo está implementada como borrador: 42 páginas, 34 editores CMS y recorridos locales de navegación, catálogo y guía de demo. Esta entrega reúne el material para revisar; no significa que el producto SaaS, los textos legales o el lanzamiento estén aprobados.

## Qué abrir primero

1. Este documento: alcance y recorrido de revisión.
2. [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md): inventario técnico de las 42 rutas y siete pendientes.
3. [LAUNCH_DECISIONS.md](LAUNCH_DECISIONS.md): decisiones del propietario que siguen abiertas, con datos ya confirmados separados.
4. [COMPATIBILITY.md](COMPATIBILITY.md), [VISUAL_REVIEW.md](VISUAL_REVIEW.md) y [PERFORMANCE.md](PERFORMANCE.md): qué se probó, cómo y con qué límites.
5. [HANDOFF.md](HANDOFF.md): continuar desde otra cuenta sin reconstruir el historial.

Las correcciones independientes posteriores están en [EDITORIAL_REVIEW.md](EDITORIAL_REVIEW.md). Los JSON guardados identifican sus propias instantáneas; no se reasignan a un commit posterior. La matriz técnica no certifica el SaaS ni autoriza publicar.

## Qué está terminado en la web

| Área | Implementado y revisable | Fuente de edición |
| --- | --- | --- |
| Marca y portada | Logos originales, fuentes locales, colores, navegación responsive y pie adaptable | Marca/menús/textos en CMS |
| Soluciones | Índice y seis sectores con enlaces a módulos | Soluciones por sector |
| Funcionalidades | Catálogo de 14 módulos, búsqueda/áreas/estado vacío y 14 fichas individuales | Módulos y contenido de lanzamiento |
| Comercial | Precios por propuesta, cuatro etapas de implementación, contacto y guía de demo local descargable | Precios, implementación, contactos y textos por página |
| Editorial | Recursos con tres guías, Blog con tres artículos, Nosotros, Ayuda y FAQ compartida | Guías, artículos, FAQ y textos por página |
| Legal | Privacidad y términos informativos redactados como borradores, con identidad/canales confirmados | Términos y textos legales CMS |
| Administración | /admin abre Pages CMS autenticado, 34 editores y biblioteca de imágenes | GitHub/Pages CMS en feat/feature-catalog |
| Calidad | 404 con recuperación, versión del build, pruebas locales y CI de lectura sin deploy | Scripts y documentos del repositorio |

No hay login de clientes SaaS, compra/cobro, receptor propio de leads ni envío automático de la guía. El panel editorial requiere desarrollo para cambios estructurales/lógica; no es constructor visual arbitrario. Los módulos descritos como objetivo de lanzamiento siguen teniendo evidencia operativa pendiente en [FEATURE_STATUS.md](FEATURE_STATUS.md).

## Recorrido recomendado

| Revisar | Acción | Resultado esperado |
| --- | --- | --- |
| / | Mirar logo, titulares y menú; usar teclado/Escape en móvil | Marca correcta, enlaces visibles y foco recuperable |
| /soluciones/ → un sector | Abrir una prioridad y una ficha de módulo | Contenido coherente con el negocio y navegación completa |
| /funcionalidades/ | Buscar un módulo, probar una palabra inexistente y recuperar un área | Recuento/estado vacío claros y catálogo restaurado |
| /precios/ → /implementacion/ | Revisar condiciones propuestas y etapas | Tres planes autorizados como propuesta, puesta en marcha, totales y extras; condiciones finales pendientes |
| /solicitar-demo/ | Generar, descargar, cambiar una opción y reiniciar | TXT local; resultado invalidado cuando cambia; sin solicitud enviada |
| /contacto/ | Revisar número, identidad y canales de privacidad | Datos confirmados, sin simular recepción ni enviar mensajes durante esta revisión |
| /recursos/ y /blog/ | Leer una guía/artículo y probar su índice | Lectura y enlaces relacionados utilizables en móvil/escritorio |
| /legal/privacidad/ y /legal/terminos/ | Revisar alcance, proveedores y pendientes | Borradores explícitos; términos del sitio separados del contrato SaaS |
| /admin/ | Comparar versión y comprobar los enlaces del editor | CMS externo autenticado y rama correcta; guardar una edición no equivale a publicar |
| Una URL inexistente | Probar Inicio/Ayuda desde el error | 404 real en Worker local y recuperación por teclado |

No hace falta reenviar datos personales ni contraseñas. Contacto comercial y datos del responsable ya están registrados; ver LAUNCH_DECISIONS.md antes de pedirlos de nuevo.

## Preview de esta revisión

El Worker existente no muestra necesariamente estas 42 páginas: sigue sin actualizarse en feat/brand-foundation (557222e); la última identidad pública aportada por el propietario fue af35674. Para revisar esta entrega usar el checkout de desarrollo o el ZIP generado; no publicar para obtener una vista previa.

```sh
# Desde el repositorio:
ASTRO_TELEMETRY_DISABLED=1 npm run build
npm run preview -- --port 4321
# Abrir http://127.0.0.1:4321
```

`python scripts/package-review.py /tmp/sistematicando-review.zip` reúne site-preview.zip y documentos internos separados, con manifiesto de hashes. El ZIP externo es interno: no desplegarlo. El ZIP anidado solo contiene dist, con noindex/robots conservados. Al extraer el paquete, LEEME.md indica cómo abrir la web local sin Node. manifest.json registra la versión real del sitio empaquetado y las identidades de cada informe disponible; no todos fueron ejecutados sobre ese mismo SHA.

## Pruebas y límites que deben mantenerse visibles

- Última suite local: 42 rutas/159 destinos, axe 88 comprobaciones sin infracciones detectadas, reflujo y flujos documentados. Los incomplete y pruebas manuales pendientes no equivalen a aprobados.
- Chromium: cinco escenarios de movimiento normal/reducido y fallback no-JS. Firefox/WebKit solo configurados como obligatorios en CI; resultado real aún no verificado desde este entorno.
- Rendimiento: cinco rutas; módulo 86 inicial y dos 100 sin cambios. Se conserva la variación, no se promete 100 universal ni Core Web Vitals de producción.
- CI del commit d52bccc consultada por gh run list: Forbidden. Registro en [qa/remote-ci-status.json](qa/remote-ci-status.json). No se infiere verde remoto ni ausencia de ejecuciones/PR.

## Decisión siguiente

Revisar los recorridos y registrar observaciones/decisiones en LAUNCH_DECISIONS.md, empezando por oferta y alcance, con los precios propuestos autorizados, sin cerrar asuntos legales por defecto. Incorporar el resultado real de CI con enlace, SHA y artefacto cuando sea accesible. Mantener congelación de publicación hasta confirmación de producto/web completos y autorización final explícita. Agente: Codex principal, sin subagentes.

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
