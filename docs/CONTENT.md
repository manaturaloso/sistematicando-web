# Contenido

## Actualización vigente: planes propuestos (5/11/2026)

El propietario delegó elegir precios y funciones. Implementada la propuesta Esencial S/99, Gestión S/199 y Multisede S/399 al mes por cuenta, con puesta en marcha S/199, S/399 y S/699 respectivamente. [PRICING_STRATEGY.md](PRICING_STRATEGY.md) contiene módulos, límites, extras, criterios y condiciones pendientes. Sustituye referencias anteriores a no diseñar tarifas o esperar elección entre planes y propuesta personalizada. Sigue siendo borrador sin publicación y sin validar disponibilidad del SaaS. 42 páginas y 34 editores conservados. Fuente única content/pricing.json; editor de planes en /admin. CI añade verify-pricing.mjs y pricing-report.json, incluidos en artefactos.

Siguiente paso: revisar viabilidad económica/tributaria y condiciones de contratación de esta propuesta; incorporar evidencia real de CI y pruebas humanas cuando esté disponible. No pedir otra vez diseñar los planes ni publicar. Agente principal únicamente.

Español peruano profesional, cercano y claro. Conservar «Todo tu negocio, bajo control.». Separar beneficios propuestos de capacidades verificadas. No inventar resultados, métricas, testimonios, tarifas ni destinatarios.

La referencia de marca contiene texto editorial interno, no copy comercial final aprobado.

Home implementada con copy original, áreas propuestas y FAQ que declara el alcance pendiente de verificar. La demo tiene guía local y WhatsApp confirmado, sin simular recepción de solicitudes. Copy pendiente de aprobación comercial antes del lanzamiento.

Soluciones: seis enfoques originales por sector con prioridades, preguntas de evaluación y límites específicos. Fuente editorial en content/solutions.json; src/data/solutions.ts es adaptador. Nada de este contenido acredita implementación del producto; conservar esa distinción al editar.

Catálogo /funcionalidades/: 14 áreas conceptuales con descripción, pregunta de diagnóstico, límites y sectores. Fuente editorial en content/features.json; estados y evidencia compartidos con matriz generada. No interpretar «No verificada» como función disponible.

Precios: información de alcance sin montos. Demo: guía preparada localmente; toda la comunicación distingue generar/descargar de enviar o reservar. No se pide contacto personal ni se declara recepción inexistente.

Contacto confirmado: WhatsApp externo desde demo y correo/WhatsApp de privacidad. Conservar distinción entre abrir un servicio, enviar voluntariamente un mensaje y generar una guía local. Política en revisión con contactos centralizados; no afirmar versión definitiva aprobada ni ausencia de logs de hosting.

