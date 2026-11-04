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

Evidencia operativa del SaaS; precios y condiciones; adopción final y revisión operativa de privacidad; dominio definitivo y revisión legal. Revisión manual con dispositivos/lector de pantalla, peso de PNG. Se mantiene noindex/robots; no hay backend ni envíos simulados. CMS conectado y logos cargados ya no son pendientes.

## Siguiente paso exacto

1. Revisar Actions → Site and CMS quality para el nuevo commit de corrección FAQ en feat/feature-catalog. Esperado: 42 comprobaciones, cero infracciones. Fallo remoto dd113be confirmado por captura; no se afirma verde del nuevo run sin observarlo.
2. Si falla, abrir validate y consultar las líneas AXE (regla, selector y causa) o descargar qa/accessibility-report.json del artefacto. Mantener reglas y no añadir exclusiones para pasar CI.
3. Publicado permanece 9a017af. Nueva corrección y mejora de CLS solo en rama de desarrollo; futuras integraciones en feat/brand-foundation requieren autorización explícita. Antes fetch/revisar CMS concurrente.
4. Tras CI alojado aprobado, revisión manual/dispositivos/lector; entrega responsive de logos ya implementada con originales preservados. Quedan evidencia SaaS, tarifas y revisión/adopción de privacidad.
5. Autor Joel Alejandro Yañez Caballero; consultar git log -1 y git ls-remote para SHA final. Sin PR creada, existentes sin verificar por API. Solo Codex principal.

## Datos comerciales aplicados

Responsable JOEL ALEJANDRO YAÑEZ CABALLERO, RUC 10477365928; domicilio Calle Enrique Barrón 586, Barranco; correo joel.yc23@gmail.com; WhatsApp Perú +51 956 832 336 también autorizado para consultas y derechos de privacidad. El usuario prevé cambiar los canales después; están centralizados. Estado completo en PRIVACY_REVIEW.md. Solo Codex principal, sin subagentes.

Confirmación actual: «Ya está». Guardado real del CMS corroborado con los cuatro commits indicados; sustituye el estado anterior de conexión pendiente.

Worker local con originales: test:worker aprobado, 30 comprobaciones de rutas, hashes de fuentes/logos/favicón, 404 privados, normalización, query, POST 405 y navegador móvil. Servidor detenido después de validar. Request.cf usa fallback local; no es fallo de assets ni validación pública. Check requiere ASTRO_TELEMETRY_DISABLED=1 y Wrangler XDG_CONFIG_HOME=/tmp/sistematicando-config en este entorno de permisos.

Validación del merge autorizado: worker:check aprobado; contenido 14 módulos/3 guías/23 editores, Astro 19 páginas y 52 assets. Dry-run terminó sin carga. Árbol de aplicación idéntico a ec19bb7; solo se añadieron registros de autorización/continuidad.

## 2026-11-04 · Identidad Git y despliegue confirmado por captura

El propietario solicita usar siempre Joel Alejandro Yañez Caballero. Configuración local del repositorio aplicada: user.name con ese nombre, user.email joel.yc23@gmail.com (correo previamente confirmado). Verificados autor y committer efectivos con git var; ambos correctos. La configuración local prevalece sobre la identidad global heredada del entorno. AGENTS.md registra cómo replicarla en futuros checkouts; .git/config no se versiona. No se reescribe el historial publicado.

La captura aportada por el propietario muestra build Cloudflare #7b8076e1 exitoso, rama feat/brand-foundation, commit 9a017af, mensaje de integración y todas las etapas verdes. Confirma el build/despliegue en el dashboard, sin afirmar recorrido funcional remoto por el agente. ID de versión de la captura anterior: f53f452e; diferente del SHA Git.

Entrega solo de configuración/documentación en feat/feature-catalog, sin nueva publicación. Verificación: identidad efectiva y git diff --check; no se repiten pruebas de aplicación porque su código no cambia. Agente: Codex principal, sin subagentes. Siguiente paso exacto: recorrer el Worker publicado (logo, /admin, catálogo, demo, privacidad y 404); luego resolver CLS del catálogo y revisión comercial/legal. Consultar git log -1 para el commit documental y git ls-remote para persistencia. No se creó PR; PR existentes sin verificar por limitación API ya documentada.

## 2026-11-04 · Estabilidad de cabecera y carga de fuentes

