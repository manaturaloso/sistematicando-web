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
- Render de logos/favicón y variante de pie oscuro configurables. Originales oficiales cargados por el propietario desde Pages CMS y seleccionados en site.json; cabecera, pie y favicon verificados. No se alteraron sus bytes.
- Wrangler fijado, wrangler.jsonc de assets estáticos, build previo obligatorio y pruebas del runtime local. Sin APIs/bindings nuevos ni despliegue.
- Workflow Site and CMS quality para push a la rama de trabajo y PR: instalación, check, dry-run, páginas/enlaces/navegación/axe y artefactos; sin deploy. Primera ejecución alojada pendiente de comprobar.
- Empaquetado verifica rutas esperadas dinámicamente (19 actuales). No hay páginas individuales de módulos ni receptor propio de leads. Otros legales pendientes.

## Fases

0 inicialización completada; 1 investigación parcial; 2 sistema visual base y logos integrados; 3 home inicial implementada; 4 soluciones iniciales implementadas; 5 catálogo implementado, páginas individuales condicionadas a evidencia; 6 precios/guía y contacto externo implementados, tarifas y revisión operativa de privacidad pendientes; 7 recursos y FAQ iniciales implementados, SEO/indexación parciales; 8 auditoría automática local y correcciones completadas; revisión manual final pendiente; 9 configuración Worker reproducible y validación local implementadas; integración autorizada; verificación remota pendiente; 10 lanzamiento oficial pendiente.

## Validación de esta entrega

- Primer guardado real de Pages CMS confirmado por commits 1206881, a3803b7, 222f48b y 55f79ee: tres originales y selección de marca. Incorporados mediante fast-forward, conservando los cambios del usuario.
- Dimensiones horizontales corregidas a 7958 × 2005, coincidentes con los originales. PNG sin transformar; hashes en qa/brand-report.json.
- npm run check: 40 archivos, cero errores/advertencias. Build: 19 páginas; content:check: 14 módulos, tres guías y 23 editores.
- test:brand aprobado en seis anchos (320–1440), cabecera/pie/fav y bytes idénticos. Corregido desbordamiento del adorno del hero a 900 px. Captura móvil revisada visualmente.
- test:ci local aprobado: 19 rutas, 66 destinos, navegación sin JS/teclado/200% y 41 comprobaciones axe sin infracciones automáticas. Incomplete de contraste conserva revisión separada; no es certificación WCAG.
- Lighthouse local final con logos: rendimiento 100/96/100 para home/funcionalidades/demo; accesibilidad y buenas prácticas 100; SEO 66 por noindex deliberado. Funcionalidades CLS 0.119: pendiente de mejorar. Imágenes originales grandes: oportunidad de optimización sin reemplazarlas silenciosamente.
- Ejecución alojada de Actions y PR existentes no verificadas por limitación de API. No confundir pruebas locales con CI remoto verde.

## Git, despliegue y agentes

- Nueva rama `feat/feature-catalog`, basada en `feat/brand-foundation` en d7ffa5f. Consultar SHA final con git log; se verifica el remoto al entregar.
- El usuario conectó GitHub a Cloudflare **Workers** y desplegó `feat/brand-foundation` en https://sistematicando-web.manaturaloso.workers.dev. Informó que la web aparece. Esto corrige los registros anteriores que solo preparaban Pages.
- El entorno no pudo consultar esa URL: el proxy negó el CONNECT con 403. No confundir ese bloqueo con un error del sitio. El despliegue externo no está validado por el agente.
- El usuario autorizó explícitamente integrar ec19bb7 en feat/brand-foundation para actualizar el Worker («Sí. autorizo.»). Integración sin conflictos sobre ed7227d; se publica esa rama mediante push normal. Sin cambios de DNS ni retirada de noindex. El éxito del despliegue debe comprobarse en Cloudflare; la red del entorno bloquea el hostname y API GitHub con 403.
- API GitHub GraphQL devuelve Forbidden en consultas previas; no se asume que no existan PR abiertas. Solo Codex principal, sin subagentes.

## Problemas y decisiones pendientes

Evidencia operativa del SaaS; precios y condiciones; adopción final y revisión operativa de privacidad; dominio definitivo y revisión legal. Revisión manual con dispositivos/lector de pantalla, CLS del catálogo y peso de PNG. Se mantiene noindex/robots; no hay backend ni envíos simulados. CMS conectado y logos cargados ya no son pendientes.