Contenido ahora editable en content/*.json mediante Pages CMS. FAQ común y guías originales con secciones/listas; textos por página en pages.json. Editar desde CMS conserva historial Git, pero necesita un nuevo build. ADMIN.md describe alcance y límites.

/contacto/ diferencia conversación comercial por WhatsApp y consultas de privacidad por correo/WhatsApp. El correo confirmado es para privacidad; no se presenta como canal comercial autorizado. Domicilio del responsable no implica atención presencial. Todos los textos de la página son editables en Página: contacto; datos de contacto centralizados.

## Copy objetivo de lanzamiento

El propietario autoriza preparar la comunicación como producto completo, aunque el software esté parcialmente desarrollado. Home, seis sectores, FAQ, precios y 14 fichas de módulos adoptan ese tono en la rama de desarrollo. Vista previa global identifica el borrador; no se publica hasta validación final. La evidencia operativa se mantiene interna y no se falsea. Copy futuro no equivale a testimonio, certificación, integración validada ni precio aprobado.

## Empresa, Ayuda y Blog

Nosotros presenta propósito y principios sin historia corporativa fabricada. Ayuda reúne recorridos existentes, preguntas compartidas y contacto, sin prometer horarios/SLA. Tres artículos originales en articles.json cubren priorización de procesos, crecimiento multisede y recorrido pedido-cierre, con referencias internas a guías/módulos. Textos y metadatos comunes en pages.json. No hay fechas ni firmas ficticias, testimonios ni estadísticas de resultados. Mantener el aviso de borrador hasta revisión final.

## Recorrido comercial e implementación

La nueva página /implementacion/ explica evaluación, alcance, preparación y validación del inicio como acuerdos a definir. Contenido en implementation.json, textos comunes en pages.json. Precios y demo enlazan al recorrido; no hay nuevas tarifas, plazos, soporte ni servicios prometidos. El contacto real sigue externo y voluntario. Párrafo con teléfono editable mediante {phone}, dato centralizado. Ver COMMERCIAL_SCOPE.md para límites y pendientes concretos.

## Privacidad y términos informativos

Términos de uso del sitio en terms.json; ocho secciones sin cláusulas de contratación inventadas. Copy en pages-legal-terminos. Privacidad añade administración externa, matiza restauración del navegador y distingue correo de privacidad de contacto comercial. Los textos de responsable se editan con marcadores únicos y datos centralizados. No afirmar cookies/analítica ausentes en toda la infraestructura: la evidencia local cubre código del build, no configuración del hosting ni terceros abiertos por el usuario. LEGAL_REVIEW.md registra decisiones pendientes y alcance de revisión.

## Metadatos y cierre técnico

Cada ruta requiere título y descripción propios y coherentes con Open Graph. La 404 dispone de descripción específica y recuperación a Inicio/Ayuda. Tres guías y tres artículos son de tipo OG article, sin autores/fechas inventados. RELEASE_CHECKLIST.md consolida la evidencia por página; pendientes legales/comerciales continúan separados de los checks técnicos. Canonicals, og:url y sitemap públicos siguen pendientes de dominio/autorización.

## Coherencia de guía local y recursos

Demo explica que la herramienta no envía selecciones ni guarda un historial, pero el navegador puede restaurar campos al volver; no prometer borrado universal por recargar o salir. La guía de evaluación orienta a las fichas de lanzamiento y al alcance de la propuesta, sin llamar al catálogo actual «conceptual» ni acreditar disponibilidad operativa.

Las tres guías abren directamente el módulo relacionado, con nombre específico. «Guía práctica», nombre accesible del índice y soluciones relacionadas se editan desde Página: recursos-guias-slug. Ver EDITORIAL_REVIEW.md; mantener datos operativos/precios/términos separados de la revisión del copy.

## 6/11/2026 · Fichas conectadas a planes y complementos

Las 14 fichas de /funcionalidades/<id>/ incluyen una sección de distribución comercial: planes base que contienen el módulo y complementos relacionados, con nombre, precio, unidad y planes aplicables. Cada enlace llega a la tarjeta concreta en /precios/. Si no hay plan base, se explica; no se presenta el complemento como incluido. La comparación completa y la guía de consulta siguen accesibles. Funciona sin JS, sin formularios ni almacenamiento/transmisión nuevos.

Fuente única content/pricing.json; sin nuevas tarifas ni cambios de alcance. Textos comunes en Página: feature-detail de content/pages.json, con esquema .pages.yml regenerado: 34 editores y 42 páginas conservados. Ajuste de scroll-margin para que anclas de planes/complementos no queden ocultas tras la cabecera. Estados y evidencia real de content/features.json intactos. No se afirma disponibilidad operativa del SaaS.

verify-pricing.mjs amplía pricing-report.json con recorridos de las 14 fichas, con/sin JS: incluidos/complementos contrastados con contenido, precios y enlaces activados por teclado hacia su destino. Capturas locales de punto de venta (1440), facturación y multisede (390) revisadas. Check 62 archivos, cero errores/avisos/hints; build 42 páginas. Suite test:ci completa aprobada: 42 rutas/166 destinos internos, reflujo 200% en 31 rutas, recorridos/editorial/marca/legales/versión y 88 comprobaciones axe sin infracciones. Nuevas pruebas: 28 recorridos (14 fichas × con/sin JS), 30 activaciones por teclado. Chromium cinco escenarios aprobados; Firefox/WebKit no disponibles localmente. Seis pruebas Python del calculador económico también pasan. No se repitió Lighthouse ni runtime Worker. Informes conservan identidad del build aa806cb con fuentes modificadas, sin reasignarla al commit posterior.

Agentes: Codex principal, sin subagentes. Sin publicación, DNS ni cambio de rama Worker. No se creó PR; existentes y CI remoto sin verificar por restricciones previas. Próximo paso exacto: revisar el recorrido funcionalidad → plan → consulta en el paquete actualizado y completar en privado costos/impuesto para evaluar viabilidad con docs/commercial/README.md. Adopción legal/operativa, pruebas humanas/otros motores, dominio y autorización final siguen pendientes.

## 6/11/2026 · Edición visual funcional en desarrollo

Autorización expresa del propietario: seleccionar textos/imágenes en una vista previa y ver cambios inmediatamente. Implementado /admin/editor/ con iframe de páginas reales, selección vinculada a JSON, inspector, borrador inmediato, descarte, selección de logos existentes, guardado validado/hash/rollback y revisión explícita de commit/push a feat/feature-catalog. VISUAL_EDITOR.md contiene uso, arquitectura y límites. 43 páginas HTML, 34 editores CMS conservados; sin migrar contenido ni alterar evidencia SaaS.

La API existe solo en el servidor Astro de desarrollo y exige acceso local, Origin y CSRF; no se añade escritura al build estático ni al Worker. Commit bloquea rama distinta, archivos con cambios previos, conflictos e índice ajeno; no hay autocommit al escribir. Pages CMS mantiene edición estructurada y subida de medios. El editor visual alojado con OAuth público sigue pendiente; no presentarlo como servicio ya conectado.

Pruebas funcionales aprobadas: ocho grupos en proyecto/remoto Git bare temporales; UI real de selección/texto/imagen/descarte/guardado/recuperación/diálogo Git/vista móvil, con content/pages.json restaurado exactamente y sin commits/push de prueba al repositorio real. Check 70 archivos sin errores/avisos/hints; build 43 páginas. Cierre estático aprobado: 43 rutas/178 destinos internos, navegación y texto 200% en 32 rutas, marca/editorial/módulos/recursos/versión/legales/precios/admin y Chromium cinco escenarios. Axe inicial detectó zonas de nombres repetidos entre editor e iframe; etiquetas diferenciadas y auditoría completa repetida: 90 comprobaciones, cero infracciones detectadas. Inventario y guardas de lanzamiento aprobados, ocho bloqueos reales conservados (incluye CMS visual alojado). Ajuste posterior solo del inspector activo comprobado con UI real a 320/390/1440; fuente restaurada. Firefox/WebKit no ejecutados localmente. Seis pruebas del calculador económico también aprobadas. No se repitieron Lighthouse ni runtime Worker. CI incorpora ambos recorridos y artefactos; resultado remoto no confirmado.

Siguiente paso exacto: revisar el editor local y configurar una integración alojada con autenticación y permisos GitHub antes de usar escritura desde una URL pública. Los secretos se configuran fuera del chat. No publicar para probar. Agentes: Codex principal, sin subagentes; precios, estados reales y congelación de producción intactos. Sin PR nueva; existentes sin verificar.