Implementado: menú móvil inicializado durante el parsing con script inline encapsulado tras la cabecera; evita que el nav expandido aparezca y desplace todo main antes de cargar el módulo externo. Conserva enlaces sin JS y eventos de teclado/Escape. Precarga explícita de Manrope y Gluten originales locales, sin cambiar fuentes ni logos. Prueba de navegación extendida para bloquear scripts externos y verificar que el menú siga operativo. Una futura CSP debe autorizar el script mediante hash/nonce.

Pruebas: check 40 archivos sin errores/advertencias, build 19 páginas y content:check aprobados. Suite test:ci después de adelantar menú: 19 rutas/66 destinos, navegación y 41 comprobaciones axe sin infracciones automáticas; incomplete de contraste separado, no certificación completa. Después de precargar fuentes: check/build y Lighthouse final tres rutas aprobados; rendimiento/accesibilidad/buenas prácticas 100, SEO 66 por noindex. CLS home/catálogo/demo 0 en laboratorio; catálogo previo 0.119. LCP final aproximadamente 0.90 s; sin afirmar métricas de producción. test:navigation final incluye scripts externos bloqueados.

Persistencia solo en feat/feature-catalog, con identidad Joel Alejandro Yañez Caballero. Sin push a rama del Worker ni despliegue nuevo; publicado sigue 9a017af. Agente: Codex principal. La entrega responsive reduce el peso descargado del logo; quedan revisión manual/dispositivos y pendientes comerciales/legales. Siguiente paso: revisión de esta corrección y optimización de entrega de imágenes preservando originales; publicación posterior requiere autorización explícita. Sin PR creada; las existentes no se pueden verificar con la API disponible.

## 2026-11-04 · Fallo de Actions en FAQ abiertas: contraste transitorio

Evidencia remota aportada por el propietario: workflow Site and CMS quality #9, commit dd113be, falló en Check pages, navigation and accessibility. Resumen 41 comprobaciones y una infracción en expanded-menu-and-faq; no se recibió el detalle de regla del artefacto. La captura confirma fallo alojado, no fallo del despliegue Cloudflare.

Reproducción local: la animación appear aplicaba opacity 0→1 a los párrafos de details. Detenida al 25% mediante Web Animations, axe detecta color-contrast en cinco respuestas FAQ (1.9:1 frente al mínimo 4.5:1); al terminar la animación el mismo estado pasa. Es una causa reproducida compatible con el fallo dependiente del momento de medición; no se atribuye una regla al log remoto que no la muestra.

Corrección: retirar solo la interpolación de opacidad y conservar el desplazamiento suave de 3px y prefers-reduced-motion. Texto siempre opaco; sin desactivar color-contrast, exclusiones ni esperas para esconder el problema. Control negativo: reintroducir CSS anterior solo en página de prueba vuelve a detectar la infracción; CSS corregido pasa con las mismas cinco animaciones pausadas.

Auditoría ampliada a 42 estados/rutas con expanded-faq-animation-quarter en no-preference; conserva estado abierto normal y resto de pruebas. Logs ahora imprimen regla, selector, ayuda y causa, además del informe JSON del artefacto. Build 19 páginas/content:check y prueba de reproducción aprobados; resultado final de test:ci registrado al completar esta entrega. No repetir Lighthouse: no se cambia geometría ni carga de recursos.

Agente: Codex principal, sin subagentes. Identidad Git: Joel Alejandro Yañez Caballero. Solo rama feat/feature-catalog; sin despliegue ni push a feat/brand-foundation (publicado 9a017af). Siguiente paso exacto: revisar nueva ejecución de Actions del commit de esta entrega; debe mostrar 42 comprobaciones y cero infracciones. Si falla, abrir validate y copiar AXE + selector + causa o descargar accessibility-report.json del artefacto. API GitHub del entorno sigue sin acceso; no afirmar CI alojado verde hasta observarlo. Sin PR creada; PR existentes sin verificar.

Resultado final local: test:ci aprobado (19 páginas, 66 destinos, navegación sin JS/teclado/200% y menú con scripts externos bloqueados); axe 42 comprobaciones, cero infracciones. Informe accessibility-report.json regenerado. Incomplete conservados, no equivalen a aprobación WCAG completa.

## 2026-11-04 · Entrega responsive del logo, originales preservados

Brand.astro usa Image de Astro para generar PNGs de presentación a 256/512/768 px durante el build, con srcset y sizes acordes al clamp del CSS. Selección de logo y variante oscura siguen en content/site.json/Pages CMS; el raster activo se detecta con import.meta.glob de public/media. No se sobrescriben, recortan, reconstruyen ni cambian los originales; favicon y SVG conservan entrega directa. Metadatos reales del raster determinan proporción y reserva de espacio; dimensiones CMS siguen para fallback directo. Derivados estáticos bajo /_astro, sin endpoint de transformación en producción ni nueva dependencia.

