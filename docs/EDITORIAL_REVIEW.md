# Revisión de coherencia y recorridos · 5 de noviembre de 2026

Trabajo independiente de decisiones comerciales/legales. Se revisaron mensajes de la guía local, orientación editorial, navegación guía → módulo y coherencia con la política de privacidad y el objetivo de lanzamiento. No se declara aprobación editorial/legal exhaustiva de todas las páginas ni disponibilidad del SaaS.

| Hallazgo | Corrección implementada | Comprobación |
| --- | --- | --- |
| Demo decía que la guía no se guardaba «entre visitas», sin matizar restauración del navegador | El texto distingue la herramienta sin envíos/historial de la posible restauración de campos por el navegador; coincide con privacidad | Copy CMS/build; pruebas de guía y privacidad conservadas |
| Una guía de evaluación seguía llamando «conceptual» al catálogo, anterior a las 14 fichas de lanzamiento | Orienta a recorrer módulos y contrastar alcance/propuesta, sin inventar disponibilidad, precios ni contratación | Se conserva el borrador global y la matriz real; no se cambian estados de producto |
| Guías enlazaban a una tarjeta del catálogo pese a existir la ficha completa | Enlace directo a /funcionalidades/<id>/ con nombre del módulo | Tres recorridos por teclado con y sin JS; h1 de destino coincide |
| Etiqueta «Guía práctica» y nombres accesibles de índices/soluciones estaban fijados en la plantilla | Tres campos de copy común en Página: recursos-guias-slug | Esquema CMS regenerado sin nuevos editores (34 total), content:check |

## Alcance preservado

No se cambian content/features.json, pricing.json, contact.json ni terms.json: evidencia operativa, factores comerciales, identidad/canales y términos permanecen intactos. No se confirma por silencio la pregunta pendiente sobre propuesta personalizada frente a planes oficiales. Tampoco se cambia la fecha de privacidad ni se adopta un texto legal.

La guía sigue siendo local: validación, generación, TXT, invalidación y reinicio; no envía solicitudes ni adjunta datos a WhatsApp. La información de restauración describe comportamiento posible del navegador; no promete persistencia ni borrado inmediato universal. No se añadieron almacenamiento, CRM, formularios de recepción o servicios externos.

## Pruebas y continuidad

verify-resources amplía el recorrido directo para las tres guías con/sin JS; informe qa/resources-report.json. Check/build y suite completa de la entrega están en PROGRESS.md. Se conservan los informes por identidad de build; no reasignarlos a un SHA posterior. Sin nueva medición Lighthouse por ajustes de copy/enlace, sin cambio de fuentes/logos/assets. Firefox/WebKit siguen pendientes de ejecución real, no se dan por probados por la configuración.

El paquete REVIEW_PACKAGE.md se actualiza y se regenera con package-review.py; la web continúa con 42 páginas y 34 editores, borrador/noindex. Codex principal, sin subagentes; sin publicación.

Siguiente paso exacto: revisar el paquete actualizado y registrar decisiones/observaciones en LAUNCH_DECISIONS.md. Las decisiones comerciales y legales no pueden cerrarse inventando condiciones; incorporar evidencia real de CI cuando sea accesible. No pedir publicar para continuar la revisión.
