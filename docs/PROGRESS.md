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
- Navegación y CTA de home/soluciones conectan el flujo comercial. Empaquetador actualizado para doce páginas. Pendientes páginas individuales de módulos, recursos, contacto, legales y receptor de demo.

## Fases

0 inicialización completada; 1 investigación parcial; 2 sistema visual base, logos pendientes; 3 home inicial implementada; 4 soluciones iniciales implementadas; 5 catálogo implementado, páginas individuales condicionadas a evidencia; 6 precios/guía implementados, recepción y planes bloqueados por configuración/aprobación; 7 SEO parcial; 8 QA parcial; 9 preparación parcial; 10 lanzamiento oficial pendiente.

## Validación de esta entrega

- Astro check: cero errores/advertencias/hints (18 archivos). Build: doce páginas.
- Precios y demo a 320/390/768/900/1024/1440: rutas, noindex, enlaces, FAQ por teclado, ausencia de overflow, validación de selecciones, generación, descarga y contenido TXT, invalidación del resumen, reset/foco y ausencia de storage/envíos. Alternativa sin JavaScript comprobada.
- Regresión home: cuatro anchos; catálogo: seis; soluciones: 28 combinaciones. Capturas de precios desktop/demo móvil revisadas.
- Matriz regenerada y ZIP de doce páginas verificado. No se ejecutaron axe/Lighthouse ni validación de recepción de leads, que no existe aún. Ver QA.md.

## Git, despliegue y agentes

- Nueva rama `feat/feature-catalog`, basada en `feat/brand-foundation` en d7ffa5f. Consultar SHA final con git log; se verifica el remoto al entregar.
- El usuario conectó GitHub a Cloudflare **Workers** y desplegó `feat/brand-foundation` en https://sistematicando-web.manaturaloso.workers.dev. Informó que la web aparece. Esto corrige los registros anteriores que solo preparaban Pages.
- El entorno no pudo consultar esa URL: el proxy negó el CONNECT con 403. No confundir ese bloqueo con un error del sitio. El despliegue externo no está validado por el agente.
- Se trabaja y guarda en una rama distinta para no actualizar la rama del Worker. No se ejecuta despliegue, se integra una PR ni se modifica DNS. Revisar los triggers de Cloudflare antes de integrar: el push a una rama seguida podría desplegar automáticamente.
- API GitHub GraphQL devuelve Forbidden en consultas previas; no se asume que no existan PR abiertas. Solo Codex principal, sin subagentes.

## Problemas y decisiones pendientes

Logos originales descargables; evidencia del SaaS; precios y condiciones; receptor comercial y privacidad aprobada; dominio definitivo y revisión legal. Se mantiene noindex/robots. No hay backend ni envíos simulados.

## Siguiente paso exacto

1. Recuperar `feat/feature-catalog`, leer AGENTS/DECISIONS, ejecutar npm ci, check y build según README. Usar docs:features después de cambiar el registro de módulos.
2. Se consultó al usuario por canal comercial autorizado y privacidad; siguen sin definir al cerrar esta implementación. Para recepción real, confirmar destinatario/servicio y privacidad aprobada; después implementar integración, estados de error/éxito, validación y antispam. No convertir la guía local en solicitud enviada ficticia ni pedir secretos en chat.
3. Avanzar fase 7 de forma independiente: `/recursos/` y preguntas frecuentes compartidas, con contenido original y útil; mantener noindex. No inventar métricas SEO, dominio definitivo ni sitemap indexable.
4. Si llegan precios aprobados o evidencia del SaaS, actualizar primero los registros correspondientes y revisar el copy. Las páginas individuales de módulos siguen condicionadas a evidencia.
5. Revisar e integrar esta rama solo cuando se autorice actualizar la rama del Worker; comprobar triggers de Cloudflare. No desplegar ni conectar dominio oficial por continuar programando.

## Respuesta comercial recibida durante esta entrega

El usuario indicó WhatsApp +956832336 y pidió generar una política de privacidad. Se redactó docs/PRIVACY_DRAFT.md para web comercial y contacto voluntario por WhatsApp; pendientes de confirmar código de país, identidad/domicilio del responsable, correo y decisiones de conservación/proveedores. Se preguntó si el número corresponde a Perú +51 956 832 336. No se crea enlace hasta confirmarlo. Ver PRIVACY_REVIEW.md para finalizar; este paso tiene prioridad sobre la recepción real de demos. La guía local sigue sin enviar solicitudes.

Actualización posterior: número confirmado como +51 956 832 336 (Perú); responsable JOEL ALEJANDRO YAÑEZ CABALLERO, RUC 10477365928. Ya incorporados al borrador. Pendiente domicilio y correo o confirmación de WhatsApp como canal de privacidad. No volver a preguntar nombre, RUC ni código de país.