## Siguiente paso exacto

1. En Cloudflare → Workers & Pages → sistematicando-web → Deployments, comprobar que el build de la rama feat/brand-foundation corresponde al commit de integración de esta entrega (git log -1 en esa rama). Si no se inicia automáticamente, usar Retry build/Deploy desde esa rama ya autorizada; no cambiar DNS.
2. Abrir https://sistematicando-web.manaturaloso.workers.dev y revisar logo, /admin/, /funcionalidades/, /solicitar-demo/, /legal/privacidad/ y una ruta inexistente (404). Se conservan noindex/robots. El agente no pudo verificar el sitio por bloqueo CONNECT 403, ni Actions/PR por API Forbidden.
3. Para continuar desarrollo, volver a feat/feature-catalog e incorporar por fast-forward la integración/documentación de feat/brand-foundation; mantener el CMS editando feat/feature-catalog. No publicar futuras ediciones sin autorización correspondiente.
4. Resolver CLS del catálogo (0.119), revisión manual con dispositivos/lector y pendientes comerciales/legales. Contactos ya confirmados en content/contact.json. Solo Codex principal, sin subagentes.
5. Git: consultar git log -1 y git ls-remote origin refs/heads/feat/brand-foundation; entrega integrada desde ec19bb7, padre desplegado previo ed7227d. No se creó PR, integración directa autorizada; PR existentes sin verificar por API Forbidden.

## Datos comerciales aplicados

Responsable JOEL ALEJANDRO YAÑEZ CABALLERO, RUC 10477365928; domicilio Calle Enrique Barrón 586, Barranco; correo joel.yc23@gmail.com; WhatsApp Perú +51 956 832 336 también autorizado para consultas y derechos de privacidad. El usuario prevé cambiar los canales después; están centralizados. Estado completo en PRIVACY_REVIEW.md. Solo Codex principal, sin subagentes.

Confirmación actual: «Ya está». Guardado real del CMS corroborado con los cuatro commits indicados; sustituye el estado anterior de conexión pendiente.

Worker local con originales: test:worker aprobado, 30 comprobaciones de rutas, hashes de fuentes/logos/favicón, 404 privados, normalización, query, POST 405 y navegador móvil. Servidor detenido después de validar. Request.cf usa fallback local; no es fallo de assets ni validación pública. Check requiere ASTRO_TELEMETRY_DISABLED=1 y Wrangler XDG_CONFIG_HOME=/tmp/sistematicando-config en este entorno de permisos.

Validación del merge autorizado: worker:check aprobado; contenido 14 módulos/3 guías/23 editores, Astro 19 páginas y 52 assets. Dry-run terminó sin carga. Árbol de aplicación idéntico a ec19bb7; solo se añadieron registros de autorización/continuidad.

## 2026-11-04 · Identidad Git y despliegue confirmado por captura

El propietario solicita usar siempre Joel Alejandro Yañez Caballero. Configuración local del repositorio aplicada: user.name con ese nombre, user.email joel.yc23@gmail.com (correo previamente confirmado). Verificados autor y committer efectivos con git var; ambos correctos. La configuración local prevalece sobre la identidad global heredada del entorno. AGENTS.md registra cómo replicarla en futuros checkouts; .git/config no se versiona. No se reescribe el historial publicado.

La captura aportada por el propietario muestra build Cloudflare #7b8076e1 exitoso, rama feat/brand-foundation, commit 9a017af, mensaje de integración y todas las etapas verdes. Confirma el build/despliegue en el dashboard, sin afirmar recorrido funcional remoto por el agente. ID de versión de la captura anterior: f53f452e; diferente del SHA Git.

Entrega solo de configuración/documentación en feat/feature-catalog, sin nueva publicación. Verificación: identidad efectiva y git diff --check; no se repiten pruebas de aplicación porque su código no cambia. Agente: Codex principal, sin subagentes. Siguiente paso exacto: recorrer el Worker publicado (logo, /admin, catálogo, demo, privacidad y 404); luego resolver CLS del catálogo y revisión comercial/legal. Consultar git log -1 para el commit documental y git ls-remote para persistencia. No se creó PR; PR existentes sin verificar por limitación API ya documentada.
