# Propuesta de planes · 5 de noviembre de 2026

Encargo del propietario: «Pongamosle precios y planes como tu creas conveniente y con los features que creas convenientes». Diseño comercial autorizado; no es investigación de mercado ni validación de costes, tributación o disponibilidad del SaaS. No autoriza publicar.

| Plan | Mensual por cuenta | Puesta en marcha única | Primer mes sin extras | Locales | Usuarios totales |
| --- | --- | --- | --- | --- | --- |
| Esencial | S/99 | S/199 | S/298 | 1 | 3 |
| Gestión | S/199 | S/399 | S/598 | 1 | 10 |
| Multisede | S/399 | S/699 | S/1.098 | 3 | 25 |

Esencial: punto de venta, caja, mesas/comandas, inventarios, clientes, reportes y personal/permisos. Gestión añade recetas/costos, compras/proveedores y reservas. Multisede añade gestión de sedes. Los planes son acumulativos, con usuarios por cuenta, no por sede. Gestión se destaca por criterio editorial, sin afirmar popularidad o ventas.

Complementos: facturación electrónica S/39/mes/sede; eventos/entradas y control de accesos S/79/mes/sede; sede adicional S/99/mes desde la cuarta sede, solo en Multisede y manteniendo los 25 usuarios totales. Cargos de terceros, consumos/documentos, equipos y pasarelas no están incluidos. No se acredita integración SUNAT operativa.

La escala separa operación básica, control de costes y coordinación de locales. La puesta en marcha separa el trabajo inicial de la cuota recurrente: configuración, orientación al responsable y revisión inicial. Migración, cargas masivas, integraciones, equipos y desplazamientos se cotizan aparte. No se inventan cuotas anuales, prueba gratuita, permanencia, renovación, reembolsos, SLA ni atención 24/7. Atención por WhatsApp; horarios y tiempos por definir.

Los importes se presentan como propuesta de precio final con impuestos que correspondan incluidos, sujeta a revisión tributaria antes del lanzamiento; no se presume régimen fiscal ni tasa. Siguiente paso exacto: contrastar margen/costes de infraestructura y soporte, capacidad de puesta en marcha, régimen tributario y condiciones contractuales; ajustar content/pricing.json y adoptar la oferta final antes de publicar. No hace falta volver a pedir al usuario que diseñe los planes.

## Administración y pruebas

Fuente única content/pricing.json; editor «Planes, precios y complementos (propuesta)» en Pages CMS desde /admin. Textos comunes en Página: precios-index. Precios admiten hasta dos decimales, límites enteros positivos, referencias a módulos/planes existentes, máximo un plan destacado y planes acumulativos en orden ascendente. Regenerar .pages.yml solo si cambia el esquema.

/precios incluye tarjetas, primer mes calculado, tabla de los 14 módulos y complementos enlazados. Consultar un plan abre WhatsApp con mensaje genérico y nombre del plan; no envía mensajes, datos de la guía ni realiza compras. Funciona sin JS; tabla desplazable por teclado. verify-pricing.mjs prueba valores/límites, matriz, complementos, enlaces sin enviar, no-JS y cinco anchos. Informe docs/qa/pricing-report.json incluido en CI y artefactos. La matriz SaaS original permanece intacta.

Agentes: solo Codex principal, sin subagentes. No despliegue, DNS ni retirada de noindex.

## Verificación de esta propuesta (5/11/2026)

Check: 62 archivos, cero errores/avisos/hints. Build: 42 páginas. test:ci local final aprobado: 42 rutas, 162 destinos internos, navegación/200%/marca/editorial/módulos/recursos/versión/legales y pruebas nuevas de precios con/sin JS; 88 comprobaciones axe, cero infracciones. Compatibilidad: cinco escenarios Chromium aprobados; Firefox/WebKit no disponibles localmente, CI remota no confirmada. No se enviaron mensajes ni se efectuaron compras. Revisadas capturas de tarjetas a 390/1440 px y viewport móvil. Lighthouse no repetido en esta entrega. Informes conservan la identidad del build probado (6765801 con cambios de fuente), no se reetiquetan con el commit documental posterior.

