# Decisiones de lanzamiento · 5 de noviembre de 2026

Registro para el propietario; no contiene aprobaciones implícitas. Editar decisiones concretas no autoriza desplegar ni convertir todo el producto en «verificado». La web se prepara como objetivo completo mientras el producto sigue parcialmente desarrollado.

## Ya confirmado: no volver a solicitar por falta de historial

- Propietario/responsable: Joel Alejandro Yañez Caballero; RUC 10477365928. Datos legales y canales en content/contact.json.
- Domicilio: Calle Enrique Barrón 586, Barranco. No se presenta como atención presencial.
- WhatsApp Perú +51 956 832 336, comercial y privacidad. Correo joel.yc23@gmail.com para privacidad, provisional hasta cambio indicado por el propietario.
- Logos originales recibidos/seleccionados; Gluten/Manrope, coral #ed735f y tinta #2a3139.
- CMS conectado a GitHub con acceso desde /admin; edición en feat/feature-catalog.
- Producto parcial; web de lanzamiento completa en borrador. Sin nuevas publicaciones hasta confirmación de producto/web completos y autorización final. No volver a preguntar el estado global para continuar frontend.

- Diseño de precios/planes delegado al agente el 5/11; propuesta implementada, no adopción económica/tributaria ni permiso de publicación.

## Pendientes con evidencia necesaria

| ID | Decisión pendiente | Punto de partida preparado | Para cerrar | Estado |
| --- | --- | --- | --- | --- |
| cms-visual | Edición visual alojada con permisos | Editor local real implementado; Pages CMS conservado | Elegir/configurar servidor autenticado y probar login, permisos, conflictos y guardado GitHub; no publicar API local | Pendiente; nueva necesidad confirmada el 6/11 |
| producto | Alcance disponible para lanzamiento | 14 fichas comerciales; estados reales separados | Evidencia por módulo/integración y revisión del propietario; actualizar fuente/matriz sin falsear estados | Pendiente |
| oferta | Oferta y condiciones de contratación | Tres planes y tres complementos propuestos por encargo; ver PRICING_STRATEGY.md | Validar margen/costes, tratamiento tributario, capacidad de puesta en marcha y condiciones finales; diseño de planes ya delegado e implementado | Pendiente de revisión |
| legal | Adopción de privacidad/términos y operación de datos | Borradores de la web, contacto real, LEGAL_REVIEW.md | Revisión/adopción, conservación/proveedores/solicitudes y acuerdo SaaS separado cuando corresponda | Pendiente |
| manual | Aceptación editorial y pruebas humanas | Capturas, recorridos, teclado/Chromium/movimiento reducido | Observaciones por ruta, dispositivos físicos y lector; resolver incomplete relevantes | Pendiente |
| ci | Resultado real de CI para versión revisada | Workflow exige Chromium/Firefox/WebKit | Enlace de ejecución, SHA, conclusión y compatibility-report real; corregir fallos si los hay | No verificado; consulta Forbidden |
| dominio | Dominio e indexación | Noindex/robots y canonicals/sitemap pendientes | Confirmar dominio/configuración y autorizar preparación técnica cuando corresponda | Pendiente; no cambiar DNS |
| publicacion | Lanzamiento final | Desarrollo separado de Worker | Confirmación explícita de producto/web completos y autorización para un commit concreto | No autorizada para estas entregas |

No se fijan aquí respuestas por defecto para renovación, permanencia, prueba gratuita, migración, capacitación, soporte, reembolsos o jurisdicción. Esos temas deben reflejar el modelo real, no una plantilla inventada. COMMERCIAL_SCOPE.md explica el alcance de las páginas actuales.

## Cómo registrar una revisión concreta

Para cada decisión u observación añadir fecha, quién la confirma, ruta/sección, texto o condición aprobada, evidencia/enlace y si queda trabajo técnico. Si una decisión no se ha tomado, conservar Pendiente; no inferirla de «sigamos». Las autorizaciones antiguas de publicación fueron entregas concretas y no aplican al lanzamiento actual.

## Orden siguiente

1. Revisar REVIEW_PACKAGE.md y registrar observaciones de oferta/alcance y contenido editorial.
2. Añadir el resultado real de CI del SHA que se esté revisando; no reutilizar un verde anterior.
3. Resolver legal/operación de datos y pruebas humanas pendientes con evidencia.
4. Solo después de preparación completa, el propietario decidirá si autoriza publicar un commit concreto. Esta lista no solicita ni concede esa autorización.

Agente que preparó el registro: Codex principal, sin subagentes. Los datos ya confirmados se conservan; el historial de cambios permanece en GitHub.

## Escenarios económicos internos · continuación del 5/11/2026

Implementados scripts/pricing-economics.py, plantilla sin supuestos inventados en docs/commercial/cost-assumptions.example.json y guía docs/commercial/README.md. Lee cuotas actuales; calcula margen de contribución, umbral por cartera de un solo plan, cuota de referencia para objetivo y puesta en marcha separada, con Decimal. Datos desconocidos producen missing-inputs, sin resultados económicos ficticios. No cambia precios ni permite aprobación financiera/publicación automática. Escenarios reales deben permanecer fuera de Git.

Seis pruebas sintéticas aprobadas; ejecución con plantilla vigente detecta 21 entradas pendientes y cero planes calculados. CI incorpora pruebas Python, resultado remoto no confirmado. Sin cambios frontend/CMS, sin repetir navegación/axe/Lighthouse ya aprobados en la entrega anterior. 42 páginas/34 editores terminados como borrador siguen intactos. Solo Codex principal, sin subagentes.

Siguiente paso exacto: completar una copia privada con costos reales por cuenta y de puesta en marcha, costos fijos, margen objetivo e impuesto indirecto confirmado; ejecutar el calculador y revisar viabilidad antes de ajustar/adoptar precios. No se presume impuesto ni se requiere rediseñar planes. Bloqueos operativos/legales/CI/manuales/dominio y autorización final conservados.
