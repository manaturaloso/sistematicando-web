# Paquete final de revisión · 5 de noviembre de 2026

## Actualización vigente: planes propuestos (5/11/2026)

El propietario delegó elegir precios y funciones. Implementada la propuesta Esencial S/99, Gestión S/199 y Multisede S/399 al mes por cuenta, con puesta en marcha S/199, S/399 y S/699 respectivamente. [PRICING_STRATEGY.md](PRICING_STRATEGY.md) contiene módulos, límites, extras, criterios y condiciones pendientes. Sustituye referencias anteriores a no diseñar tarifas o esperar elección entre planes y propuesta personalizada. Sigue siendo borrador sin publicación y sin validar disponibilidad del SaaS. 42 páginas y 34 editores conservados. Fuente única content/pricing.json; editor de planes en /admin. CI añade verify-pricing.mjs y pricing-report.json, incluidos en artefactos.

Siguiente paso: revisar viabilidad económica/tributaria y condiciones de contratación de esta propuesta; incorporar evidencia real de CI y pruebas humanas cuando esté disponible. No pedir otra vez diseñar los planes ni publicar. Agente principal únicamente.

La web objetivo está implementada como borrador: 42 páginas, 34 editores CMS y recorridos locales de navegación, catálogo y guía de demo. Esta entrega reúne el material para revisar; no significa que el producto SaaS, los textos legales o el lanzamiento estén aprobados.

## Qué abrir primero

1. Este documento: alcance y recorrido de revisión.
2. [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md): inventario técnico de las 42 rutas y siete pendientes.
3. [LAUNCH_DECISIONS.md](LAUNCH_DECISIONS.md): decisiones del propietario que siguen abiertas, con datos ya confirmados separados.
4. [COMPATIBILITY.md](COMPATIBILITY.md), [VISUAL_REVIEW.md](VISUAL_REVIEW.md) y [PERFORMANCE.md](PERFORMANCE.md): qué se probó, cómo y con qué límites.
5. [HANDOFF.md](HANDOFF.md): continuar desde otra cuenta sin reconstruir el historial.

Las correcciones independientes posteriores están en [EDITORIAL_REVIEW.md](EDITORIAL_REVIEW.md). Los JSON guardados identifican sus propias instantáneas; no se reasignan a un commit posterior. La matriz técnica no certifica el SaaS ni autoriza publicar.

## Qué está terminado en la web

| Área | Implementado y revisable | Fuente de edición |
| --- | --- | --- |
| Marca y portada | Logos originales, fuentes locales, colores, navegación responsive y pie adaptable | Marca/menús/textos en CMS |
| Soluciones | Índice y seis sectores con enlaces a módulos | Soluciones por sector |
| Funcionalidades | Catálogo de 14 módulos, búsqueda/áreas/estado vacío y 14 fichas individuales | Módulos y contenido de lanzamiento |
| Comercial | Precios por propuesta, cuatro etapas de implementación, contacto y guía de demo local descargable | Precios, implementación, contactos y textos por página |
| Editorial | Recursos con tres guías, Blog con tres artículos, Nosotros, Ayuda y FAQ compartida | Guías, artículos, FAQ y textos por página |
| Legal | Privacidad y términos informativos redactados como borradores, con identidad/canales confirmados | Términos y textos legales CMS |
| Administración | /admin abre Pages CMS autenticado, 34 editores y biblioteca de imágenes | GitHub/Pages CMS en feat/feature-catalog |
| Calidad | 404 con recuperación, versión del build, pruebas locales y CI de lectura sin deploy | Scripts y documentos del repositorio |

No hay login de clientes SaaS, compra/cobro, receptor propio de leads ni envío automático de la guía. El panel editorial requiere desarrollo para cambios estructurales/lógica; no es constructor visual arbitrario. Los módulos descritos como objetivo de lanzamiento siguen teniendo evidencia operativa pendiente en [FEATURE_STATUS.md](FEATURE_STATUS.md).

## Recorrido recomendado

