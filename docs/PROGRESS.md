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
- Navegación/CTA y textos de canal actualizados. Empaquetador para trece páginas. Pendientes páginas individuales de módulos, recursos, otros legales y receptor propio de leads (no necesario para el enlace externo).

## Fases

0 inicialización completada; 1 investigación parcial; 2 sistema visual base, logos pendientes; 3 home inicial implementada; 4 soluciones iniciales implementadas; 5 catálogo implementado, páginas individuales condicionadas a evidencia; 6 precios/guía y contacto externo implementados, tarifas y revisión operativa de privacidad pendientes; 7 SEO parcial; 8 QA parcial; 9 preparación parcial; 10 lanzamiento oficial pendiente.

## Validación de esta entrega

- Astro check: cero errores/advertencias/hints (21 archivos). Build: trece páginas.
- Privacidad/WhatsApp a 320/390/768/900/1024/1440: número, mensaje codificado genérico, datos del responsable, enlaces de privacidad/correo, rel/target, ausencia de transmisión de guía y activación por teclado interceptada sin contactar al tercero. Sin solicitudes externas automáticas. Enlaces visibles sin JS.
- Regresiones de comercial/guía (6 anchos), home (4), catálogo (6) y soluciones (28 combinaciones) aprobadas. Captura móvil de privacidad revisada.
- Empaquetado de trece páginas validado. Sin envío de mensajes, verificación de bandejas, auditoría legal o comprobación de titularidad externa. No se afirma cumplimiento integral. Ver QA.md.

## Git, despliegue y agentes

- Nueva rama `feat/feature-catalog`, basada en `feat/brand-foundation` en d7ffa5f. Consultar SHA final con git log; se verifica el remoto al entregar.
- El usuario conectó GitHub a Cloudflare **Workers** y desplegó `feat/brand-foundation` en https://sistematicando-web.manaturaloso.workers.dev. Informó que la web aparece. Esto corrige los registros anteriores que solo preparaban Pages.
- El entorno no pudo consultar esa URL: el proxy negó el CONNECT con 403. No confundir ese bloqueo con un error del sitio. El despliegue externo no está validado por el agente.
- Se trabaja y guarda en una rama distinta para no actualizar la rama del Worker. No se ejecuta despliegue, se integra una PR ni se modifica DNS. Revisar los triggers de Cloudflare antes de integrar: el push a una rama seguida podría desplegar automáticamente.
- API GitHub GraphQL devuelve Forbidden en consultas previas; no se asume que no existan PR abiertas. Solo Codex principal, sin subagentes.

## Problemas y decisiones pendientes

Logos originales descargables; evidencia del SaaS; precios y condiciones; adopción final y revisión operativa de privacidad; dominio definitivo y revisión legal. Se mantiene noindex/robots. No hay backend ni envíos simulados.

## Siguiente paso exacto

1. Recuperar `feat/feature-catalog`, leer AGENTS/DECISIONS, ejecutar npm ci, check y build según README. Usar docs:features después de cambiar el registro de módulos.
2. Datos de responsable, domicilio, correo y WhatsApp ya confirmados e implementados: no volver a pedirlos. Revisar PRIVACY_REVIEW.md para conservación, accesos y proveedores antes de adoptar la versión legal definitiva. Si cambian correo o WhatsApp, editar contact.ts y repetir verify-privacy.py.
3. Avanzar fase 7 de forma independiente: `/recursos/` y preguntas frecuentes compartidas, con contenido original y útil; mantener noindex. No inventar métricas SEO, dominio definitivo ni sitemap indexable.
4. Si llegan precios aprobados o evidencia del SaaS, actualizar primero los registros correspondientes y revisar el copy. Las páginas individuales de módulos siguen condicionadas a evidencia.
5. Revisar e integrar esta rama solo cuando se autorice actualizar la rama del Worker; comprobar triggers de Cloudflare. No desplegar ni conectar dominio oficial por continuar programando.

## Datos comerciales aplicados

Responsable JOEL ALEJANDRO YAÑEZ CABALLERO, RUC 10477365928; domicilio Calle Enrique Barrón 586, Barranco; correo joel.yc23@gmail.com; WhatsApp Perú +51 956 832 336 también autorizado para consultas y derechos de privacidad. El usuario prevé cambiar los canales después; están centralizados. Estado completo en PRIVACY_REVIEW.md. Solo Codex principal, sin subagentes.
