# Alcance comercial de la web · 5 de noviembre de 2026

## Actualización vigente: planes propuestos (5/11/2026)

El propietario delegó elegir precios y funciones. Implementada la propuesta Esencial S/99, Gestión S/199 y Multisede S/399 al mes por cuenta, con puesta en marcha S/199, S/399 y S/699 respectivamente. [PRICING_STRATEGY.md](PRICING_STRATEGY.md) contiene módulos, límites, extras, criterios y condiciones pendientes. Sustituye referencias anteriores a no diseñar tarifas o esperar elección entre planes y propuesta personalizada. Sigue siendo borrador sin publicación y sin validar disponibilidad del SaaS. 42 páginas y 34 editores conservados. Fuente única content/pricing.json; editor de planes en /admin. CI añade verify-pricing.mjs y pricing-report.json, incluidos en artefactos.

Siguiente paso: revisar viabilidad económica/tributaria y condiciones de contratación de esta propuesta; incorporar evidencia real de CI y pruebas humanas cuando esté disponible. No pedir otra vez diseñar los planes ni publicar. Agente principal únicamente.

Borrador de lanzamiento del producto completo previsto; no contrato ni evidencia de disponibilidad operativa. No publicar hasta confirmación de producto/web completos y autorización final.

| Recorrido | Implementado | Pendiente antes de contratar/lanzar |
| --- | --- | --- |
| Precios | Factores de alcance, condiciones a revisar y etapas enlazadas | Tarifas, moneda, impuestos, unidad/periodicidad de cobro y servicios incluidos aprobados |
| Demo | Guía local descargable y WhatsApp externo voluntario | Confirmar disponibilidad y coordinar una demostración real por conversación |
| Implementación | Cuatro etapas, preparación y responsabilidades por acordar | Alcance, migraciones/integraciones, capacitación, calendario, aceptación y soporte aprobados por caso |
| Privacidad | Datos reales del responsable y canales; versión para revisión | Revisión/adopción y correspondencia con tratamiento efectivo, hosting y WhatsApp |
| Términos de la web | Borrador informativo de ocho secciones en /legal/terminos/; sin compra/cobro/aceptación | Revisión/adopción; el contrato SaaS y su modelo comercial deben definirse por separado |

Fuentes: pricing.json, implementation.json, pages.json, contact.json. Los estados reales del SaaS se conservan en FEATURE_STATUS.md; no modificarlos por el tono futuro de la web. No hay integración de leads ni asignación de fechas automática. La web no establece una prueba gratuita, SLA, soporte permanente, migración incluida ni plazos garantizados.

Privacidad revisada contra el código y términos informativos preparados. Siguiente paso: revisar REVIEW_PACKAGE.md y registrar observaciones/decisiones comerciales en LAUNCH_DECISIONS.md; el checklist técnico y los recorridos ya están implementados. Decisiones legales pendientes detalladas en LEGAL_REVIEW.md. Mantener borrador/noindex; no pedir publicación para continuar frontend. Codex principal, sin subagentes.

## Escenarios económicos internos · continuación del 5/11/2026

Implementados scripts/pricing-economics.py, plantilla sin supuestos inventados en docs/commercial/cost-assumptions.example.json y guía docs/commercial/README.md. Lee cuotas actuales; calcula margen de contribución, umbral por cartera de un solo plan, cuota de referencia para objetivo y puesta en marcha separada, con Decimal. Datos desconocidos producen missing-inputs, sin resultados económicos ficticios. No cambia precios ni permite aprobación financiera/publicación automática. Escenarios reales deben permanecer fuera de Git.

Seis pruebas sintéticas aprobadas; ejecución con plantilla vigente detecta 21 entradas pendientes y cero planes calculados. CI incorpora pruebas Python, resultado remoto no confirmado. Sin cambios frontend/CMS, sin repetir navegación/axe/Lighthouse ya aprobados en la entrega anterior. 42 páginas/34 editores terminados como borrador siguen intactos. Solo Codex principal, sin subagentes.

Siguiente paso exacto: completar una copia privada con costos reales por cuenta y de puesta en marcha, costos fijos, margen objetivo e impuesto indirecto confirmado; ejecutar el calculador y revisar viabilidad antes de ajustar/adoptar precios. No se presume impuesto ni se requiere rediseñar planes. Bloqueos operativos/legales/CI/manuales/dominio y autorización final conservados.