| Revisar | Acción | Resultado esperado |
| --- | --- | --- |
| / | Mirar logo, titulares y menú; usar teclado/Escape en móvil | Marca correcta, enlaces visibles y foco recuperable |
| /soluciones/ → un sector | Abrir una prioridad y una ficha de módulo | Contenido coherente con el negocio y navegación completa |
| /funcionalidades/ | Buscar un módulo, probar una palabra inexistente y recuperar un área | Recuento/estado vacío claros y catálogo restaurado |
| /precios/ → /implementacion/ | Revisar condiciones propuestas y etapas | Tres planes autorizados como propuesta, puesta en marcha, totales y extras; condiciones finales pendientes |
| /solicitar-demo/ | Generar, descargar, cambiar una opción y reiniciar | TXT local; resultado invalidado cuando cambia; sin solicitud enviada |
| /contacto/ | Revisar número, identidad y canales de privacidad | Datos confirmados, sin simular recepción ni enviar mensajes durante esta revisión |
| /recursos/ y /blog/ | Leer una guía/artículo y probar su índice | Lectura y enlaces relacionados utilizables en móvil/escritorio |
| /legal/privacidad/ y /legal/terminos/ | Revisar alcance, proveedores y pendientes | Borradores explícitos; términos del sitio separados del contrato SaaS |
| /admin/ | Comparar versión y comprobar los enlaces del editor | CMS externo autenticado y rama correcta; guardar una edición no equivale a publicar |
| Una URL inexistente | Probar Inicio/Ayuda desde el error | 404 real en Worker local y recuperación por teclado |

No hace falta reenviar datos personales ni contraseñas. Contacto comercial y datos del responsable ya están registrados; ver LAUNCH_DECISIONS.md antes de pedirlos de nuevo.

## Preview de esta revisión

El Worker existente no muestra necesariamente estas 42 páginas: sigue sin actualizarse en feat/brand-foundation (557222e); la última identidad pública aportada por el propietario fue af35674. Para revisar esta entrega usar el checkout de desarrollo o el ZIP generado; no publicar para obtener una vista previa.

```sh
# Desde el repositorio:
ASTRO_TELEMETRY_DISABLED=1 npm run build
npm run preview -- --port 4321
# Abrir http://127.0.0.1:4321
```

`python scripts/package-review.py /tmp/sistematicando-review.zip` reúne site-preview.zip y documentos internos separados, con manifiesto de hashes. El ZIP externo es interno: no desplegarlo. El ZIP anidado solo contiene dist, con noindex/robots conservados. Al extraer el paquete, LEEME.md indica cómo abrir la web local sin Node. manifest.json registra la versión real del sitio empaquetado y las identidades de cada informe disponible; no todos fueron ejecutados sobre ese mismo SHA.

## Pruebas y límites que deben mantenerse visibles

- Última suite local: 42 rutas/159 destinos, axe 88 comprobaciones sin infracciones detectadas, reflujo y flujos documentados. Los incomplete y pruebas manuales pendientes no equivalen a aprobados.
- Chromium: cinco escenarios de movimiento normal/reducido y fallback no-JS. Firefox/WebKit solo configurados como obligatorios en CI; resultado real aún no verificado desde este entorno.
- Rendimiento: cinco rutas; módulo 86 inicial y dos 100 sin cambios. Se conserva la variación, no se promete 100 universal ni Core Web Vitals de producción.
- CI del commit d52bccc consultada por gh run list: Forbidden. Registro en [qa/remote-ci-status.json](qa/remote-ci-status.json). No se infiere verde remoto ni ausencia de ejecuciones/PR.

## Decisión siguiente

Revisar los recorridos y registrar observaciones/decisiones en LAUNCH_DECISIONS.md, empezando por oferta y alcance, con los precios propuestos autorizados, sin cerrar asuntos legales por defecto. Incorporar el resultado real de CI con enlace, SHA y artefacto cuando sea accesible. Mantener congelación de publicación hasta confirmación de producto/web completos y autorización final explícita. Agente: Codex principal, sin subagentes.
