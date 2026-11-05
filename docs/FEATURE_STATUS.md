# Estado funcional

Generado con `npm run docs:features` desde content/features.json a través de src/data/features.ts. No editar esta matriz manualmente: actualizar la fuente y regenerar. El inventario describe el SaaS, no el estado de implementación del sitio.

## Web comercial

Home, soluciones, catálogo, recursos/FAQ y /admin de acceso CMS implementados; CMS conectado a GitHub con guardado real verificado. Página de contacto y metadatos de versión implementados. Planes y precios propuestos por encargo (PRICING_STRATEGY.md), pendientes de validación económica/tributaria, y guía local de demo descargable implementados; sin receptor propio; contacto voluntario externo por WhatsApp y política de privacidad en revisión. La guía no transmite datos. Las 14 páginas de módulos usan contenido de lanzamiento como objetivo completo, por indicación del propietario, mientras el producto sigue parcialmente desarrollado. launchDraft identifica el borrador y no autoriza publicación. Los estados de los módulos SaaS no cambian por implementar estas páginas.

## Matriz SaaS

| ID | Módulo | Grupo | Estado | Sectores |
|---|---|---|---|---|
| punto-de-venta | Punto de venta | Ventas y operación | No verificada | restaurantes, bares, cafeterias |
| caja | Caja | Ventas y operación | No verificada | restaurantes, bares, cafeterias |
| mesas-y-comandas | Mesas y comandas | Ventas y operación | No verificada | restaurantes, bares |
| inventarios | Inventarios | Administración | No verificada | restaurantes, bares, cafeterias |
| recetas-y-costos | Recetas y costos | Administración | No verificada | restaurantes, cafeterias, bares |
| compras-y-proveedores | Compras y proveedores | Administración | No verificada | restaurantes, cafeterias |
| facturacion-electronica | Facturación electrónica | Administración | No verificada | restaurantes, bares, cafeterias, hoteles |
| reservas | Reservas | Clientes y reservas | No verificada | restaurantes, hoteles |
| clientes | Clientes | Clientes y reservas | No verificada | restaurantes, cafeterias, hoteles |
| reportes | Reportes | Equipo y gestión | No verificada | restaurantes, cafeterias, multisede |
| personal-y-permisos | Personal y permisos | Equipo y gestión | No verificada | restaurantes, bares, multisede |
| multisede | Multisede | Equipo y gestión | No verificada | multisede, hoteles |
| eventos-y-entradas | Eventos y entradas | Eventos y accesos | No verificada | eventos |
| control-de-accesos | Control de accesos | Eventos y accesos | No verificada | eventos |

## Evidencia y límites

### Punto de venta

- ID: `punto-de-venta`.
- Descripción: Evaluar cómo registrar productos, pedidos y pagos en tu atención diaria.
- Evidencia: docs/PROJECT_BRIEF.md, sección 7. Sin evidencia operativa del SaaS.
- Dependencias: Verificar flujo de ventas, dispositivos y métodos de pago.
- Riesgos / afirmaciones no permitidas: Sin confirmación de compatibilidad con equipos o pasarelas de pago.
- Comunicación permitida: presentar como área conceptual a evaluar, con estado no verificada; no afirmar disponibilidad ni inclusión comercial.

### Caja

- ID: `caja`.
- Descripción: Dar contexto a aperturas, movimientos y cierres por turno.
- Evidencia: docs/PROJECT_BRIEF.md, sección 7. Sin evidencia operativa del SaaS.
- Dependencias: Verificar movimientos, cierres y atribución por usuario.
- Riesgos / afirmaciones no permitidas: No se garantiza conciliación automática ni integración bancaria.
- Comunicación permitida: presentar como área conceptual a evaluar, con estado no verificada; no afirmar disponibilidad ni inclusión comercial.

### Mesas y comandas

- ID: `mesas-y-comandas`.
- Descripción: Revisar cómo se conectan la atención, los pedidos y su preparación.
- Evidencia: docs/PROJECT_BRIEF.md, sección 7. Sin evidencia operativa del SaaS.
- Dependencias: Verificar estados de pedidos, equipos y flujo cocina/barra.
- Riesgos / afirmaciones no permitidas: No se confirma impresión, pantalla de cocina ni operación offline.
- Comunicación permitida: presentar como área conceptual a evaluar, con estado no verificada; no afirmar disponibilidad ni inclusión comercial.

### Inventarios

- ID: `inventarios`.
- Descripción: Entender existencias, movimientos y reposición de productos e insumos.
- Evidencia: docs/PROJECT_BRIEF.md, sección 7. Sin evidencia operativa del SaaS.
- Dependencias: Verificar existencias por almacén, movimientos y alertas.
- Riesgos / afirmaciones no permitidas: No se garantiza descuento de insumos en tiempo real.
- Comunicación permitida: presentar como área conceptual a evaluar, con estado no verificada; no afirmar disponibilidad ni inclusión comercial.

### Recetas y costos

- ID: `recetas-y-costos`.
- Descripción: Relacionar preparaciones, cantidades e ingredientes para evaluar costos.
- Evidencia: docs/PROJECT_BRIEF.md, sección 7. Sin evidencia operativa del SaaS.
- Dependencias: Verificar recetas, rendimientos y relación con compras e inventario.
- Riesgos / afirmaciones no permitidas: Sin evidencia de cálculo automático de márgenes o rentabilidad.
- Comunicación permitida: presentar como área conceptual a evaluar, con estado no verificada; no afirmar disponibilidad ni inclusión comercial.

### Compras y proveedores

