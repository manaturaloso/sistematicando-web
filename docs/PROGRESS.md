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
- Render de logos/favicón y variante de pie oscuro configurables. Logo oficial aún pendiente de subir: no hay binarios originales en el workspace y no se han recreado.
- Wrangler fijado, wrangler.jsonc de assets estáticos, build previo obligatorio y pruebas del runtime local. Sin APIs/bindings nuevos ni despliegue.
- Workflow Site and CMS quality para push a la rama de trabajo y PR: instalación, check, dry-run, páginas/enlaces/navegación/axe y artefactos; sin deploy. Primera ejecución alojada pendiente de comprobar.
- Empaquetado verifica rutas esperadas dinámicamente (19 actuales). No hay páginas individuales de módulos ni receptor propio de leads. Otros legales pendientes.

## Fases

0 inicialización completada; 1 investigación parcial; 2 sistema visual base, logos pendientes; 3 home inicial implementada; 4 soluciones iniciales implementadas; 5 catálogo implementado, páginas individuales condicionadas a evidencia; 6 precios/guía y contacto externo implementados, tarifas y revisión operativa de privacidad pendientes; 7 recursos y FAQ iniciales implementados, SEO/indexación parciales; 8 auditoría automática local y correcciones completadas; revisión manual final pendiente; 9 configuración Worker reproducible y validación local implementadas; verificación remota/autorización pendientes; 10 lanzamiento oficial pendiente.

## Validación de esta entrega

- Fetch remoto confirmó HEAD igual a la rama de trabajo, sin commits nuevos del CMS. El usuario confirmó que todavía no lo ha conectado; no inferir autenticación ni subida de logo.
- npm ci --include=dev y check aprobados; Worker dry-run reconstruyó 19 páginas y terminó sin publicar.
- Suite local equivalente a CI: 19 rutas y 66 destinos internos aprobados, navegación sin JS/teclado/200%, axe 41 comprobaciones sin infracciones automáticas. Se preservan incomplete y su revisión aparte.
- YAML del workflow parseado, triggers/permisos/acciones contrastados; sin ejecución alojada confirmada. No se afirma CI verde en GitHub ni CMS conectado.
- scripts soportan CHROMIUM_PATH para usar el navegador instalado en CI. No cambió el contenido ni el Worker público.
- Evidencia site-report y accessibility-report regenerada para esta ejecución. No se reutilizan informes viejos si falla un job. Ver CI.md y QA.md.

## Git, despliegue y agentes

- Nueva rama `feat/feature-catalog`, basada en `feat/brand-foundation` en d7ffa5f. Consultar SHA final con git log; se verifica el remoto al entregar.
- El usuario conectó GitHub a Cloudflare **Workers** y desplegó `feat/brand-foundation` en https://sistematicando-web.manaturaloso.workers.dev. Informó que la web aparece. Esto corrige los registros anteriores que solo preparaban Pages.
- El entorno no pudo consultar esa URL: el proxy negó el CONNECT con 403. No confundir ese bloqueo con un error del sitio. El despliegue externo no está validado por el agente.
- Se trabaja y guarda en una rama distinta para no actualizar la rama del Worker. No se ejecuta despliegue, se integra una PR ni se modifica DNS. Revisar los triggers de Cloudflare antes de integrar: el push a una rama seguida podría desplegar automáticamente.
- API GitHub GraphQL devuelve Forbidden en consultas previas; no se asume que no existan PR abiertas. Solo Codex principal, sin subagentes.

## Problemas y decisiones pendientes

Conectar Pages CMS con GitHub y subir los logos originales; evidencia del SaaS; precios y condiciones; adopción final y revisión operativa de privacidad; dominio definitivo y revisión legal. Se mantiene noindex/robots. No hay backend ni envíos simulados.

## Siguiente paso exacto

1. Leer ADMIN.md. El propietario debe iniciar sesión en app.pagescms.org y autorizar su GitHub App únicamente para este repositorio; seleccionar feat/feature-catalog. La web no almacena credenciales.
2. Cargar originales del logo en Medios y seleccionarlos en Marca. Hacer una edición pequeña y verificar el commit real en GitHub. Requiere cuenta del usuario; no se ha probado todavía.
3. Revisar diff y build. Para ver estos cambios en el Worker debe autorizarse la integración o cambio de rama seguida; no hacerlo por continuar programando.
4. Revisar contenido y prácticas pendientes de privacidad, alcance SaaS y precios. Datos de contacto confirmados en content/contact.json; no volver a pedirlos. Los archivos src/data son adaptadores, no la fuente editable.
5. Configuración Worker y dry-run ya implementados y probados. Confirmar configuración real de Workers Builds y permisos antes de integrar. Repetir test:worker con contenido/logo final. La siguiente validación pendiente es un guardado real del CMS y revisión del logo por el propietario; después revisión manual final. No retirar noindex ni inventar dominio definitivo.
6. Revisar Actions → Site and CMS quality para este SHA después de guardar y confirmar resultado; el workflow todavía no está validado en GitHub. Mantener docs y GitHub actualizados. docs:features para matriz, cms:config para esquema, content:check antes de build.

## Datos comerciales aplicados

Responsable JOEL ALEJANDRO YAÑEZ CABALLERO, RUC 10477365928; domicilio Calle Enrique Barrón 586, Barranco; correo joel.yc23@gmail.com; WhatsApp Perú +51 956 832 336 también autorizado para consultas y derechos de privacidad. El usuario prevé cambiar los canales después; están centralizados. Estado completo en PRIVACY_REVIEW.md. Solo Codex principal, sin subagentes.

Confirmación del usuario en esta entrega: **todavía no ha conectado el CMS**. Paso externo pendiente: autorizar Pages CMS con su cuenta y probar un guardado. No sustituir esa prueba por otra implementación ni declararla hecha.
