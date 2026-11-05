# Revisión legal y comportamiento observado · 5 de noviembre de 2026

## Actualización vigente: planes propuestos (5/11/2026)

El propietario delegó elegir precios y funciones. Implementada la propuesta Esencial S/99, Gestión S/199 y Multisede S/399 al mes por cuenta, con puesta en marcha S/199, S/399 y S/699 respectivamente. [PRICING_STRATEGY.md](PRICING_STRATEGY.md) contiene módulos, límites, extras, criterios y condiciones pendientes. Sustituye referencias anteriores a no diseñar tarifas o esperar elección entre planes y propuesta personalizada. Sigue siendo borrador sin publicación y sin validar disponibilidad del SaaS. 42 páginas y 34 editores conservados. Fuente única content/pricing.json; editor de planes en /admin. CI añade verify-pricing.mjs y pricing-report.json, incluidos en artefactos.

Siguiente paso: revisar viabilidad económica/tributaria y condiciones de contratación de esta propuesta; incorporar evidencia real de CI y pruebas humanas cuando esté disponible. No pedir otra vez diseñar los planes ni publicar. Agente principal únicamente.

Estado: borradores preparados para revisión/adopción; no publicación autorizada ni contrato SaaS. Responsable y canales confirmados por el propietario en contact.json. No sustituye revisión profesional de la versión final.

| Tema | Implementación/fuente revisada | Límite o decisión pendiente |
| --- | --- | --- |
| Navegación | Build estático, fuentes/logos locales; Layout y páginas sin analítica/píxeles propios | Confirmar configuración efectiva de Cloudflare, registros y retención antes de adoptar |
| Guía | Selects → memoria del DOM → TXT por Blob, sin fetch ni persistencia propia | El navegador puede restaurar campos; la descarga queda bajo control del usuario |
| Contacto comercial | WhatsApp externo, mensaje genérico, sin selecciones ni adjuntos automáticos | Prácticas de atención y conservación de conversaciones por definir/adoptar |
| Derechos/privacidad | Correo y WhatsApp reales centralizados | Procedimiento de atención, verificación proporcional, retención y eliminación operativa |
| Administración | /admin enlaza Pages CMS; autenticación/edición externa con GitHub | Revisar permisos de cuentas, historial de autores y condiciones de proveedores |
| Proveedores | Cloudflare al navegar; WhatsApp/correo/CMS al usar esos servicios | Revisar contratos, ubicaciones/transferencias, proveedores efectivos y obligaciones peruanas aplicables |
| Términos del sitio | Ocho secciones informativas en terms.json; sin checkout ni aceptación | Revisión/adopción del texto antes de lanzamiento |
| Contratación SaaS | No implementada en la web comercial | Definir alcance, pago/impuestos, duración/renovación/cancelación, reembolsos si aplican, soporte, implementación, responsabilidad y tratamiento dentro de la app |

Cambios de esta entrega: se elimina la promesa de que recargar siempre vacía campos, se restringe el correo alternativo a privacidad, se explica el CMS externo y se editan los textos de identidad desde CMS con marcadores. La fecha de política en contact.json es la del borrador inicial y no prueba adopción.

No se añadieron cláusulas de renovación automática, permanencia, prueba gratuita, reembolso, jurisdicción elegida ni renuncias generales de responsabilidad. No hay consentimiento contractual simulado ni banner de cookies sin un tratamiento que lo motive. Si cambia la infraestructura o se incorpora analítica/CRM/formularios, revisar textos y permisos antes de activar.

Prueba local verify-legal: rutas legales y generación de guía sin solicitudes externas, cookies ni almacenamiento persistente; con/sin JavaScript, datos reales, contactos y anclas. No cubre el Worker desplegado ni la conducta de terceros. Informe qa/legal-report.json; adopción legal sigue pendiente. Codex principal, sin subagentes.

Siguiente paso exacto: revisar el paquete y registrar decisiones de adopción/operación legal en LAUNCH_DECISIONS.md; el checklist técnico ya está implementado. Mantener noindex, borrador y rama Worker intacta hasta autorización final del propietario.