Test:brand comprueba hashes de los tres originales, render/proporción/object-fit y selección de derivados con menor transferencia en seis anchos (320–1440), DPR 1 y 2, cabecera/pie y favicon. Datos en qa/brand-report.json: original claro 301321 bytes; navegador usa 13651 bytes en DPR1 y 31241 en DPR2, reducción 95.5%/89.6% en los casos medidos. Candidato 768 también generado para densidades mayores, no se afirma prueba de DPR3. Captura móvil revisada: marca sin recorte ni distorsión visible.

Check (40 archivos) y build (19 páginas) aprobados. Suite de sitio/accesibilidad y Lighthouse se registran al terminar esta entrega. La consulta de Actions de 8f6f44a sigue bloqueada por Forbidden; no afirmar CI remoto aprobado. Solo Codex principal, sin subagentes. Autor Joel Alejandro Yañez Caballero. Sin publicación ni push a rama seguida; Worker permanece en 9a017af. Sin PR creada; PR existentes no verificadas por API.

Siguiente paso exacto: comprobar Actions del commit de esta entrega; si falla revisar líneas AXE y artefacto, sin desactivar reglas. Después revisión manual de catálogo/demo/privacidad/admin en móvil y lector de pantalla y definición comercial/legal. Para reflejar correcciones en el Worker debe autorizarse una integración concreta; mantener DNS/noindex.

Validación final de entrega responsive: test:brand aprobado (12 combinaciones ancho/DPR, cabecera y pie); test:ci aprobado (19 rutas/66 destinos, navegación y 42 comprobaciones axe sin infracciones). Lighthouse final tres rutas: rendimiento/accesibilidad/buenas prácticas 100 y SEO 66 por noindex. Informes regenerados; originales sin cambios. Próxima revisión de CI remoto corresponde al SHA final de esta entrega, no solo a 8f6f44a.

## 2026-11-04 · Validación de marca incorporada a CI

El flujo test:ci ahora ejecuta verify-brand junto a sitio, navegación y axe. Workflow adjunta brand-report.json al artefacto y elimina los tres informes anteriores antes de comenzar para no reutilizar evidencia vieja si falla el build. Sin deploy, cambios de permisos ni secretos.

La prueba de marca sigue las selecciones actuales del CMS: verifica hashes de cada original configurado, el logo claro u oscuro correspondiente a cabecera/pie, o el nombre textual si el campo queda vacío, y favicon opcional. Proporción contrastada con dimensiones reales del original, no con el raster claro compartido; permite SVG/directos y archivos pequeños sin imponer una reducción artificial. En raster grande compatible exige srcset y derivados; para originales >100 KB verifica menor transferencia. Recorre seis anchos a DPR1/2. No cambian componentes, contenido ni originales de marca.

Reproducción: CHROMIUM_PATH=/usr/bin/chromium npm run test:ci. Sitio 19 páginas/66 destinos, navegación y marca configurada aprobados; axe final registrado al completar. No repetir build/Lighthouse porque esta entrega cambia solo pruebas/workflow y usa el mismo build verificado de 296dc05. Comportamientos de fallback se codifican en la prueba; la ejecución de esta entrega usa los PNG oficiales seleccionados, no se afirma prueba alojada ni una edición CMS nueva.

Agente Codex principal, sin subagentes; autor Joel Alejandro Yañez Caballero. Rama feat/feature-catalog; no se crea PR ni despliega Worker. Publicado sigue 9a017af. PR existentes y Actions remoto sin verificar por API Forbidden; se solicitó al propietario el resultado observado de 296dc05. Siguiente paso exacto: revisar Actions del nuevo SHA de entrega y descargar brand-report.json si falla marca, accessibility-report.json/líneas AXE si falla accesibilidad; tras verde revisar manualmente y autorizar cualquier integración concreta al Worker. Quedan verificación comercial, tarifas, privacidad y revisión con dispositivos/lector de pantalla.

Resultado final: test:ci ampliado aprobado (sitio 19 rutas/66 destinos, navegación, marca 12 combinaciones y axe 42 comprobaciones sin infracciones). node --check de ambos scripts y parseo YAML/triggers/permisos/artefacto aprobados; informe de marca regenerado. Resultado alojado del nuevo SHA pendiente de observar.