Agentes: solo Codex principal. Pendientes: validación de margen/costes, tributación, condiciones finales y operación real; CI remota/pruebas humanas y otros siete bloqueos de lanzamiento conservados. Siguiente paso exacto: revisar PRICING_STRATEGY.md contra costes/capacidad y registrar ajustes en LAUNCH_DECISIONS.md; no publicar.

## Escenarios económicos internos · continuación del 5/11/2026

Implementados scripts/pricing-economics.py, plantilla sin supuestos inventados en docs/commercial/cost-assumptions.example.json y guía docs/commercial/README.md. Lee cuotas actuales; calcula margen de contribución, umbral por cartera de un solo plan, cuota de referencia para objetivo y puesta en marcha separada, con Decimal. Datos desconocidos producen missing-inputs, sin resultados económicos ficticios. No cambia precios ni permite aprobación financiera/publicación automática. Escenarios reales deben permanecer fuera de Git.

Seis pruebas sintéticas aprobadas; ejecución con plantilla vigente detecta 21 entradas pendientes y cero planes calculados. CI incorpora pruebas Python, resultado remoto no confirmado. Sin cambios frontend/CMS, sin repetir navegación/axe/Lighthouse ya aprobados en la entrega anterior. 42 páginas/34 editores terminados como borrador siguen intactos. Solo Codex principal, sin subagentes.

Siguiente paso exacto: completar una copia privada con costos reales por cuenta y de puesta en marcha, costos fijos, margen objetivo e impuesto indirecto confirmado; ejecutar el calculador y revisar viabilidad antes de ajustar/adoptar precios. No se presume impuesto ni se requiere rediseñar planes. Bloqueos operativos/legales/CI/manuales/dominio y autorización final conservados.

## 6/11/2026 · Fichas conectadas a planes y complementos

Las 14 fichas de /funcionalidades/<id>/ incluyen una sección de distribución comercial: planes base que contienen el módulo y complementos relacionados, con nombre, precio, unidad y planes aplicables. Cada enlace llega a la tarjeta concreta en /precios/. Si no hay plan base, se explica; no se presenta el complemento como incluido. La comparación completa y la guía de consulta siguen accesibles. Funciona sin JS, sin formularios ni almacenamiento/transmisión nuevos.

Fuente única content/pricing.json; sin nuevas tarifas ni cambios de alcance. Textos comunes en Página: feature-detail de content/pages.json, con esquema .pages.yml regenerado: 34 editores y 42 páginas conservados. Ajuste de scroll-margin para que anclas de planes/complementos no queden ocultas tras la cabecera. Estados y evidencia real de content/features.json intactos. No se afirma disponibilidad operativa del SaaS.

verify-pricing.mjs amplía pricing-report.json con recorridos de las 14 fichas, con/sin JS: incluidos/complementos contrastados con contenido, precios y enlaces activados por teclado hacia su destino. Capturas locales de punto de venta (1440), facturación y multisede (390) revisadas. Check 62 archivos, cero errores/avisos/hints; build 42 páginas. Suite test:ci completa aprobada: 42 rutas/166 destinos internos, reflujo 200% en 31 rutas, recorridos/editorial/marca/legales/versión y 88 comprobaciones axe sin infracciones. Nuevas pruebas: 28 recorridos (14 fichas × con/sin JS), 30 activaciones por teclado. Chromium cinco escenarios aprobados; Firefox/WebKit no disponibles localmente. Seis pruebas Python del calculador económico también pasan. No se repitió Lighthouse ni runtime Worker. Informes conservan identidad del build aa806cb con fuentes modificadas, sin reasignarla al commit posterior.

Agentes: Codex principal, sin subagentes. Sin publicación, DNS ni cambio de rama Worker. No se creó PR; existentes y CI remoto sin verificar por restricciones previas. Próximo paso exacto: revisar el recorrido funcionalidad → plan → consulta en el paquete actualizado y completar en privado costos/impuesto para evaluar viabilidad con docs/commercial/README.md. Adopción legal/operativa, pruebas humanas/otros motores, dominio y autorización final siguen pendientes.