- ID: `compras-y-proveedores`.
- Descripción: Examinar cómo registras compras y mantienes el contexto de tus proveedores.
- Evidencia: docs/PROJECT_BRIEF.md, sección 7. Sin evidencia operativa del SaaS.
- Dependencias: Verificar proveedores, recepción y relación con existencias.
- Riesgos / afirmaciones no permitidas: No se confirma integración contable ni emisión de órdenes automáticas.
- Comunicación permitida: presentar como área conceptual a evaluar, con estado no verificada; no afirmar disponibilidad ni inclusión comercial.

### Facturación electrónica

- ID: `facturacion-electronica`.
- Descripción: Definir necesidades de comprobantes y su relación con la venta en Perú.
- Evidencia: docs/PROJECT_BRIEF.md, sección 7. Sin evidencia operativa del SaaS.
- Dependencias: Validar integración, proveedor, alcance tributario y estados de comprobantes.
- Riesgos / afirmaciones no permitidas: No se afirma integración SUNAT operativa, certificación ni cumplimiento completo.
- Comunicación permitida: presentar como área conceptual a evaluar, con estado no verificada; no afirmar disponibilidad ni inclusión comercial.

### Reservas

- ID: `reservas`.
- Descripción: Revisar disponibilidad, horarios y preparación de la atención.
- Evidencia: docs/PROJECT_BRIEF.md, sección 7. Sin evidencia operativa del SaaS.
- Dependencias: Verificar calendario, disponibilidad, confirmaciones y alcance por sector.
- Riesgos / afirmaciones no permitidas: No se confirma PMS, reservas hoteleras ni conexión con OTAs.
- Comunicación permitida: presentar como área conceptual a evaluar, con estado no verificada; no afirmar disponibilidad ni inclusión comercial.

### Clientes

- ID: `clientes`.
- Descripción: Definir qué información es útil para acompañar una relación comercial.
- Evidencia: docs/PROJECT_BRIEF.md, sección 7. Sin evidencia operativa del SaaS.
- Dependencias: Confirmar campos, permisos y obligaciones de privacidad.
- Riesgos / afirmaciones no permitidas: No se garantiza CRM completo, campañas ni automatización de marketing.
- Comunicación permitida: presentar como área conceptual a evaluar, con estado no verificada; no afirmar disponibilidad ni inclusión comercial.

### Reportes

- ID: `reportes`.
- Descripción: Identificar qué información necesitas para revisar tu operación.
- Evidencia: docs/PROJECT_BRIEF.md, sección 7. Sin evidencia operativa del SaaS.
- Dependencias: Verificar fuentes, indicadores, periodos y permisos.
- Riesgos / afirmaciones no permitidas: No se afirman indicadores o actualizaciones en tiempo real disponibles.
- Comunicación permitida: presentar como área conceptual a evaluar, con estado no verificada; no afirmar disponibilidad ni inclusión comercial.

### Personal y permisos

- ID: `personal-y-permisos`.
- Descripción: Separar responsabilidades y accesos según el trabajo de cada persona.
- Evidencia: docs/PROJECT_BRIEF.md, sección 7. Sin evidencia operativa del SaaS.
- Dependencias: Verificar permisos granulares, alcance por sede, PIN y auditoría.
- Riesgos / afirmaciones no permitidas: No se confirma seguridad operativa de dispositivos compartidos ni políticas de sesión.
- Comunicación permitida: presentar como área conceptual a evaluar, con estado no verificada; no afirmar disponibilidad ni inclusión comercial.

### Multisede

- ID: `multisede`.
- Descripción: Evaluar la relación entre la gestión central y cada establecimiento.
- Evidencia: docs/PROJECT_BRIEF.md, sección 7. Sin evidencia operativa del SaaS.
- Dependencias: Verificar separación de datos, consolidación y límites comerciales.
- Riesgos / afirmaciones no permitidas: Sin garantía de reportes consolidados o módulos incluidos por local.
- Comunicación permitida: presentar como área conceptual a evaluar, con estado no verificada; no afirmar disponibilidad ni inclusión comercial.

### Eventos y entradas

- ID: `eventos-y-entradas`.
- Descripción: Definir tipos de entrada y atención a compradores de un evento.
- Evidencia: docs/PROJECT_BRIEF.md, sección 7. Sin evidencia operativa del SaaS.
- Dependencias: Verificar emisión, compradores, pagos y alcance de códigos QR.
- Riesgos / afirmaciones no permitidas: No se confirma venta online, pasarela ni emisión operativa de QR.
- Comunicación permitida: presentar como área conceptual a evaluar, con estado no verificada; no afirmar disponibilidad ni inclusión comercial.

### Control de accesos

- ID: `control-de-accesos`.
- Descripción: Revisar qué necesita el equipo en puerta para gestionar el ingreso.
- Evidencia: docs/PROJECT_BRIEF.md, sección 7. Sin evidencia operativa del SaaS.
- Dependencias: Validar lectores, estados de entrada y condiciones de conectividad.
- Riesgos / afirmaciones no permitidas: No se afirma validación offline, antifraude ni compatibilidad con lectores.
- Comunicación permitida: presentar como área conceptual a evaluar, con estado no verificada; no afirmar disponibilidad ni inclusión comercial.

## Alcance adicional

PMS completo, dispositivos compartidos/PIN, auditoría y otras capacidades descritas en el brief no están verificados. No se han añadido como módulos disponibles. No se confirma integración SUNAT, pagos ni controles de seguridad operativos. Antes de cambiar un estado se necesita evidencia real del producto y revisar el copy del catálogo.
