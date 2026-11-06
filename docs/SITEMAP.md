# Arquitectura

## Actualización vigente: planes propuestos (5/11/2026)

El propietario delegó elegir precios y funciones. Implementada la propuesta Esencial S/99, Gestión S/199 y Multisede S/399 al mes por cuenta, con puesta en marcha S/199, S/399 y S/699 respectivamente. [PRICING_STRATEGY.md](PRICING_STRATEGY.md) contiene módulos, límites, extras, criterios y condiciones pendientes. Sustituye referencias anteriores a no diseñar tarifas o esperar elección entre planes y propuesta personalizada. Sigue siendo borrador sin publicación y sin validar disponibilidad del SaaS. 42 páginas y 34 editores conservados. Fuente única content/pricing.json; editor de planes en /admin. CI añade verify-pricing.mjs y pricing-report.json, incluidos en artefactos.

Siguiente paso: revisar viabilidad económica/tributaria y condiciones de contratación de esta propuesta; incorporar evidencia real de CI y pruebas humanas cuando esté disponible. No pedir otra vez diseñar los planes ni publicar. Agente principal únicamente.

## Implementado (desarrollo, noindex)

- `/`: home.
- `/soluciones/`: índice de sectores.
- `/funcionalidades/`: catálogo conceptual con búsqueda y enlaces por área.
- `/contacto/`: WhatsApp comercial y canales de privacidad, sin receptor propio.
- `/precios/`: información sobre alcance y condiciones pendientes, sin tarifas oficiales.
- `/solicitar-demo/`: guía local y enlace voluntario a WhatsApp.
- `/legal/privacidad/`: versión para revisión, con contactos del responsable.
- `/soluciones/restaurantes/`
- `/soluciones/bares/`
- `/soluciones/cafeterias/`
- `/soluciones/hoteles/`
- `/soluciones/eventos/`
- `/soluciones/multisede/`
- `/404.html`: página de error a configurar en hosting estático.
- `docs/brand-preview.html`: referencia interna fuera de dist, con servidor independiente.

## Nuevas rutas implementadas

- /admin/: acceso al editor externo autenticado.
- /recursos/: índice de guías.
- /recursos/guias/preparar-cierre-de-caja/
- /recursos/guias/ordenar-inventario-inicial/
- /recursos/guias/evaluar-software-para-tu-negocio/
- /preguntas-frecuentes/: FAQ compartida con home/precios.

## Siguiente

Desarrollo: 42 páginas, incluido contacto; CMS con 34 editores. Auditoría automática local y pruebas de navegación implementadas. Quedan revisión manual/dispositivos/lector, aprobación comercial/privacidad y lanzamiento con dominio/indexación autorizados. Contacto externo por WhatsApp y correo de privacidad disponible; recepción propia de datos no implementada. Las páginas de módulos ya están preparadas como objetivo de lanzamiento; la disponibilidad real requiere validación antes de publicar. Recursos y FAQ iniciales ya están implementados. Sin sitemap público hasta contar con dominio y aprobación de indexación.

- /version.json: metadatos de compilación estáticos, enlazados desde /admin; no es una página comercial ni una API con backend.

## Páginas individuales de módulos (borrador de lanzamiento)

- /funcionalidades/punto-de-venta/
- /funcionalidades/caja/
- /funcionalidades/mesas-y-comandas/
- /funcionalidades/inventarios/
- /funcionalidades/recetas-y-costos/
- /funcionalidades/compras-y-proveedores/
- /funcionalidades/facturacion-electronica/
- /funcionalidades/reservas/
- /funcionalidades/clientes/
- /funcionalidades/reportes/
- /funcionalidades/personal-y-permisos/
- /funcionalidades/multisede/
- /funcionalidades/eventos-y-entradas/
- /funcionalidades/control-de-accesos/

Rutas completas generadas desde contenido CMS. Su preparación no verifica la disponibilidad real del producto ni autoriza publicación.

## Empresa y recursos editoriales implementados

- `/nosotros/`: enfoque y principios de marca; enlaces a sectores/contacto.
- `/ayuda/`: recorridos internos, FAQ compartida y orientación al contacto.
- `/blog/`: índice editorial.
- `/blog/elegir-que-ordenar-primero/`
- `/blog/estandarizar-al-crecer-en-sedes/`
- `/blog/conectar-pedido-cierre-operacion/`

Artículos en `content/articles.json`, rutas generadas por slug y enlaces a módulos/guías existentes. Son borradores editoriales, sin fecha ni autor inventados. No hay feed público ni comentarios.

- `/implementacion/`: cuatro etapas por acordar, preparación y responsabilidades. Se llega desde precios/demo; anclas paso-1 a paso-4, sin envío de datos.

- `/legal/terminos/`: borrador de uso del sitio, índice de ocho secciones, identidad/contacto y enlace a privacidad. No contrato SaaS.

Inventario técnico completo y generado: RELEASE_CHECKLIST.md (42 páginas actuales, enlaces, metadatos y axe). /404.html se verifica además como respuesta 404 real con recuperación a Inicio/Ayuda en Worker local. No es un sitemap público ni habilita indexación.

6/11/2026: nueva /admin/editor/, interfaz de edición visual funcional solo con servidor local; estática de lectura sin API en build. Total actual 43 páginas HTML. VISUAL_EDITOR.md registra alcance y autenticación alojada pendiente.
