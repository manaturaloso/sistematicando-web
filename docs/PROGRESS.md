# Progreso y continuidad

Última actualización: 2026-11-04 (America/Lima).

## Implementado y páginas terminadas en desarrollo

- Astro 7.4.5 + TypeScript 6.0.3, salida estática, fuentes locales y CSS nativo.
- `/`: home responsive con mockup conceptual, sectores, FAQ y preparación de demo.
- `/soluciones/` y seis páginas: restaurantes, bares, cafeterías, hoteles, eventos y multisede.
- `/funcionalidades/`: catálogo de 14 módulos en cinco áreas, búsqueda local sin distinción de tildes/mayúsculas, contador de resultados, estado vacío, limpiar búsqueda, navegación por área y enlaces a soluciones.
- Catálogo completo sin JavaScript. Menús con teclado y Escape, detalles nativos, metadatos y noindex.
- `/404.html`: interfaz; comportamiento HTTP final depende del hosting.
- Referencia de marca interna en docs/brand-preview.html, fuera de dist.
- Matriz SaaS generada con `npm run docs:features` desde src/data/features.ts; estados, evidencia, dependencias y límites por módulo. Todos los módulos siguen sin verificación operativa.
- `/precios/`: factores de alcance, condiciones por definir y FAQ comercial, sin tarifas ni planes inventados.
- `/solicitar-demo/`: guía local con tres selecciones, validación, resumen, descarga TXT, invalidación al cambiar campos y reset; no recibe solicitudes. Alternativa informativa sin JS.
- `/legal/privacidad/`: versión para revisión con responsable/domicilio/correo/WhatsApp confirmados; enlace en el pie.
- Contacto WhatsApp en demo: mensaje genérico, aviso de tercero y enlace a privacidad; sin adjuntar guía ni enviar mensajes. Datos centralizados en src/data/contact.ts para futuros cambios.
- `/recursos/` y tres guías originales: revisión de caja, organización inicial de insumos y evaluación de software. `/preguntas-frecuentes/`: doce respuestas por tema, compartidas con home/precios.
- `/admin/`: panel de entrada a Pages CMS; autenticación y edición en servicio externo. Configuración .pages.yml con 23 editores y medios.
- Contenido editorial migrado a content/*.json: marca/logos/SEO, menús, contactos, textos por página, home, precios, sectores, módulos, FAQ y guías. Validación automática antes del build.
- Render de logos/favicón y variante de pie oscuro configurables. Originales oficiales cargados por el propietario desde Pages CMS y seleccionados en site.json; cabecera, pie y favicon verificados. No se alteraron sus bytes.
- Wrangler fijado, wrangler.jsonc de assets estáticos, build previo obligatorio y pruebas del runtime local. Sin APIs/bindings nuevos ni despliegue.
- Workflow Site and CMS quality para push a la rama de trabajo y PR: instalación, check, dry-run, páginas/enlaces/navegación/axe y artefactos; sin deploy. Primera ejecución alojada pendiente de comprobar.
- Empaquetado verifica rutas esperadas dinámicamente (19 actuales). No hay páginas individuales de módulos ni receptor propio de leads. Otros legales pendientes.

## Fases

0 inicialización completada; 1 investigación parcial; 2 sistema visual base y logos integrados; 3 home inicial implementada; 4 soluciones iniciales implementadas; 5 catálogo implementado, páginas individuales condicionadas a evidencia; 6 precios/guía y contacto externo implementados, tarifas y revisión operativa de privacidad pendientes; 7 recursos y FAQ iniciales implementados, SEO/indexación parciales; 8 auditoría automática local y correcciones completadas; revisión manual final pendiente; 9 configuración Worker reproducible y validación local implementadas; verificación remota/autorización pendientes; 10 lanzamiento oficial pendiente.

## Validación de esta entrega

- Primer guardado real de Pages CMS confirmado por commits 1206881, a3803b7, 222f48b y 55f79ee: tres originales y selección de marca. Incorporados mediante fast-forward, conservando los cambios del usuario.
- Dimensiones horizontales corregidas a 7958 × 2005, coincidentes con los originales. PNG sin transformar; hashes en qa/brand-report.json.
- npm run check: 40 archivos, cero errores/advertencias. Build: 19 páginas; content:check: 14 módulos, tres guías y 23 editores.
- test:brand aprobado en seis anchos (320–1440), cabecera/pie/fav y bytes idénticos. Corregido desbordamiento del adorno del hero a 900 px. Captura móvil revisada visualmente.
- test:ci local aprobado: 19 rutas, 66 destinos, navegación sin JS/teclado/200% y 41 comprobaciones axe sin infracciones automáticas. Incomplete de contraste conserva revisión separada; no es certificación WCAG.
- Lighthouse local final con logos: rendimiento 100/96/100 para home/funcionalidades/demo; accesibilidad y buenas prácticas 100; SEO 66 por noindex deliberado. Funcionalidades CLS 0.119: pendiente de mejorar. Imágenes originales grandes: oportunidad de optimización sin reemplazarlas silenciosamente.
- Ejecución alojada de Actions y PR existentes no verificadas por limitación de API. No confundir pruebas locales con CI remoto verde.

## Git, despliegue y agentes

- Nueva rama `feat/feature-catalog`, basada en `feat/brand-foundation` en d7ffa5f. Consultar SHA final con git log; se verifica el remoto al entregar.
- El usuario conectó GitHub a Cloudflare **Workers** y desplegó `feat/brand-foundation` en https://sistematicando-web.manaturaloso.workers.dev. Informó que la web aparece. Esto corrige los registros anteriores que solo preparaban Pages.
- El entorno no pudo consultar esa URL: el proxy negó el CONNECT con 403. No confundir ese bloqueo con un error del sitio. El despliegue externo no está validado por el agente.
- Se trabaja y guarda en una rama distinta para no actualizar la rama del Worker. No se ejecuta despliegue, se integra una PR ni se modifica DNS. Revisar los triggers de Cloudflare antes de integrar: el push a una rama seguida podría desplegar automáticamente.
- API GitHub GraphQL devuelve Forbidden en consultas previas; no se asume que no existan PR abiertas. Solo Codex principal, sin subagentes.

## Problemas y decisiones pendientes

Evidencia operativa del SaaS; precios y condiciones; adopción final y revisión operativa de privacidad; dominio definitivo y revisión legal. Revisión manual con dispositivos/lector de pantalla, CLS del catálogo y peso de PNG. Se mantiene noindex/robots; no hay backend ni envíos simulados. CMS conectado y logos cargados ya no son pendientes.

## Siguiente paso exacto

1. Revisar esta versión validada en feat/feature-catalog y obtener autorización explícita para integrarla en feat/brand-foundation: Cloudflare podría desplegar automáticamente. No cambiar DNS ni retirar noindex.
2. Antes de integrar, fetch de ambas ramas y revisar cambios nuevos. La rama seguida observada está en ed7227d: añadió .pages.yml vacío; simulación merge-tree aprobada sin conflictos y conserva configuración completa del CMS. No se modificó esa rama.
3. Tras autorización, integrar sin descartar commits del propietario; revisar Actions y despliegue, comprobar Worker real y edición desde /admin. Hoy solo se confirmó guardado CMS mediante Git y runtime local, no login del agente ni versión pública nueva.
4. Resolver CLS del catálogo, revisión manual final y datos comerciales/legales pendientes antes del lanzamiento oficial. Datos confirmados están en content/contact.json; no volver a pedirlos.
5. Consultar git log -1 y git ls-remote origin para el SHA de entrega; commits de esta entrega sobre 55f79ee. Agente: Codex principal, sin subagentes.

## Datos comerciales aplicados

Responsable JOEL ALEJANDRO YAÑEZ CABALLERO, RUC 10477365928; domicilio Calle Enrique Barrón 586, Barranco; correo joel.yc23@gmail.com; WhatsApp Perú +51 956 832 336 también autorizado para consultas y derechos de privacidad. El usuario prevé cambiar los canales después; están centralizados. Estado completo en PRIVACY_REVIEW.md. Solo Codex principal, sin subagentes.

Confirmación actual: «Ya está». Guardado real del CMS corroborado con los cuatro commits indicados; sustituye el estado anterior de conexión pendiente.

Worker local con originales: test:worker aprobado, 30 comprobaciones de rutas, hashes de fuentes/logos/favicón, 404 privados, normalización, query, POST 405 y navegador móvil. Servidor detenido después de validar. Request.cf usa fallback local; no es fallo de assets ni validación pública. Check requiere ASTRO_TELEMETRY_DISABLED=1 y Wrangler XDG_CONFIG_HOME=/tmp/sistematicando-config en este entorno de permisos.
